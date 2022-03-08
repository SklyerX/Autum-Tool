const requestt = require("request-promise");
const { captchaBypass, getFingerprint, getHeaders, sleep } = require("../module/helper.js");
const input = require("input");
const fs = require("fs");

function tokenJoiner() {
    const join = async (inviteCode, token) => {
      const cookieJar = requestt.jar();
      let request = requestt.defaults({ jar: cookieJar });
      await request.get("https://discord.com");
      let headers = getHeaders(
        await getFingerprint(request),
        cookieJar.getCookieString("https://discord.com")
      );
      headers.authorization = token;
      try {
        let res = await request.post(
          "https://discord.com/api/v9/invites/" + inviteCode,
          {
            headers: headers,
            json: true,
            body: {},
          }
        );
        console.log("Joined with " + token);
      } catch (e) {
        console.log(e);
      }
    };
    
    const main = async () => {
      const tokens = fs
        .readFileSync("tokens.txt")
        .toString()
        .split("\n")
        .map((token) => token.trim());
      let invite = await input.text("Enter invite code (not link)");
      let delay = await input.text("Enter delay in milliseconds", { default: 500 });
      for (let token of tokens) {
        join(invite, token);
        sleep(delay);
      }
      console.log("Finished joining. Exiting...");
      await sleep(3000);
    };
    
    main();
}

module.exports = tokenJoiner;
