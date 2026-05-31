# 🐙 Git Commands Cheat Sheet

Essential Git commands for working on your project.

---

## 🔰 First-Time Setup

```bash
# Configure your identity (run once)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/catch-me-if-you-can.git

# Check remote connection
git remote -v
```

---

## 📝 Daily Workflow

### 1. Check Status
```bash
git status              # See what files changed
git diff                # See detailed changes
```

### 2. Stage Changes
```bash
git add .               # Add all files
git add src/app/App.tsx # Add specific file
git add src/app/        # Add specific folder
```

### 3. Commit Changes
```bash
git commit -m "Add pause menu feature"
git commit -m "Fix: Resolve upside-down text in win screen"
git commit -m "Update: Improve sidebar layout"
```

**Good commit message format:**
- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Improve existing feature
- `Remove:` - Delete code/feature
- `Refactor:` - Code reorganization

### 4. Push to GitHub
```bash
git push                # Push to current branch
git push origin main    # Push to main branch
```

---

## 🌿 Branching

### Create and Switch Branches
```bash
# Create new branch
git branch feature/virus-ai

# Switch to branch
git checkout feature/virus-ai

# Create and switch in one command
git checkout -b feature/organ-system

# List all branches
git branch
```

### Merge Branches
```bash
# Switch to main branch
git checkout main

# Merge feature branch into main
git merge feature/virus-ai
```

### Delete Branch
```bash
# Delete local branch
git branch -d feature/virus-ai

# Delete remote branch
git push origin --delete feature/virus-ai
```

---

## ⬇️ Pull Updates

```bash
# Pull latest changes from GitHub
git pull

# Pull from specific branch
git pull origin main
```

---

## ↩️ Undo Changes

### Undo Uncommitted Changes
```bash
# Discard changes in specific file
git checkout -- src/app/App.tsx

# Discard all changes (CAREFUL!)
git checkout -- .
```

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Delete Changes)
```bash
git reset --hard HEAD~1  # CAREFUL - This deletes changes!
```

---

## 📜 View History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View last 5 commits
git log -5

# View changes in specific file
git log src/app/App.tsx
```

---

## 🏷️ Tags (Versions)

```bash
# Create tag
git tag v1.0.0

# Create tag with message
git tag -a v1.0.0 -m "First playable version"

# Push tag to GitHub
git push origin v1.0.0

# Push all tags
git push --tags

# List all tags
git tag
```

---

## 🔄 Stash (Temporary Save)

```bash
# Save current changes temporarily
git stash

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply and remove stash
git stash pop

# Delete all stashes
git stash clear
```

---

## 🆘 Common Scenarios

### Scenario 1: Made changes but want to switch branches
```bash
git stash              # Save changes
git checkout other-branch
# Do work on other branch
git checkout main
git stash pop          # Restore changes
```

### Scenario 2: Accidentally committed to wrong branch
```bash
git reset --soft HEAD~1  # Undo commit
git stash                # Save changes
git checkout correct-branch
git stash pop            # Apply changes
git commit -m "Add feature"
```

### Scenario 3: Merge conflict
```bash
git pull
# CONFLICT appears
# Open conflicting files in VS Code
# Resolve conflicts (choose which code to keep)
git add .
git commit -m "Resolve merge conflict"
```

### Scenario 4: Want to delete all local changes
```bash
git reset --hard HEAD    # Delete all changes
git clean -fd            # Delete untracked files
```

---

## 🚀 Push to GitHub for First Time

```bash
# After making changes
git add .
git commit -m "Initial commit: Game prototype"
git branch -M main
git push -u origin main
```

---

## 📋 Collaboration Workflow

### Working with Team Members

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes and commit
git add .
git commit -m "Add my feature"

# 4. Push feature branch
git push origin feature/my-feature

# 5. Create Pull Request on GitHub
# (Done in GitHub web interface)

# 6. After PR is merged, update local main
git checkout main
git pull origin main

# 7. Delete feature branch
git branch -d feature/my-feature
```

---

## ⚙️ VS Code Git Integration

VS Code has built-in Git features:

- **Source Control panel** (Ctrl+Shift+G)
- **Stage files**: Click + icon
- **Commit**: Type message and click ✓
- **Push**: Click ... menu → Push
- **Pull**: Click ... menu → Pull

---

## 🔗 Useful Links

- **GitHub Desktop**: https://desktop.github.com/ (GUI alternative)
- **Git Documentation**: https://git-scm.com/doc
- **Visualize Git**: https://git-school.github.io/visualizing-git/

---

**Happy coding! 🎮**
