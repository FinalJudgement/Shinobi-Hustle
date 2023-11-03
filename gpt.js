const exp = document.querySelector("#exp");
const actionPanel = document.querySelector("#actions");

const player = {
  experience: 0,
  rank: "student",
};

const gamePath = {
  0: {
    name: "Kunai Practice",
    cost: 0,
    reward: 1,
    active: false,
    passive: false,
  },
  10: {
    name: "Taijutsu Lessons",
    cost: 10,
    reward: 1,
    multiplier: 0.9,
    active: false,
    passive: true,
  },
};

const compareRewards = (program) => {
  if (program.passive && player.experience >= program.cost) {
    player.experience -= program.cost;
    program.multiplier += 0.1;
    render();

    if (!program.intervalId) {
      program.intervalId = setInterval(() => {
        const experienceGain = program.reward * program.multiplier;
        player.experience += experienceGain;
        render();
      }, 500);
    }
  } else {
    player.experience += program.reward;
    render();
  }
};

const generateProgram = (program) => {
  const newBtn = document.createElement("button");
  newBtn.innerText = program.name;
  newBtn.value = program.reward;
  newBtn.addEventListener("click", () => {
    compareRewards(program);
  });

  actionPanel.appendChild(newBtn);
};

const unlockProgram = () => {
  const currentProgram = gamePath[player.experience];
  if (
    currentProgram &&
    !currentProgram.active &&
    player.experience >= currentProgram.cost
  ) {
    generateProgram(currentProgram);
    currentProgram.active = true;
  }
};

const render = () => {
  exp.innerText = player.experience;
  unlockProgram();
};

const runGame = () => {
  render();
};

runGame();
