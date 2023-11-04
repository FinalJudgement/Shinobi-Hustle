const exp = document.querySelector("#exp");
const rank = document.querySelector("#rank");
const actionPanel = document.querySelector("#actions");
const counterDiv = document.querySelector("#counter");
const counterArr = [];

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
    id: 0,
  },
  1000: {
    name: "Taijutsu Lessons",
    cost: 1000,
    reward: 100,
    multiplier: 1.1,
    active: false,
    passive: true,
    id: 1,
  },
  10000: {
    name: "Konoha Academy",
    cost: 10000,
    reward: 500,
    multiplier: 1.2,
    active: false,
    passive: true,
    id: 2,
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
  let newStat = counterArr[program.id];
  if (!newStat) {
    newStat = document.createElement("p");
    counterArr[program.id] = newStat;
    counterDiv.appendChild(newStat);
  }

  if (program.passive) {
    newStat.innerText = `+${Math.round(
      program.reward * program.multiplier
    )}s cost: ${program.cost}`;
  } else {
    newStat.innerText = `+${Math.round(program.reward)}s cost: ${program.cost}`;
  }
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
  for (const key in gamePath) {
    const program = gamePath[key];
    if (!program.active && player.experience >= program.cost) {
      generateProgram(program);
      program.active = true;
    }
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
