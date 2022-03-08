const consoleTitle = require("console-title");
const input = require("input");
const axios = require("axios");
const Fs = require("fs");

const gui = require("../module/gui");

async function extraOptions() {
    console.clear();
    consoleTitle("Autum Tool - Extra Options")
    gui()

    const options = await input.select([
        "Webhook Spammer",
        "Server Leaver",
        "Token Checker",
        "Nitro Sniper"
    ])

    if (options === "Webhook Spammer") {
        const webhookFinder = await input.text("Enter the webook link: ");
        const delay = await input.text("Enter the delay between each message: ");
        const messageToSend = await input.text("Enter the message you want to send to this webhook: ")

        setInterval(() => {
            axios({
                method: "POST",
                url: webhookFinder,
                async: true,
                data: { content: messageToSend }
            }).then(console.log("Webhook Sent"))
        }, delay)
    } else if (options === "Server Leaver") {
        const readline = require('readline');

        const Discord = require("discord.js-self");

        const client = new Discord.Client();

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('               Enter the account\'s token: ', (token) => {

            client.on("ready", () => {
                client.guilds.cache.forEach((g) => g.leave().then(console.log("Left: " + g.name)));
            })

            client.login(token);
        });
    } else if (options === "Token Checker") {
        const Self_Args = process.argv.slice(2)

        const discord_tokens = Fs.readFileSync("tokens.txt", "utf8").split("\n")

        if (!discord_tokens.length) {
            console.log("It looks like the input(discord tokens) you specified is empty.")
            process.exit()
        }

        var dt_index = 0

        Loop()
        async function Loop() {
            if (dt_index == discord_tokens.length) {
                console.log("Done!")
                process.exit()
            }

            await Delay(100)

            Request("https://discord.com/api/v6/auth/login", {
                headers: {
                    "Authorization": discord_tokens[dt_index]
                }
            }, function (err, res, body) {
                if (err) { }

                try {
                    if (res.statusCode == 200) {
                        console.log(`Valid token: ${discord_tokens[dt_index]}`)
                    } else {
                        console.log(`Invalid token: ${discord_tokens[dt_index]}`)
                    }
                } catch {
                    console.log(`Invalid token: ${discord_tokens[dt_index]}`)
                }

                dt_index += 1

                Loop()
            })
        }
    } else if (options === "Nitro Sniper") {
        //Dependencies
        const Discord = require("discord.js-selfbot-v11")
        const Request = require("request")
        const Chalk = require("chalk")

        //Variables

        const User = new Discord.Client()

        const readline = require('readline');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('               Enter the acoount\'s token: ', (token) => {



            //Main

            if (!/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i.test(token)) {
                console.log(Chalk.red("You provided an invalid Discord token"));
                process.exit();
            }

            User.on("ready", () => {
                console.log(Chalk.greenBright(`Discord nitro sniper is running.`))
            })

            User.on("message", (message) => {
                if (message.content.indexOf("discord.gift") != -1 || message.content.indexOf(".com/gift") != -1) {
                    try {
                        const code = message.content.split("/")[message.content.split("/").length - 1]

                        Request.get(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                            headers: {
                                "Authorization": token
                            }
                        }, function (err, res, body) {
                            if (err) {
                                console.log(Chalk.red(`Unable to redeem nitro code:${Chalk.white} ${code}`))
                                return
                            }

                            if (body.indexOf("redeemed already") != -1) {
                                console.log(Chalk.red(`Nitro code:${Chalk.white} ${code} ${Chalk.red}is already redeemed.`))
                            } else if (body.indexOf("nitro") != -1) {
                                console.log(Chalk.greenBright(`Nitro code:${Chalk.white} ${code} ${Chalk.greenBright}claimed.`))
                            } else {
                                console.log(Chalk.red(`Unknown nitro code:${Chalk.white} ${code}.`))
                            }
                        })
                    } catch { }
                }
            })

            User.login(token)
        });
    }
}

module.exports = extraOptions;
