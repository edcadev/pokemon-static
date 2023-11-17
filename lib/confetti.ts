import confetti from "canvas-confetti";

const confeti = () => {
  confetti({
    zIndex: 999,
    particleCount: 100,
    spread: 200,
    origin: {
      x: 0.5,
      y: 0.8,
    },
  });
};

export default confeti;
