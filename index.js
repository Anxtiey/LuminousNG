const bedrock = require("bedrock-protocol");
const config = require("./config.json");
const chalk = require("chalk");
const fs = require("fs");

const client = bedrock.createClient({
  host: config.host,
  port: config.port,
  username: config.username, // optional; defaults to selected xbox account
});

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
const commands = new Map();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

client.on("join", (packet) => {
  console.log(chalk.blue("[GB] Connected."));
  setTimeout(() => {
    client.queue("command_request", {
      command: "/chat guild",
      origin: {
        size: 0,
        type: 0,
        uuid: "",
        request_id: "",
        player_entity_id: "",
      },
      interval: false,
    });

    console.log(chalk.green("[GB] Enabled guild chat!"));
  }, 3000);
});

client.on("text", ({ message }) => {
  if (!message.includes("§eGuildsBot") && message.startsWith("§2Guild >")) {
    // prevents bot from responding to itself, and checks for guild messages
    if (message.includes(".info")) commands.get("info").execute(client, config);
    if (message.includes(".guild"))
      commands.get("guild").execute(client, message.split(".guild")[1]);
    if (message.includes("joined."))
      commands.get("welcome").execute(client, message.split(" ")[2]);
    if (message.includes("left."))
      commands.get("farewell").execute(client, message.split(" ")[2]);
    if (message.includes(".stats"))
      commands
        .get("stats")
        .execute(
          client,
          message.split(": ")[1].split(" ")[1],
          message.split(": ")[1].split(" ")[2]
        );
  }

  console.log(message);
});
