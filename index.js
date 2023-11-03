const exp = document.querySelector("#exp");
const rank = document.querySelector("#rank");
const actionPanel = document.querySelector("#actions");
const counterDiv = document.querySelector("#counter");

const player = {
  experience: 0,
  rank: "student",
};

const gamePath = {
  0: {
    name: "Kunai Practice",
    cost: 0,
    reward: 100,
    active: false,
    passive: false,
  },
  1000: {
    name: "Taijutsu Lessons",
    cost: 1000,
    reward: 100,
    multiplier: 0.8,
    active: false,
    passive: true,
  },
};

const compareRewards = (program) => {
  if (program.passive && player.experience >= program.cost) {
    player.experience -= program.cost;
    program.cost += 100;
    program.multiplier += 0.2;
    displayCost(program);
    render();

    if (!program.intervalId) {
      program.intervalId = setInterval(() => {
        const experienceGain = program.reward * program.multiplier;
        player.experience += Math.round(experienceGain);
        render();
      }, 1000);
    }
  } else {
    player.experience += program.reward;

    render();
  }
};

const displayCost = (program) => {
  const newStat = document.createElement("p");
  if (program.passive) {
    newStat.innerText = `+${Math.round(
      program.reward * program.multiplier
    )}s cost: ${program.cost}`;
  }
  counterDiv.innerHTML = `+${program.reward}`;
  counterDiv.appendChild(newStat);
};

const generateProgram = (program) => {
  const newBtn = document.createElement("button");
  newBtn.innerText = program.name;
  newBtn.value = program.reward;
  newBtn.addEventListener("click", () => {
    if (player.experience >= program.cost) {
      compareRewards(program);
    }
  });
  displayCost(program);
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
  rank.innerText = player.rank;
  unlockProgram();
};

const runGame = () => {
  render();
};

runGame();
