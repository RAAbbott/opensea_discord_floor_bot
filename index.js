const Discord = require("discord.js");
const client = new Discord.Client();
const puppeteer = require("puppeteer");
const config = require("./config.json");
const axios = require("axios");
const dens = [
  "amethyst",
  "bubblegum",
  "salmon",
  "obsidian",
  "aqua",
  "blood",
  "gunmetal",
  "coffee",
  "candy-jade",
  "diamond",
  "iron",
  "honey",
  "gold",
  "pearl",
  "hyacinth",
  "ember",
  "mary-jane",
  "rose",
  "cheddar",
  "rainbow",
];

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  console.log("message: ", message.content);
  if (!message.content.startsWith(config.prefix)) return;

  const command = message.content.slice(1);

  if (command === "floor") {
    const floor = await getFloorPrice();
    console.log(floor);
    return message.channel.send(floor);
  }

  // if (dens.includes(command)) {
  //   const floor = await getDenFloorPrice(command);
  //   console.log("floor: ", floor);
  //   return message.channel.send(floor);
  // }
});

client.login(config.token);

const getFloorPrice = async () => {
  const res = await axios.get(
    `https://api.opensea.io/api/v1/asset/${config.asset_contract_address}/1`
  );

  return `Current Floor Price is \`${res.data.collection.stats.floor_price} ETH\``;
};

// const getDenFloorPrice = async (den) => {
//   let floor;
//   const url = `https://opensea.io/collection/happyland-gummy-bears-official?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Bear%20Den&search[stringTraits][0][values][0]=${den}&search[toggles][0]=BUY_NOW`;
//   await (async () => {
//     const browser = await puppeteer.launch({
//       args: [
//         '--no-sandbox',
//         "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
//       ],
//     });
//     console.log("getting page...");
//     const page = await browser.newPage();
//     console.log('got page, going to it now')
//     await page.goto(url, {waitUntil: 'load', timeout: 0});
//     console.log("getting price...");
//     floor = await page.$eval(".Price--amount", (el) => el.innerText);
//     await browser.close();
//   })();
//   return `Current Floor Price For The \`${den}\` Den is \`${floor} ETH\``;
// };
