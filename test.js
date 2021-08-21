const Discord = require("discord.js");
const client = new Discord.Client();
const { LoremIpsum } = require("lorem-ipsum");
const lorem = new LoremIpsum();
const puppeteer = require("puppeteer");
// const config = require("./config.json");
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  const content = msg.content;
  if (msg.author.bot) return;
  if (!content.startsWith("!")) return;
  if (content === "!marco") {
    msg.channel.send("Polo!");
  } else if (content === "!help") {
    msg.channel.send(
      'Here are the commands. Don\'t abuse me.\n\t!help - Displays a helpful summary of commands\n\t!marco - Responds with "Polo"\n\t!lorem - Produces lorem ipsum words\n\t!dadjoke - Tells a random dad joke\n\t!die - Kills your bot'
    );
  } else if (content.includes("!lorem")) {
    const arr = content.split(" ");
    msg.channel.send(
      arr.length === 1
        ? lorem.generateWords(10)
        : lorem.generateWords(parseInt(arr[1], 10))
    );
  } else if (content === "!virus") {
    (async () => {
      msg.delete({ timeout: 1 });
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        "https://utahcounty.maps.arcgis.com/apps/opsdashboard/index.html#/787db7308bfd4019b31e3ca61f1a18ea",
        { waitUntil: "networkidle0" }
      );
      const virusStats = await page.evaluate(() => {
        return {
          dateTimeStamp: document.querySelector(
            "#ember41 > div > div > p:nth-child(2) > span > strong"
          ).innerText,
          totalCases: parseInt(
            document
              .querySelector(
                "#ember41 > div > div > p:nth-child(6) > span > span > strong"
              )
              .innerHTML.replace(/\D/g, ""),
            10
          ),
          totalDeaths: parseInt(
            document
              .querySelector(
                "#ember41 > div > div > p:nth-child(18) > span > span > strong"
              )
              .innerHTML.replace(/\D/g, ""),
            10
          ),
          totalRecoveries: parseInt(
            document
              .querySelector(
                "#ember41 > div > div > p:nth-child(22) > span > span > strong"
              )
              .innerHTML.replace(/\D/g, ""),
            10
          ),
        };
      });
      const activeNum =
        virusStats.totalCases -
        virusStats.totalDeaths -
        virusStats.totalRecoveries;
      const activeDate = virusStats.dateTimeStamp.slice(
        virusStats.dateTimeStamp.indexOf("of") + 3,
        virusStats.dateTimeStamp.indexOf(",")
      );
      msg.channel.send(
        `${activeNum} Utah County active cases *as of ${activeDate}*`
      );
      await browser.close();
    })();
  } else if (content === "!dadjoke") {
    const dadJokes = [
      "How does a penguin build its house? Igloos it together.",
      "What do you call cheese that isn't yours? Nacho cheese.",
      "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
      "I ordered a chicken and an egg online. I’ll let you know.",
      "It's inappropriate to make a 'dad joke' if you're not a dad. It's a faux pa.",
      "When does a joke become a dad joke? When it becomes apparent.",
      "I like telling Dad jokes. Sometimes he laughs!",
    ];
    msg.channel.send(dadJokes[Math.floor(Math.random() * dadJokes.length)]);
  } else if (content === "!die") {
    await msg.reply("```diff\n- YOU KILLED ME!\n- I'LL SEE YOU IN HELL.```");
    process.exit(0);
  } else {
    msg.reply(
      `Unknown command ${msg.content}. If you type it again, I'll kill you. Type !help to see safe options.`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
