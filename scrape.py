import cloudscraper
from bs4 import BeautifulSoup
import discord
import json
from time import sleep

url ="https://opensea.io/collection/happyland-gummy-bears-official?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Bear%20Den&search[stringTraits][0][values][0]=hyacinth&search[toggles][0]=BUY_NOW"

scraper = cloudscraper.create_scraper(delay=6000)

soup = BeautifulSoup(scraper.get(url).text, 'html.parser')

creds = json.load(open('./config.json'))
print(creds)

class MyClient(discord.Client):
    def __init__(self):
        super().__init__()
        self.dens = ["hyacinth"]

    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

    async def on_message(self, message):
        if not message.content.startswith('!'):
            return

        if message.content[1:] in self.dens:
            retry = 10
            while retry > 0:
                try:
                    url = f"https://opensea.io/collection/happyland-gummy-bears-official?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Bear%20Den&search[stringTraits][0][values][0]={message.content[1:]}&search[toggles][0]=BUY_NOW"
                    scraper = cloudscraper.create_scraper(delay=6000)
                    soup = BeautifulSoup(scraper.get(url).text, 'html.parser')
                    await message.channel.send(soup.find("div", {"class": "Price--amount"}).text)
                    print('Got Price!')
                    retry = 0
                except:
                    print('Couldn\'t get the price! Retrying now...')
                    retry = retry - 1
                    sleep(10)


client = MyClient()
client.run(creds['token'])