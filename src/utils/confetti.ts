import confetti from 'canvas-confetti';

export function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    colors: ['#7e57c2', '#ffeb3b', '#b39ddb', '#fff59d'],
  });
}
