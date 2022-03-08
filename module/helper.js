const capmonster = require("capmonster");
const captcha = new capmonster("93e273c88735c7857ffd563e681dee54");

const sleep = (t) => new Promise((s) => setTimeout(s, t));

const getFingerprint = async (request) => {
  let { fingerprint } = await request.get(
    "https://discordapp.com/api/v9/experiments",
    {
      json: true,
    }
  );
  return fingerprint;
};

const getHeaders = (fingerprint, cookies) => {
  return {
    accept: "*/*",
    Connection: "keep-alive",
    "accept-language": "en-GB",
    "content-type": "application/json",
    "X-Debug-Options": "bugReporterEnabled",
    "cache-control": "no-cache",
    "sec-ch-ua":
      "'Chromium';v='92' : ' Not A;Brand';v='99' : 'Google Chrome';v='92'",
    "sec-fetch-site": "same-origin",
    "x-context-properties":
      "eyJsb2NhdGlvbiI6IkpvaW4gR3VpbGQiLCJsb2NhdGlvbl9ndWlsZF9pZCI6Ijg4NTkwNzE3MjMwNTgwOTUxOSIsImxvY2F0aW9uX2NoYW5uZWxfaWQiOiI4ODU5MDcxNzIzMDU4MDk1MjUiLCJsb2NhdGlvbl9jaGFubmVsX3R5cGUiOjB9",
    "x-fingerprint": fingerprint,
    "x-super-properties":
      "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjkzLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTMuMCIsImJyb3dzZXJfdmVyc2lvbiI6IjkzLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTAwODA0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    origin: "https://discord.com",
    referer: "https://discord.com/channels/@me",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML : like Gecko) discord/0.0.16 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
    te: "trailers",
    cookie: cookies,
  };
};

const captchaBypass = async (proxy, cookies) => {
  const proxyAddress = proxy.split(":")[0];
  const proxyPort = proxy.split(":")[1];
  console.log(proxyAddress, proxyPort);
  return new Promise(async (resolve, reject) => {
    let { taskId } = await captcha.createTask({
      type: "HCaptchaTask",
      websiteURL: "https://discord.com/register",
      websiteKey: "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34",
      cookies: cookies,
      proxyType: "http",
      proxyAddress: proxyAddress,
      proxyPort: proxyPort,
      proxyLogin: "nrzskxud",
      proxyPassword: "cvqttqauz3v0",
    });
    let gRecaptchaResponse;
    while (!gRecaptchaResponse) {
      await sleep(12000);
      try {
        ({
          solution: { gRecaptchaResponse },
        } = await captcha.getResult(taskId));
      } catch {}
      !gRecaptchaResponse && console.log("Waiting for captcha response...");
    }

    resolve(gRecaptchaResponse);
  });
};

module.exports = { getFingerprint, getHeaders, captchaBypass, sleep };
