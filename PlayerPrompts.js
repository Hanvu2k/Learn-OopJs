import inquirer from "inquirer";

async function PlayerPrompts() {
  const results = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "Which direction would you like to move?",
    choices: ["Up", "Down", "Left", "Right"],
  });

  return results.direction;
}

export { PlayerPrompts };
