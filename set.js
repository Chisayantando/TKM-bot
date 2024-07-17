const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0FSenlZMHR6aWJ1Ym04ZjRSckRleGpOeGFuenJqeC8xSGQvNlNaZXAwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWVoMGtnN1dkazN6bGdTdTNrOW1BNnVnMWhYVGlQUFM3c3djZ2tRbUowdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Rk9udFE2U04rTTVkQjNVSGh3OTFHa2Rrb0ZKOHEvZEFNL3Nnek03dVhFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtckJrd2d6ODRBUEo0ZlFEZ1htNXE0ZXpYSGtnZlpHYlNrNmdrcFI3MFdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRPd0oyKzRGaUt4bW04L2Yxc0lWaC9hU0lCTWpsd2dIZEc2djZaNnVGVUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcyTEdWUXZzbThJc1pWRDByM2lZbnBlRmt5M1NNS0xhS2drb3BFR2oxVEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJWRDVIYk9WUkx3QUZpRjZXbHNhM08zSzBzQ1plNU5UcmJweGljeGdWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0wyV1ZrZEY5SXpFcUJCbzZWN0hpU2pCQmFQUldEbWwzUHZLeDZrRkxXQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhRTCtWSzluMElmdzIzaEJEVnNmblh4UzRoVzZxVHRTL2VaeFM3cXNKVnBVUlVsZFZHT3NRNUlZS0I2RnhzOTIwd0JJc3dtQ1c4dkFvWThlRXB4cmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiJNaG5ybmlXYk1saU9LcXhiQVg2NklPS2F4WFo4T3lEQW54cWJpejJ2dzhVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUbVQzaFNLZVNSdUltVjZOai1xSGtRIiwicGhvbmVJZCI6IjhlZWQ1ZjRiLTEzYTQtNDQ0Mi04NjFmLTEzNWMwODljOGFhZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHK3dEL0x2QVNzNTNGS0FmRTYvWTJybitXWW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic05tdzJDVUFveVhqTjkwalh2Q0E5T2JUcFBJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlI0OEZTWEFSIiwibWUiOnsiaWQiOiIyNjM3ODE2ODY1Njg6M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmE4LzdRRUVPRHEzclFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRjlRYjVlTng4MmtVNlg2VExXbGdPR21vcS96NzZlK1RrdGVXNzZFUmwxWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidndVdW42bEhSVGYvQ1M0STQ0ZWZTZUVucW51NXB6MHRJNnBLbGVyeXIyLzJxeXZ2blNWZkpaS1lRb0JEaERNTnlnNTBNeW5CMk1Rd3ZDbms2RHlyQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVwUjAxMm9zalpUbGx6K3JvbVZwMjZTbWtNeUFEc1NOMW01UGF2aEs4OXcwVWJaYkdGZ1hBbXp5ajhsSGViMlFuWFlRcHMvMkN4NE82ekFOTUkvWmp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNjg2NTY4OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmZVRytYamNmTnBGT2wra3kxcFlEaHBxS3Y4Kytudms1TFhsdStoRVpkVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTIxODQxMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLR3oifQ==',
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
