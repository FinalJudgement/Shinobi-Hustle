const exp = document.querySelector("#exp");
const rank = document.querySelector("#rank");
const actionPanel = document.querySelector("#actions");
const counterDiv = document.querySelector("#counter");
const unlockRequirement = document.querySelector("#unlock-requirement");

const counterArr = [];

const player = {
  experience: 0,
  rank: "Student",
  requirement: 0,
};

const gamePath = {
  0: {
    name: "Kunai Practice",
    cost: 0,
    reward: 100,
    active: false,
    passive: false,
    id: 0,
    rank: "Student",
    level: 0,
    nextRequirement: 1000,
  },
  1000: {
    name: "Taijutsu Lessons",
    cost: 1000,
    reward: 100,
    multiplier: 1.1,
    active: false,
    passive: true,
    id: 1,
    rank: "Student",
    level: 0,
    nextRequirement: 10000,
  },
  10000: {
    name: "Konoha Academy",
    cost: 10000,
    reward: 1000,
    multiplier: 1.2,
    active: false,
    passive: true,
    id: 2,
    rank: "Student",
    level: 0,
    nextRequirement: 20000,
  },
  20000: {
    name: "D Rank Mission",
    cost: 20000,
    reward: 2000,
    multiplier: 1.3,
    active: false,
    passive: true,
    id: 3,
    rank: "Genin",
    level: 0,
    nextRequirement: 50000,
  },
};

const upgradeLevel = (program) => {
  program.level++;
};

const compareRewards = (program) => {
  if (program.passive && player.experience >= program.cost) {
    player.experience -= program.cost;
    program.cost = program.cost * program.multiplier;
    program.reward = program.reward * program.multiplier;
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
    player.requirement = program.nextRequirement;

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
    upgradeLevel(program);
    newStat.innerText = `Level ${program.level}: +${Math.round(
      program.reward * program.multiplier
    )} exp per second / Cost to upgrade: ${Math.round(program.cost)}`;
  } else {
    upgradeLevel(program);
    newStat.innerText = `Level ${program.level}: +${Math.round(
      program.reward
    )} exp per click / Cost to use: ${Math.round(program.cost)}`;
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
      player.rank = program.rank;
      player.requirement = program.nextRequirement;
      unlockRequirement.innerText = player.requirement;
      program.active = true;
    }
  }
};

const render = () => {
  exp.innerText = Math.round(player.experience);
  rank.innerText = player.rank;

  unlockProgram();
};

const runGame = () => {
  render();
};

runGame();
