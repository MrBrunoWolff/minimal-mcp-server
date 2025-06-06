#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];

if (!projectName) {
  console.log('Usage: create <project-name>');
  console.log('');
  console.log('Example:');
  console.log('  bunx minimal-mcp-server create my-mcp-server');
  console.log('  npx minimal-mcp-server create my-mcp-server');
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// Check if directory already exists
if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists!`);
  process.exit(1);
}

console.log(`Creating MCP server: ${projectName}`);
console.log('');

try {
  // Create project directory
  fs.mkdirSync(projectDir, { recursive: true });
  
  // For development/testing, copy from local template
  const templatePath = path.join(__dirname, '..');
  
  console.log('Creating project from template...');
  
  // Copy template files
  const filesToCopy = [
    'src',
    'tests', 
    'docs',
    'examples',
    'scripts',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'vitest.config.ts',
    '.eslintrc.json',
    '.prettierrc',
    '.gitignore',
    'LICENSE',
    'README.md',
    'CONTRIBUTING.md',
    'CHANGELOG.md',
    'bunfig.toml'
  ];
  
  for (const file of filesToCopy) {
    const srcPath = path.join(templatePath, file);
    const destPath = path.join(projectDir, file);
    
    if (fs.existsSync(srcPath)) {
      const stats = fs.statSync(srcPath);
      if (stats.isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  // Initialize git repository
  process.chdir(projectDir);
  execSync('git init', { stdio: 'inherit' });
  
  // Update package.json with new project name
  const packageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    packageJson.description = `A Model Context Protocol server for ${projectName}`;
    delete packageJson.bin; // Remove the create-mcp-server bin
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
  
  console.log('');
  console.log('Installing dependencies...');
  try {
    // Try bun first, fallback to npm
    execSync('bun install', { stdio: 'inherit' });
  } catch (error) {
    console.log('Bun not found, falling back to npm...');
    execSync('npm install', { stdio: 'inherit' });
  }
  
  console.log('');
  console.log('✅ Successfully created MCP server!');
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${projectName}`);
  console.log('  bun run dev          # Start development server (recommended)');
  console.log('  npm run dev          # Alternative with npm');
  console.log('  bun test             # Run tests');
  console.log('  bun run build        # Build for production');
  console.log('');
  console.log('Happy coding! 🚀');
  
} catch (error) {
  console.error('Error creating project:', error.message);
  
  // Clean up on error
  if (fs.existsSync(projectDir)) {
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
  
  process.exit(1);
}
