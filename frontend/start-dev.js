#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if Python is available
function checkPython() {
  return new Promise((resolve) => {
    const python = spawn('python', ['--version']);
    python.on('error', () => {
      const python3 = spawn('python3', ['--version']);
      python3.on('error', () => resolve(null));
      python3.on('close', (code) => {
        if (code === 0) resolve('python3');
        else resolve(null);
      });
    });
    python.on('close', (code) => {
      if (code === 0) resolve('python');
      else resolve(null);
    });
  });
}

// Check if backend dependencies are installed
function checkBackendDeps(pythonCmd, backendDir) {
  return new Promise((resolve) => {
    const check = spawn(pythonCmd, ['-c', 'import fastapi'], {
      cwd: backendDir,
      stdio: 'pipe'
    });
    check.on('close', (code) => resolve(code === 0));
  });
}

async function main() {
  const pythonCmd = await checkPython();
  
  if (!pythonCmd) {
    console.error('\n❌ Error: Python is not installed.');
    console.error('Please install Python 3.8 or higher from https://www.python.org/downloads/\n');
    process.exit(1);
  }

  console.log(`✓ Found Python: ${pythonCmd}`);
  
  const backendDir = path.join(__dirname, '..', 'backend');
  const dataDir = path.join(backendDir, 'data');
  
  // Check backend dependencies
  const backendDepsInstalled = await checkBackendDeps(pythonCmd, backendDir);
  if (!backendDepsInstalled) {
    console.error('\n❌ Error: Backend dependencies are not installed.');
    console.error('Please run the following commands:\n');
    console.error('  cd backend');
    console.error('  pip install -r requirements.txt\n');
    process.exit(1);
  }
  
  console.log('✓ Backend dependencies installed');
  
  // Check if data directory exists and has files
  const needsData = !fs.existsSync(dataDir) || 
                     fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).length === 0;
  
  if (needsData) {
    console.log('\n📝 Creating sample data with Bangladeshi region information...');
    const createData = spawn(pythonCmd, ['create_sample_data.py'], {
      cwd: backendDir,
      stdio: 'inherit'
    });
    
    await new Promise((resolve) => {
      createData.on('close', resolve);
    });
    console.log('✓ Sample data created\n');
  }
  
  // Start backend
  console.log('🚀 Starting backend server on http://localhost:8000...');
  const backend = spawn(pythonCmd, ['main.py'], {
    cwd: backendDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false
  });
  
  // Capture backend output
  backend.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Uvicorn running')) {
      console.log('✓ Backend server started successfully\n');
    }
  });
  
  backend.stderr.on('data', (data) => {
    // Suppress some verbose logs
    const output = data.toString();
    if (!output.includes('WARNING') && !output.includes('INFO')) {
      process.stderr.write(data);
    }
  });
  
  // Wait a bit for backend to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Start frontend
  console.log('🚀 Starting frontend server on http://localhost:3000...');
  const frontend = spawn('npm', ['run', 'next-dev'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
  
  console.log('\n✨ Application is starting...');
  console.log('📱 Frontend: http://localhost:3000');
  console.log('🔧 Backend API: http://localhost:8000');
  console.log('📚 API Docs: http://localhost:8000/docs\n');
  console.log('Press Ctrl+C to stop both servers\n');
  
  // Handle shutdown
  const cleanup = () => {
    console.log('\n🛑 Shutting down servers...');
    try {
      backend.kill('SIGTERM');
      frontend.kill('SIGTERM');
    } catch (err) {
      // Ignore errors during cleanup
    }
    setTimeout(() => process.exit(0), 1000);
  };
  
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  // Handle errors
  backend.on('error', (err) => {
    console.error('❌ Backend error:', err.message);
    cleanup();
  });
  
  frontend.on('error', (err) => {
    console.error('❌ Frontend error:', err.message);
    cleanup();
  });
  
  backend.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ Backend exited with code ${code}`);
      cleanup();
    }
  });
  
  frontend.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ Frontend exited with code ${code}`);
      cleanup();
    }
  });
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
