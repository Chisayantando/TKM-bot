const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUh2eXRpb1U0UlU3R2JFaitYMDJZa3BBWFRVazNtTlVXbDNhSnJUMjNuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL1lOZG1qRU9Bcm1IcldUZlZ6K2R0aEljYUUxckRRb0UxZVFPUk8vMXZpVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5UDdXNkkyYmEvOWtwd2QyQy80WmQwZlhtb3pJK29GWGNsalhlZTh4ejFFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvQzY5SXdpWEdpKytqMWFTeHRCaytVdDByOUN6MzFBZ2ZzdUpCelQ1ZEhVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1QREpGU1BDWWNuS2pnem56cjJzNFdzdVY0SFpXTkpaSkFNL21lNzh4MHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iis1N2xlN2svNXdUTkxyS3U4YUVZN0gxbkV1UUlzYkRVK05JNUEyUFRoeEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR01FN1BsbHZNc3A2dUw5Vk9tbzFJV1VPSE9mQmcvOHZVWmpoQ3NBZ3gyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGhNbjRKalB2YzJjSHdoaDhHSWlXZUlOemFxVi9GSm12QmxEeU1nTGNRND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkvSlBNTUtmUnQxSnkrZ2FCOGRQT3BFS04wdEpPbG8vVjZQbHJHSnl6b243VUVpWmw5THBab0lmMEZCUTNpajNzTzhVWWFTT3czQ1FNMFBUcG1rVEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiJEQ3pKWE5VeE5WUEZPY2lRYkdZNGpTSERtVFFSUytaa3RMUjhVbFV6LzBBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNY2g4NXBRaFFjSzFaczRGczV0N0tnIiwicGhvbmVJZCI6ImFjMDEwZjI3LWZiYWYtNDFiNi1hNTdiLWYxNmZjOWMzZGIxMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmeXVtYnBIeUpWVVFCb01JdDJLYmE3NGo1WFE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXpkTjl5bWszUDh6WUxlLzFyWnQrV25ESy9nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhKN0g5TlRYIiwibWUiOnsiaWQiOiI5MjMwODU2ODg5MDg6NDVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSVNMQU0gU0hBSUtIIDk5OVxuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXXG7Dl1xuw5dcbsOXIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJbTNpNElCRU51RDQ3UUdHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIzbEJPd3h1OFpiTHBzUTlpUks4UGlrbEd1S201UU5XT0dYUVE2TWZZYUhnPSIsImFjY291bnRTaWduYXR1cmUiOiJBUEpTTkhPTHdaaHY0aXpQRzJsYXZYTXpxSVpQM0Q2YXVzZW5wUVp3WDY2YjJ5NTJHM1JobDhDNjFZa2dkRDYyL0t6VGxtTkswK0lZNFVXRFR1cFBDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTElRMms1aVllbG1YZFpNd0VTaHBDMzMyd3FDbjFNdVBCQllNMks5V2N3M3NBVEI5c25TZkUxVXpEOUxNeFI3eExxRys4NmhXQTRQOU1HelB1bThyQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMwODU2ODg5MDg6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZDVRVHNNYnZHV3k2YkVQWWtTdkQ0cEpScmlwdVVEVmpobDBFT2pIMkdoNCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTI4NzE0NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGSTYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
