const consoleTitle = require("console-title");
const gui = require("../module/gui");
const fs = require("fs");
const chalk = require("chalk");
const request = require("request");

require("dotenv").config;


async function tokenInformation() {
    console.clear();
    consoleTitle("Autum Tool - Token Information")
    gui()

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.clear();
    gui();
    rl.question('               Enter the account token: ', (token) => {
        request.get({
            url: 'https://discord.com/api/v6/users/@me',
            json: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
        }, (err, body, res) => {
            if(err)return console.log(err)
    
            if(body.statusCode == 429){
                console.log(chalk.redBright("[-]") + " RATE LIMIT " + chalk.redBright("[-]"))
            }
            else if(body.statusCode == 200){
                let user_id = res.id 
                let username_tag = res.username + "#" + res.discriminator
                let email = res.email
                let verified = res.verified
                let locale = res.locale
                let nsfw = res.nsfw_allowed
                let mfa = res.mfa_enabled
                let phone = res.phone
                let avatarURL = `https://cdn.discordapp.com/avatars/${user_id}/${res.avatar}.webp?size=128`
    
                console.log(chalk.greenBright("[-]") + ` Saved information for ${username_tag} ` + chalk.greenBright("[-]"))
                fs.writeFileSync(`./output/${username_tag}.txt`, `ID: ${user_id}\nUsername & tag: ${username_tag}\nEmail: ${email}\nVerified: ${verified}\nLocale: ${locale}\nNSFW: ${nsfw}\nMFA: ${mfa}\nPhone: ${phone}\nAvatar: ${avatarURL}\nToken: ${token}`, function(err){
                    if(err)return
                })
            }else{
                console.log(chalk.redBright("[-]") + ` UNKNOWN ` + chalk.redBright("[-]"))
            }
        });
    });

}

module.exports = tokenInformation;
