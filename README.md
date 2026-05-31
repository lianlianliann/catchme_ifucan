# 🦠 Catch Me If You Can
### Host Defense System - Biological Warfare Strategy Game

A turn-based strategy game where you play as the human immune system defending against viral infections. Built with React, TypeScript, and Tailwind CSS.

![Game Screenshot](https://img.shields.io/badge/Status-Prototype-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan)

---

## 🎮 Game Features

- **3 Difficulty Levels**: Casual, Epidemic, Pandemic
- **6 Immune Actions**: White Blood Cells, Antibodies, Fever, Inflammation, Macrophages, T-Cells
- **Real-time Status Tracking**: Severity Index, Energy Points, Infection Rate
- **Organ Monitoring**: Track infection levels in Brain, Lungs, Heart, Lymph
- **Dynamic Mutations**: Virus evolves each round
- **Smooth Animations**: Powered by Framer Motion

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/catch-me-if-you-can.git

# Navigate to project folder
cd catch-me-if-you-can

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser

---

## 🎯 How to Play

1. **Main Menu** → Click "DEPLOY" to start
2. **Select Difficulty**:
   - 🟢 **Casual** (Level I): Turn-based, mutation warnings, generous EP regen
   - 🟠 **Epidemic** (Level II): Turn-based, no warnings, standard EP regen
   - 🔴 **Pandemic** (Level III): Hybrid real-time, no warnings, reduced EP regen
3. **In-Game**:
   - Use immune actions to reduce severity
   - Each action costs Energy Points (EP)
   - Click "NEXT ROUND" to advance
4. **Win Condition**: Reduce severity to 0%
5. **Loss Condition**: Severity reaches 100%

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations |
| **Vite** | Build tool |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── game/                    # Game screens
│   │   ├── MainMenuScreen.tsx
│   │   ├── DifficultySelectScreen.tsx
│   │   ├── InGameScreen.tsx
│   │   ├── RoundResolvedScreen.tsx
│   │   ├── GameOverWinScreen.tsx
│   │   └── GameOverLossScreen.tsx
│   └── App.tsx                  # Main router
├── imports/
│   └── Body.png                 # Human body map
└── styles/
    ├── theme.css                # Tailwind theme
    └── fonts.css                # Font imports
```

---

## 🎨 Design System

### Color Palette
```css
--primary-green: #1D9E75      /* Success, Immune System */
--light-green: #5DCAA5         /* Text, UI accents */
--dark-green: #0a1f12          /* Backgrounds */
--warning-amber: #EF9F27       /* Mutations, Warnings */
--danger-red: #E24B4A          /* Virus, Severity */
--info-purple: #7F77DD         /* Energy Points */
--background: #050d0a          /* Base background */
```

### Typography
- **Font**: Courier New (monospace)
- **Style**: Cyberpunk medical terminal

---

## 🧪 Game Mechanics

### Energy Points (EP)
- Start with 75 EP
- Regenerates each round (20-40 EP based on difficulty)
- Required to use immune actions

### Severity Index
- Starts at 60%
- Increases each round from virus spread
- Decreases when using immune actions
- Game over at 100%

### Immune Actions
| Action | Cost | Effect |
|--------|------|--------|
| White Blood Cell | 20 EP | Deploy immune cells |
| Antibody Production | 25 EP | Neutralize virus |
| Fever Response | 15 EP | Slow virus spread |
| Inflammation | 20 EP | Activate response |
| Macrophage | 30 EP | Consume virus |
| T-Cell Activation | 25 EP | Targeted attack |

---

## 🚧 Roadmap

- [ ] Implement virus AI algorithms (BFS, Minimax, Q-Learning)
- [ ] Add sound effects and music
- [ ] Create more virus mutations
- [ ] Add multiplayer mode
- [ ] Mobile responsive design
- [ ] Save/load game state
- [ ] Achievements system

---

## 👥 Credits

**Developed by**: BSCS 3-1 Group 6  
**Institution**: Polytechnic University of the Philippines  
**Course**: Game Development

### Team Members
- [Your Names Here]

---

## 📄 License

This project is for educational purposes.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/catch-me-if-you-can/issues)
- **Documentation**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**Outsmart the virus. Save the host. 🦠💉**
