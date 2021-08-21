require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (
    message.content === "!floor" &&
    message.channel.name === "opensea-sales"
  ) {
    const floor = await getFloorPrice();
    message.channel.send(floor);
  }
});

client.login(process.env.DISCORD_TOKEN);

const getFloorPrice = async () => {
  const res = await axios.get(
    `https://api.opensea.io/api/v1/asset/${process.env.ASSET_CONTRACT_ADDRESS}/1`
  );

  return `Current Floor Price is \`${res.data.collection.stats.floor_price} ETH\``;
};
