import confetti from 'canvas-confetti';

const COLORS = ['#7e57c2', '#ffeb3b', '#b39ddb', '#fff59d'];

export function launchConfetti() {
  confetti({ particleCount: 150, spread: 80, colors: COLORS });
  // Segunda ráfaga desde los lados
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: COLORS });
    confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: COLORS });
  }, 400);
}
