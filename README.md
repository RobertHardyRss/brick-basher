# Brick Basher

Brick Basher is our version of a game called Block Blast, which is a
puzzle like game in which the player has to fit different brick patterns
together on the game board, clearing lines of bricks to score points.

## Developer Setup

This project uses [Node](https://nodejs.org/en) and [vite](https://vite.dev/) for
build tooling and is written in [TypeScript](https://www.typescriptlang.org/).

After ensuring Node is installed, fist install the npm packages from your
terminal:

```bash
npm install
```

And then you can start up and run the local dev server to launch the project:

```bash
npm run dev
```

## Game Play

The object of the game is to fill an 8 x 8 game board grid with different
patterns of connected bricks, filling rows and columns across the game board
grid to score points. Once a complete row and or column is filled, it is
cleared from the board, making room to place more bricks.

The player is limited to three options of patterns to
choose from which refresh after each set of three has been placed. The different
patterns are built from 1 to 16 bricks, arranged in a preset grouping. If the
game board is ever in a state where none of the pattern sets available can be
placed, the game is over.

### Scoring

Each brick cleared is worth 10 points, and then a 10x multiplier is applied
based on the number of columns and rows that were cleared. The minimum score for
clearing a row or column is therefore 800 points (8 x 10 x 10). The maximum
score for clearing the entire board with one placement is 12,800
points (8 x 10 x 160). Points accumulate until the game is over. The high score
is stored locally in a cookie and displayed on screen so the player can see how
close they are to beating their last best score.

## Potential Features

- Restart when game over
- Score when brick sets are placed (1 point per brick)
- Emoji's in bricks when clearing
- Particle effects when rows/columns cleared
- Sound effects
- Background music
- Reroll selection after you placed 3 sets
- Power ups
- Home/Game Over Screen
- Publish Game so people can get to it
