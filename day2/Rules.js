module.exports = {
  RulesMe: {
    X: {
      points: 1,
      loseAgainst: "B",
      winAgainst: "C",
    },
    Y: {
      points: 2,
      loseAgainst: "C",
      winAgainst: "A",
    },
    Z: {
      points: 3,
      loseAgainst: "A",
      winAgainst: "B",
    },
  },

  RulesElf: {
    A: {
      loseAgainst: "Y",
      winAgainst: "Z",
    },
    B: {
      loseAgainst: "Z",
      winAgainst: "X",
    },
    C: {
      loseAgainst: "X",
      winAgainst: "Y",
    },
  },
};
