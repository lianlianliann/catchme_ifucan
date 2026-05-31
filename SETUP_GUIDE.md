# 🎮 Catch Me If You Can - Setup Guide

Complete guide to download from Figma Make and set up on GitHub + VS Code.

---

## 📦 STEP 1: Download Code from Figma Make

### Method A: Download ZIP (Recommended)
1. In Figma Make, click the **menu icon** (three dots) in top-right
2. Select **"Download code"** or **"Export project"**
3. Save the ZIP file to your computer
4. Extract the ZIP to a folder (e.g., `catch-me-if-you-can`)

### Method B: Manual Copy
If download isn't available:
1. Create a new folder on your computer: `catch-me-if-you-can`
2. Copy all files from Figma Make file explorer to your local folder

---

## 🖥️ STEP 2: Install Required Software

### 1. Install Node.js
- **Download**: https://nodejs.org/
- **Version**: Download the **LTS version** (recommended)
- **Verify installation**:
  ```bash
  node --version
  npm --version
  ```

### 2. Install Git
- **Download**: https://git-scm.com/downloads
- **Verify installation**:
  ```bash
  git --version
  ```

### 3. Install VS Code
- **Download**: https://code.visualstudio.com/
- Install these VS Code extensions (optional but recommended):
  - **ES7+ React/Redux/React-Native snippets**
  - **Tailwind CSS IntelliSense**
  - **Prettier - Code formatter**
  - **ESLint**

---

## 🔧 STEP 3: Set Up Project Locally

### 1. Open Project in VS Code
```bash
cd catch-me-if-you-can
code .
```

### 2. Install Dependencies
Open VS Code terminal (`Ctrl+`` or `View > Terminal`) and run:

```bash
npm install
```

This installs all required packages:
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- And other dependencies

### 3. Run the Development Server
```bash
npm run dev
```

Your game should now be running at: **http://localhost:5173**

---

## 🐙 STEP 4: Set Up GitHub Repository

### 1. Create GitHub Account
- Go to https://github.com/
- Sign up for free account

### 2. Create New Repository
1. Click **"New"** button (green button on left)
2. **Repository name**: `catch-me-if-you-can`
3. **Description**: "Biological warfare strategy game built with React + TypeScript"
4. Select **Public** or **Private**
5. **DO NOT** check "Initialize with README" (you already have code)
6. Click **"Create repository"**

### 3. Link Local Project to GitHub
In VS Code terminal, run these commands:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Game prototype with 6 screens"

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/catch-me-if-you-can.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Verify Upload
- Go to your GitHub repository URL
- You should see all your code files uploaded

---

## 📁 Project Structure

```
catch-me-if-you-can/
├── src/
│   ├── app/
│   │   ├── game/                    # Game screens
│   │   │   ├── MainMenuScreen.tsx
│   │   │   ├── DifficultySelectScreen.tsx
│   │   │   ├── InGameScreen.tsx
│   │   │   ├── RoundResolvedScreen.tsx
│   │   │   ├── GameOverWinScreen.tsx
│   │   │   └── GameOverLossScreen.tsx
│   │   ├── components/              # Old toolkit components (can delete later)
│   │   └── App.tsx                  # Main app with routing
│   ├── imports/
│   │   └── Body.png                 # Human body map image
│   └── styles/
│       ├── theme.css                # Tailwind theme
│       └── fonts.css                # Font imports
├── package.json                     # Dependencies list
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite bundler config
└── tailwind.config.js               # Tailwind CSS config
```

---

## 🛠️ Common Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Git Commands
```bash
git status           # Check what files changed
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub
git pull             # Pull latest from GitHub
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] ✅ Node.js and npm installed
- [ ] ✅ Git installed
- [ ] ✅ VS Code installed
- [ ] ✅ Project opens in VS Code
- [ ] ✅ `npm install` runs successfully
- [ ] ✅ `npm run dev` starts server
- [ ] ✅ Game loads in browser at http://localhost:5173
- [ ] ✅ Can navigate through all 6 screens
- [ ] ✅ GitHub repository created
- [ ] ✅ Code pushed to GitHub

---

## 🎯 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (motion/react)
- **Build Tool**: Vite
- **Package Manager**: npm or pnpm

---

## 🚀 Next Steps

1. **Clean up old files**: Delete `src/app/components/screens/` folder (old toolkit)
2. **Add more features**: Implement virus AI, organ mechanics, mutations
3. **Deploy online**: Use Vercel, Netlify, or GitHub Pages for free hosting

---

## 🆘 Troubleshooting

### "npm: command not found"
- Node.js not installed correctly
- Restart terminal/computer after installing Node.js

### "git: command not found"
- Git not installed
- Add Git to PATH environment variable

### Port 5173 already in use
```bash
# Kill the process using port 5173
npx kill-port 5173
npm run dev
```

### Module not found errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📧 Need Help?

- **GitHub Issues**: https://github.com/YOUR_USERNAME/catch-me-if-you-can/issues
- **VS Code Docs**: https://code.visualstudio.com/docs
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

---

**Good luck with your project! 🎮🦠**
