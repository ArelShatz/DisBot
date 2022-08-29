const { CommandInteractionOptionResolver } = require('discord.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function f(){
    const resp = await fetch("https://www.ynet.co.il/digital/gaming/article/sjw5mhb1i", {
        "headers": {
          "accept": "*/*",
          "accept-language": "he,en-US;q=0.9,en;q=0.8,en-AU;q=0.7",
          "authorization": "",
          "content-type": "application/x-protobuf",
          "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-accept-content-transfer-encoding": "base64",
          "x-client-data": "CI62yQEIo7bJAQjEtskBCKmdygEIqNPKAQiUocsBCIamzAEIr7zMAQj3vMwB",
          "x-goog-api-key": "AIzaSyASIeURDYCeDwEezZXvB2dPJNJNCFVSdBc",
          "x-goog-authuser": "",
          "x-goog-fieldmask": "audio,text",
          "x-user-agent": "grpc-web-javascript/0.1",
          "Referer": "https://www.ynet.co.il/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "method": "GET"
      });

    console.log(resp.body);
}

f()

const re = new RegExp('<meta name="twitter:description" content="*"/>');