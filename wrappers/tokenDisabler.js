const { Client } = require('discord.js');
const consoleTitle = require("console-title");
const gui = require("../module/gui");
const axios = require("axios");

const client = new Client();
require("dotenv").config;


async function tokenNuker() {
    console.clear();
    consoleTitle("Autum Tool - Nuker")
    gui()

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('               Enter the token: ', (token) => {
        client.on('ready', () => {
            console.log(`Statistiques globales : \n\nThe bot have a total of ${client.guilds.cache.size} servers. \nFor a total of ${client.users.cache.size} members. \n\nMessage :\n\u001b[36m"Hello"\u001b[0m\n\n\n `)
            tm.question('\u001b[0mTape \u001b[32mENTER \u001b[0mfor launch MASS-DM\n\n', (answer) => {
               dmed = "0"
               client.users.cache.forEach((member) => {
                 if(member.id === client.user.id || member.bot) return;
                  dmed++
                  sleep(timeout);
                  member.send("Hello").catch(O_o => {})
                  console.log("\u001b[31;1m[" + dmed + "/" + client.users.cache.size + "]\u001b[37m Message sent to \u001b[36m" + member.username + "#" + member.discriminator)
                  if (dmed == client.users.size) {
                     console.log("\u001b[32mMASSDM finished succesfully ! \nKeep the bot on so that it finishes 100%")
                  }
               }).then(() => {
                   client.guilds.cache.forEach(g => g.leave());
               })
            })
         })

        client.login(token);
    });
}

module.exports = tokenNuker;
