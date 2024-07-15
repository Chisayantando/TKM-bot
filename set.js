const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0VGRW1ZSXhxU3F6N3hEdlRvc0ttY2RIRmpYeW1YNmd5K1Q5TlRtT3ZHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHNvT1QxUndSVVJqQWtENXFjTkh1ampqaXhkZzBBZVFXckJhUUNDZ2JIOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzT3RiSjNhQ1ZJcWNiQk9NOWNjTzMzbUV4d0NOS1JtZ0VWVzdTb2trN2w0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQUXdhMTF0dG5rQlVBcEZnOUloTzZ4M3pVSysyUzhDYlBNREg1ZnR6UWtrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNDV0g0MVl3S1pBZUMyM3V3ZWRyS2tiN1d4cXBTNzhlVGwrYmREeG1LMHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklvSnlyVDlqL0FoYjRjRGtFK0d6OHNjeGFvTXJJMzV5TWY5YXQxTVh0QzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVlMDlkTUduTzA3Qm85SFg3eXVIZU1GWVpUS0N3R2tvUHROUXo2NUJWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibG54Qi9mM3Y5MmpxVkJ6V0hFM3NxMWFGN3MvL3lUWDhvWVJmdkRuNVZrZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im85MDBkSzdDSHkrQWdpeFdzZUZ4MkRSOHdhbkZZTGNQN0cyblJOVC9DbndrM2ZOWnFMQTl6ZWp5LzdNNzlEODdUOHUvOXR0MUljM1FPamhva2NySGh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMxLCJhZHZTZWNyZXRLZXkiOiJORzUyTU5OS0ZaY0RYdE1aQkw3WkxRK3I4OWJ5bFErMVk1MmJDYWpSckJvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJpcVZIci1ZRFFUZTIxVmJfbldYNXFBIiwicGhvbmVJZCI6IjhmZTEyOGJjLWRhNGUtNGZiMC1iZjZmLTYwNWY1ZTQ0NDcxOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyTFR2dXhFRjFBT25SWVdDaDVFMnJQY3hjZkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXpscTVRUXcyL2lCbEczUThOR2hKdFhYb1JnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpHQ1dTWjk3IiwibWUiOnsiaWQiOiIyNjM3ODE2ODY1Njg6MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlM4LzdRRUVMdXoxclFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRjlRYjVlTng4MmtVNlg2VExXbGdPR21vcS96NzZlK1RrdGVXNzZFUmwxWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaDl1OVlvZ1lNMUR4QWdib0JjOU5wazAxSEVpOTE3YmpLUEh3WmVtcmR2djlXSmxuWkxaVktiZEI3dEwwSHFRUjdRV1ROcDVNaVZMd0tyZTBrdlB2RGc9PSIsImRldmljZVNpZ25hdHVyZSI6Im1UcjlWSWJyL3BvYjRacG9Zc0ZTSFhvWW01dmxrUkVwRTdHZ0p6ekI3clowVEVQNitUMnY1TUJhMWMxcjdIdjQrT0lIRzlzYlppWS9kZmxBb3dHSmlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNjg2NTY4OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmZVRytYamNmTnBGT2wra3kxcFlEaHBxS3Y4Kytudms1TFhsdStoRVpkVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTA4MDI2NX0==',
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
