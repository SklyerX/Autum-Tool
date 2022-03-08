const chalk = require('chalk');
const fs = require('fs');

const axios = require('axios');
const gui = require('../module/gui');
const input = require('input');

async function chooseOption() {
    let options = await input.select([
        "account info",
        "get friends",
        "get servers",
    ]);

    if(options === "account info") {
        let getToken = await input.password("Enter the account token: ");
        const { data } = await axios.get("https://discord.com/api/v9/users/@me", {
            headers: {
                authorization: getToken,
                "content-type": "application/json",
            },
        });
        console.log(data);
        fs.writeFileSync(
            `output/servers.json`,
            JSON.stringify(data)
          );
        return data;
    } else if(options === "get friends") {
        let getToken = await input.password("Enter the account token: ");
        const { data } = await axios.get("https://discord.com/api/v9/users/@me/relationships", {
            headers: {
                authorization: getToken,
                "content-type": "application/json",
            },
        });
        console.log(data.user.username);
        // console.log(data)
        fs.writeFileSync(
            `output/servers.json`,
            JSON.stringify(data)
          );
        return data;
    } else if(options === "get servers") {
        let getToken = await input.password("Enter the account token: ");
        const { data } = await axios.get("ttps://discordapp.com/api/v6/users/@me/guilds", {
            headers: {
                authorization: getToken,
                "content-type": "application/json",
            },
        });
        console.log(data);
        fs.writeFileSync(
            `output/servers.json`,
            JSON.stringify(data)
          );
        return data;
    }
}

async function accountBackup() {
    console.clear();
    gui();
    chooseOption();
}

module.exports = accountBackup;
