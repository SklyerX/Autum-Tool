const consoleTitle = require("console-title");
const gui = require("../module/gui");


const hypesquad = require("hypesquad-changer");
const input = require("input");
require("dotenv").config;


async function tokenInformation() {
    console.clear();
    consoleTitle("Autum Tool - Hypehouse changer")
    gui()

    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.clear();
    gui();
    // rl.question('               Enter the account token: ', (token) => {

        let token = await input.password("Enter the token: ")

        console.clear();

        gui();
        let options = await input.select([
            "Bravery",
            "Brilliance",
            "Balance"
        ])

        if(options === "Bravery") {
            console.clear();
            gui();
            console.log(hypesquad.changer("Bravery", token))
        } else if(options === "Brilliance") {
            console.clear();
            gui();
            console.log(hypesquad.changer("Brilliance", token))
        } else if(options === "Balance") {
            console.clear();
            gui();
            console.log(hypesquad.changer("Balance", token))
        }

    // });
}

module.exports = tokenInformation;
