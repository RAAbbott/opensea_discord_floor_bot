require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  console.log(message.content);
});

// const { Client } = require("discord.js");
// const axios = require("axios");
// const client = new Client();

// client.once("ready", () => {
//   console.info(`Logged in as ${client.user.tag}!`);
// });

// client.on("message", async (msg) => {
//   console.log("goteem");
// });

// bot.on("interactionCreate", async (interaction) => {
//   console.log("message!!!!", interaction);

//   if (!interaction.isCommand()) return;

//   if (interaction.commandName === "floor") {
//     await interaction.reply(getFloorPrice());
//   }
// });

client.login(process.env.DISCORD_TOKEN);

const getFloorPrice = async () => {
  const res = await axios.get(
    `https://api.opensea.io/api/v1/asset/${process.env.ASSET_CONTRACT_ADDRESS}/1`
  );

  return `${res.data.collection.stats.floor_price} ETH`;
};

// main();
