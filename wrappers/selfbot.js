const { Client, MessageEmbed } = require('discord.js-self');
const gui = require("../module/gui");
const client = new Client();
const settings = require('../module/selfbot.settings.js');
const moment = require("moment");
const consoleTitle = require("console-title");
const time = moment().format("HH:mm");
require("dotenv").config;

const DiscordRPC = require('discord-rpc');

const calli = new DiscordRPC.Client({ transport: "ipc" });
client.setMaxListeners(300);

async function selfbot() {
    consoleTitle("Autum Tool - Selfbot")
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.clear();
    gui();
    rl.question('               Enter the selfbot token: ', (token) => {
        let prefix = process.env.selfbotprefix
        if (!prefix) prefix = "."
        client.on('ready', () => {
    consoleTitle("Autum Tool - Selfbot | Logged in as: " + client.user.tag)
            console.clear()
            gui();
            const chalk = require("chalk");
            const { table } = require("table");

            const data = [
                ["LOGGED IN AS", `${chalk.red.bold(client.user.tag)}`, "The user that I am logged in as."],
                ["SERVERS", `${chalk.yellow.bold(client.guilds.cache.size.toLocaleString())}`, "The amount of servers that I am in."],
                ["INFO", `To exit`, "Press CTRL + C 2 times"],
                ["PREFIX", `${chalk.cyan.bold(prefix)}`, "The prefix to use to run my commands"]
            ]

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

        // Commands. Note: these commands are only avalibe to the owner to make sure no one abuses you're account
        client.on("message", async (message) => {
            if (message.content === prefix + "join") {
                const vc_error = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('❌ Invalid Voice Channel Id ❌')

                    .setFooter(`Requested by ${message.author.username}`);
                const vc_success = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('✅ Joined Channel ✅')
                    .setFooter(`Requested by ${message.author.username}`);

                if (!channel) return message.channel.send(vc_error);
                
                channel.join().then(connection => {
                    connection.voice.setSelfDeaf(false);
                    connection.voice.setSelfMute(false);
                    message.channel.send(vc_success)
                }).catch(e => {
                    const errormsg = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('❌ Error ❌')
                        .setDescription('```js\n' + e + '\n```')
                        .setFooter(`Requested by ${message.author.username}`);

                    message.channel.send(errormsg);
                });
            }
        })

        client.on("message", async (message) => {
            if(message.content === prefix + "scrape" && message.author.id === settings.handler.ownerId) {
                if (client.guilds.cache.get(settings.guild) === undefined) {
                    console.log(chalk.red('Error: Unknown Guild / Not Cacheable'));
                    client.destroy()
                } else {
                    console.log("Please note once this process is finished you will have to restart the bot as the bot turns it's self off")
                    if (settings.scrap.MemberName.Log === true) {
                        console.log(chalk.green('Message: Scraping MemberName \n') + (chalk.yellow('Mode : Log')));
                        client.guilds.cache.get(settings.guild).members.cache.forEach(member => { if (member.user.bot === true) { return; } console.log(member.user.tag); })
                    } else if (settings.scrap.MemberName.Log === false) { } else {
                        console.log(chalk.red('Error: Unknown MemberName Log Value, Only True/False Is Acceptable'));
                    }
                    if (settings.scrap.MemberName.WriteInFile === true) {
                        const MemberName = new Database('./data/MemberName.json')
                        console.log(chalk.green('Message: Scraping MemberName \n') + (chalk.yellow('Mode : WriteInFile')));
                        client.guilds.cache.get(settings.guild).members.cache.forEach(member => {
                            if (member.user.bot === true) { return; }
                            MemberName.push('NAMES', member.user.tag);
                        })
                    } else if (settings.scrap.MemberName.WriteInFile === false) { } else {
                        console.log(chalk.red('Error: Unknown MemberName WriteInFile Value, Only True/False Is Acceptable'));
                    }
                    // ? MemberAvatar 
                    if (settings.scrap.MemberAvatar.Log === true) {
                        console.log(chalk.green('Message: Scraping MemberAvatar \n') + (chalk.yellow('Mode : Log')));
                        client.guilds.cache.get(settings.guild).members.cache.forEach(member => {
                            if (member.user.avatarURL({ dynamic: true, size: 4096 }) === null || member.user.bot === true) { return; }
                            console.log(member.user.avatarURL({ dynamic: true, size: 4096 }));
                        })
                    } else if (settings.scrap.MemberAvatar.Log === false) { } else {
                        console.log(chalk.red('Error: Unknown MemberAvatar Log Value, Only True/False Is Acceptable'));
                    }
                    if (settings.scrap.MemberAvatar.WriteInFile === true) {
                        const MemberAvatar = new Database('./data/MemberAvatar.json')
                        console.log(chalk.green('Message: Scraping MemberAvatar \n') + (chalk.yellow('Mode : WriteInFile')));
                        client.guilds.cache.get(settings.guild).members.cache.forEach(member => {
                            if (member.user.avatarURL({ dynamic: true, size: 4096 }) === null || member.user.bot === true) { return; }
                            MemberAvatar.push('URLS', member.user.avatarURL({ dynamic: true, size: 4096 }));
                        })
                    } else if (settings.scrap.MemberAvatar.WriteInFile === false) { } else {
                        console.log(chalk.red('Error: Unknown MemberAvatar WriteInFile Value, Only True/False Is Acceptable'));
                    }
                    // ? MemberStatus
                    if (settings.scrap.MemberStatus.Log === true) {
                        console.log(chalk.green('Message: Scraping MemberStatus \n') + (chalk.yellow('Mode : Log')));
                        client.guilds.cache.get(settings.guild).members.cache.forEach(member => {
                            if (member.user.presence.activities[0]) {
                                if (member.user.presence.activities[0].type === 'CUSTOM_STATUS') {
                                    if (member.user.presence.activities[0].emoji.id === undefined) {
                                        console.log(member.user.presence.activities[0].emoji.name + member.user.presence.activities[0].state);
                                    }
                                }
                            }
                        })
                    } else if (settings.scrap.MemberStatus.Log === false) { } else {
                        console.log(chalk.red('Error: Unknown MemberStatus Log Value, Only True/False Is Acceptable'));
                    }
                    if (settings.scrap.MemberStatus.WriteInFile === true) {
                        console.log(chalk.green('Message: Scraping MemberStatus \n') + (chalk.yellow('Mode : WriteInFile')));
                        client.guilds.cache.get(settings.guild).members.cache.forEach(member => {
                            if (member.user.presence.activities[0]) {
                                if (member.user.presence.activities[0].type === 'CUSTOM_STATUS') {
                                    if (member.user.presence.activities[0].emoji.id === undefined) {
                                        const MemberStatus = new Database('./data/MemberStatus.json')
                                        MemberStatus.push('STATUS', member.user.presence.activities[0].emoji.name + member.user.presence.activities[0].state)
                                    }
                                }
                            }
                        })
                    } else if (settings.scrap.MemberStatus.WriteInFile === false) { } else {
                        console.log(chalk.red('Error: Unknown MemberStatus WriteInFile Value, Only True/False Is Acceptable'));
                    }
                    // ? ChannelRole
                    if (settings.scrap.ChannelRole.Log === true) {
                        client.guilds.cache.get(settings.guild).roles.cache.forEach(role => { console.log(role.name + ' | ' + role.hexColor); })
                    } else if (settings.scrap.ChannelRole.Log === false) { } else {
                        console.log(chalk.red('Error: Unknown ChannelRole Log Value, Only True/False Is Acceptable'));
                    }
                    if (settings.scrap.ChannelRole.WriteInFile === true) {
                        client.guilds.cache.get(settings.guild).roles.cache.forEach(role => {
                            const ChannelRole = new Database('./data/ChannelRole.json')
                            ChannelRole.set(role.name, role.hexColor);
                        })
                    } else if (settings.scrap.ChannelRole.WriteInFile === false) { } else {
                        console.log(chalk.red('Error: Unknown ChannelRole WriteInFile Value, Only True/False Is Acceptable'));
                    }
            
                    // ? ChannelName
                    if (settings.scrap.ChannelName.Log === true) {
                        client.guilds.cache.get(settings.guild).channels.cache.forEach(channel => { console.log(channel.name + ' | ' + channel.type); })
                    } else if (settings.scrap.ChannelName.Log === false) { } else {
                        console.log(chalk.red('Error: Unknown ChannelName Log Value, Only True/False Is Acceptable'));
                    }
                    if (settings.scrap.ChannelName.WriteInFile === true) {
                        client.guilds.cache.get(settings.guild).channels.cache.forEach(channel => {
                            const ChannelName = new Database('./data/ChannelName.json')
                            ChannelName.set(channel.name, channel.type);
                        })
                    } else if (settings.scrap.ChannelName.WriteInFile === false) { } else {
                        console.log(chalk.red('Error: Unknown ChannelName WriteInFile Value, Only True/False Is Acceptable'));
                    }
                    // ? End of Process
                    console.log(chalk.green('Message: Process Successfully Finished'))
                    client.destroy()
                }
            }
        })

        client.on("message", async(message) => {
            if(message.content === "purge" && message.author.id === settings.handler.ownerId) {
                if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                    console.log(`${time} | ${chalk.green("[Command]")} | .purge`)
                    if(!args[0]) return console.log(`${time} | ${chalk.red("[Missing Argument]")} | Please provide the amounts of messages you would like to purge`)

                    const amountToDelete = Number(args[0], 10);

                    if(isNaN(amountToDelete)) return console.log(`${time} | ${chalk.red("[Invalid Argument]")} | Please make sure that you have stated it the amount as a number`);
                    if(!Number.isInteger(amountToDelete)) return console.log(`${time} | ${chalk.red("[Invalid Argument]")} | Please make sure you state a whole number`);
                    if(!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return console.log(`${time} | ${chalk.red("[Invalid Amount]")} Please make sure the amount to delete is between 2-99`)

                    const fetched = await message.channel.messages.fetch({
                        limit: amountToDelete + 1
                    });

                    try {
                        await message.channel.bulkDelete(fetched)
                            .then(messages => console.log(`${time} | ${chalk.blueBright("[Event]")} | Successfully deleted ${messages.size}`))
                    } catch(err) {
                        console.log(`${time} | ${chalk.red("[Error]")} ${err}`)
                    }
                } else {
                    console.log(`${time} | ${chalk.red("[Error]")} | This account does not have permission to clear messages in a server.`)
                }
            }
        })

        client.on("message", async(message) => {
            if(message.content === "setup" && message.author.id === settings.handler.ownerId) {
                if(message.guild.me.hasPermission("MANAGE_CHANNELS")) {
                    console.log(`${time} | ${chalk.greenBright("[Commnad]")} | .setup`)
                    
                    message.guild.channels.create("Webhook Logs (selfbot)", {
                        type: "category",
                    }).then(ch => {
                        ch.guild.channels.create("server-logs", {
                            type: "text",
                            topic: "All the ticket transcirpts will be stored here",
                            parent: ch.id,
                            permissionOverwrites: [
                                {
                                    id: ch.guild.id,
                                    deny: ["VIEW_CHANNEL"]
                                }
                            ]
                        })
                        ch.guild.channels.create("pings", {
                            type: "text",
                            topic: "React to the Embed, to start the ticket process",
                            parent: ch.id,
                            permissionOverwrites: [
                                {
                                    id: ch.guild.id,
                                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                                    deny: ["ADD_REACTIONS"]
                                }
                            ]
                        })
                        ch.guild.channels.create("dm-logger", {
                            type: "text",
                            topic: "React to the Embed, to start the ticket process",
                            parent: ch.id,
                            permissionOverwrites: [
                                {
                                    id: ch.guild.id,
                                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                                    deny: ["ADD_REACTIONS"]
                                }
                            ]
                        })
                    })
                } else {
                    console.log(`${time} | ${chalk.red("[Error]")} | This account does not have permission to setup channels in a server.`)
                }
            }


            client.on("guildCreate", async(guild) => {
                let serverLogs = client.channels.cache.find(ch => ch.name === "server-logs");

                if(serverLogs) {
                    let logs = new MessageEmbed()
                        .setTitle("New Server Joined")
                        .setColor("GREEN")
                        .setDescription(`**Server Name:** ${guild.name} \n**Server Id:** ${guild.id} \n**Server Owner:** <@${guild.owner.id}> (${guild.owner.id})`)
                        .setTimestamp();

                    serverLogs.send(logs)
                } else {
                    console.log(`${time} | ${chalk.green("[Success]")} | New server joined! Server Name: ${guild.name}`)
                }
            });

            client.on("guildDelete", async(guild) => {
                let serverLogs = client.channels.cache.find(ch => ch.name === "server-logs");

                if(serverLogs) {
                    let logs = new MessageEmbed()
                        .setTitle("Server Left")
                        .setColor("GRED")
                        .setDescription(`**Server Name:** ${guild.name} \n**Server Id:** ${guild.id} \n**Server Owner:** <@${guild.owner.id}> (${guild.owner.id})`)
                        .setTimestamp();

                    serverLogs.send(logs)
                } else {
                    console.log(`${time} | ${chalk.red("[Success]")} | Server Left! Server Name: ${guild.name}`)
                }
            })
        })

        client.on("message", async (message) => {
            if (message.author.client) return;
            if (message.channel.type === "dm") {
                console.log(`${time} | ${chalk.blueBright("[Event]")} | New Dm Logged`)
                const dmEmbed = new MessageEmbed()
                    .setTitle("New Dm Logged")
                    .setColor("AQUA")
                    .setTimestamp()
                    .setDescription(`**User**: ${message.author.tag}\n**User ID**: ${message.author.id}\n**At**: ${new Date()}\n\n**Content**: \`\`\`${message.content}\`\`\``)
                    .setFooter("Autum Tool - Dm Logger")
        
                const DMC = client.channels.cache.find(c => c.name === "dm-logger")
                DMC.send(dmEmbed)
            }
        });

        if(settings.rpc.rpcOn === 'true') {
            calli.on("ready", async() => {
                await client.setActivity({
                    buttons: [{ label: settings.rpc.buttonOneName, url: settings.rpc.buttonOneUrl }, { label: settings.rpc.buttonTwoName, url: settings.rpc.buttonTwoUrl }],
                    details: settings.rpc.details,
                    largeImageKey: settings.rpc.largeImageKey,
                    largeImageText: settings.rpc.largeImageText
                }).catch(err => console.log(err));

                console.log(`${time} | ${chalk.green("[Success]")} | Started user rpc.`);
            });
            calli.login({ clientId: settings.rpc.clientId }).catch(console.error);
        }

        client.login(token);
    })
}

module.exports = selfbot;
