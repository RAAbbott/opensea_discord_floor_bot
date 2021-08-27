import cloudscraper
from bs4 import BeautifulSoup
import discord

url ="https://opensea.io/collection/happyland-gummy-bears-official?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Bear%20Den&search[stringTraits][0][values][0]=hyacinth&search[toggles][0]=BUY_NOW"

scraper = cloudscraper.create_scraper(delay=6000)

soup = BeautifulSoup(scraper.get(url).text, 'html.parser')




class MyClient(discord.Client):
    def __init__(self):
        self.dens = ["hyacinth"]


    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

    async def on_message(self, message):
        if not message.content.startswith('!'):
            return

        if message.content[1:] in self.dens:
            print('hi', message.content[1:])
            url = f"https://opensea.io/collection/happyland-gummy-bears-official?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Bear%20Den&search[stringTraits][0][values][0]={message.content[1:]}&search[toggles][0]=BUY_NOW"
            scraper = cloudscraper.create_scraper(delay=6000)

            soup = BeautifulSoup(scraper.get(url).text, 'html.parser')
            try:
                print(soup.find("div", {"class": "Price--amount"}).text)
            except:
                print('Couldn\'t get the price!')


client = MyClient()
client.run('my token goes here')