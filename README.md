# Tic Tac Toe React Project

This is a React-based Tic Tac Toe game with customizable game modes, board size, winning conditions, and replay functionality. The project is built using TypeScript and Vite, ensuring a modern development experience with fast builds and strong typing.

## Features

1. Game Modes:

   - Human vs. Human
   - Human vs. Machine (not yet implemented)

2. Customizable Game Settings:

   - Board Size: Choose between 3x3 and 6x6 boards.
   - Winning Streak: Set the number of consecutive marks needed to win (from 3 to 6).
   - Player Customization: Choose player names and symbols.

3. Game Replay:
   - Rewatch your last game, step-by-step.

## Getting Started

### Prerequisites

- Node.js (>=16)
- npm (or yarn/pnpm)

### Installation

1. Clone the repository:

```
git clone https://github.com/x-adri-x/react-tic-tac-toe.git
cd react-tic-tac-toe
```

2. Install dependencies:

```
npm install
```

(or use yarn or pnpm)

3. Start the development server:

```
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## Usage

1. Setup:

- Select a game mode: Currently only Human vs. Human is available
- Customize the game:
- Board Size: Set the dimensions of the board (3x3 to 6x6).
- Winning Streak: Choose how many marks in a row are required to win (3 to 6).
- Player Settings: Input player names and choose their symbols.

2. Gameplay:

- Take turns placing your mark (X or O or any other symbol you chose) on the board.
- If playing against the machine, the AI will make its move after yours.
- A winner is declared when the chosen winning streak is achieved, or the game ends in a draw if no moves remain.

3. Replay:

- After the game ends, you can review the match step-by-step to analyze the gameplay.

## Scripts

- npm run dev: Start the development server.
- npm run build: Build the project for production.
- npm run preview: Preview the production build locally.
- npm run lint: Lint the codebase using ESLint.

## Future Enhancements

- Human vs. Machine and Human vs. AI modes.
- Dark mode.
- Additional themes for the game board.
