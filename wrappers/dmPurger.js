const consoleTitle = require("console-title");
const moment = require("moment");
const gui = require("../module/gui");
const fs = require("fs");
const chalk = require("chalk");

const main = require("../app");
const time = moment().format("HH:mm");
require("dotenv").config;


async function dmPurger() {
    console.clear();
    consoleTitle("Autum Tool - Dm Purger")
    gui()

    console.log(`[${chalk.green("#")}] Creating Python File..`)
    let content = String.raw
`
import discord, subprocess, sys, time, os, colorama, ctypes, json, requests, random, pytz
from re import findall
from json import loads, dumps
from base64 import b64decode
from subprocess import Popen, PIPE
from urllib.request import Request, urlopen
from datetime import datetime
from threading import Thread
from sys import argv
from colorama import Fore
from discord.ext import commands

def clear():
    os.system('cls')

def startup():
    print(f'{Fore.RED}d')
clear()

bot = commands.Bot(command_prefix=commands.when_mentioned_or("!"))


token = input(f'{Fore.BLUE}Enter {Fore.CYAN}Token: {Fore.WHITE}')
purgemessage = input(f'{Fore.BLUE}Enter {Fore.CYAN}Message: {Fore.WHITE}')


class MyClient(discord.Client):
    async def on_message(self, message):
        if(message.author!=self.user):
            return
        channels=[]
        if(message.content=="purge_server"):
            channels=message.channel.guild.channels
        elif(message.content==purgemessage):
            channels.append(message.channel)
        else:
            return
        for channel in channels:
            print(f'{Fore.BLUE}Purging In:{Fore.CYAN} {channel}')
            try:
                async for mss in channel.history(limit=None):

                    if(mss.author==self.user):
                        print(f'{Fore.CYAN}Message {Fore.CYAN}Deleted {Fore.BLUE}-> {Fore.CYAN}{mss.content}')
                        try:
                            await mss.delete()
                        except:
                            print("Couldn't delete!")
            except:
                print("Can't read history!\n")

def start():
    print(f'Send [{Fore.CYAN}{purgemessage}{Fore.BLUE}] To Delete Msgs')
os.system(f'title Autumn Tool - Dm Purger')
clear()
start()

bot=MyClient(heartbeat_timeout=86400, guild_subscriptions=False)
bot.run(token, bot=False)
    `
    
    fs.writeFileSync("python/dmPurger.py", content)
    console.clear()
    gui();
    console.log(`${time} | ${chalk.green("[Success]")} | Successfully created the dm purger file. \nPlease proceed to python/dmPurger.py and open the terminal and run the command 'py dmPurger.py'`)
}

module.exports = dmPurger;