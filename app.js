// Required Modules
const consoleTitle = require("console-title");
const input = require("input");
const chalk = require("chalk");

// Our Modules
const gui = require("./module/gui.js");
const selfbot = require("./wrappers/selfbot");
const serverNuker = require("./wrappers/nuke");
const dmPurger = require("./wrappers/dmPurger");
const accountBackup = require("./wrappers/accountBackup");
const tokenNuker = require("./wrappers/tokeNuker");
const tokenDisabler = require("./wrappers/tokenDisabler");
const tokenInformation = require("./wrappers/tokenInfo.js");
const hypeHouseChanger = require("./wrappers/hypeHouseChanger.js");
const tokenJoiner = require("./wrappers/tokeJoiner");
const extraOptions = require("./wrappers/extraOptions.js");

// Application
console.log(`${chalk.yellow("[")}${chalk.blueBright("#")}${chalk.yellow("]")} Loading..`)

async function main() {
    console.clear();
    
    consoleTitle("Autum Tool - Home")
    gui()
    
    /*Title*/ console.log(`       ${chalk.yellow("[")}${chalk.blueBright("+")}${chalk.yellow("]")} Main Options:                     ${chalk.yellow("[")}${chalk.blueBright("+")}${chalk.yellow("]")} Token Options:               ${chalk.yellow("[")}${chalk.blueBright("+")}${chalk.yellow("]")} Modes: \n`)
    
    /*Description */ console.log(`            ${chalk.yellow("[")}${chalk.whiteBright("01")}${chalk.yellow("]")} Selfbot                        ${chalk.yellow("[")}${chalk.whiteBright("05")}${chalk.yellow("]")} Token Nuker                  ${chalk.yellow("[")}${chalk.whiteBright("9")}${chalk.yellow("]")} House Changer\n`)
    /*Description */ console.log(`            ${chalk.yellow("[")}${chalk.whiteBright("02")}${chalk.yellow("]")} Server Nuker                   ${chalk.yellow("[")}${chalk.whiteBright("06")}${chalk.yellow("]")} Token Disabler               ${chalk.yellow("[")}${chalk.whiteBright("10")}${chalk.yellow("]")} External Options\n`)
    /*Description */ console.log(`            ${chalk.yellow("[")}${chalk.whiteBright("03")}${chalk.yellow("]")} Dm Purger                      ${chalk.yellow("[")}${chalk.whiteBright("07")}${chalk.yellow("]")} Token Information\n`)
    /*Description */ console.log(`            ${chalk.yellow("[")}${chalk.whiteBright("04")}${chalk.yellow("]")} Account Backup                 ${chalk.yellow("[")}${chalk.whiteBright("08")}${chalk.yellow("]")} Token Joiner\n`)
    /*Description */ console.log(`                                                                                  ${chalk.yellow("[")}${chalk.whiteBright("*")}${chalk.yellow("]")} Exit Tool\n`)
    
    const question = await input.text(`[${chalk.blueBright("#")}] Choice: `)

    if (question === "1") {
        selfbot();
        // console.clear();
        // console.log(`This tool is currently under development`)
    } else if (question === "2") {
        serverNuker();
    } else if(question === "3") {
        dmPurger();
    } else if(question === "4") {
        accountBackup();
    } else if (question === "5") {
        tokenNuker();
    } else if (question === "6") {
        tokenDisabler();
    } else if (question === "7") {
        tokenInformation();
    } else if(question === "8") {
        tokenJoiner();
    } else if(question === "9") {
        hypeHouseChanger();
    } else if(question === "10") {
        extraOptions();
    } else if(question === "*"){
        console.log("Exiting Tool..")
        process.exit();
    } else {
        console.log("Invalid option... Trying again 2 seconds");
        setTimeout(() => {
            main()
        }, 2000)
    }
}

module.exports = main;

main();