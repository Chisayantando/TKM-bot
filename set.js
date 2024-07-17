const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0c0bTQyUjlLS2NScWVGcWxuTmhqcFJ3SEo2UnROSmRQWFZOT3dzeHYxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibCs0RlBaWnM2NDF2cGJzSkFyVE5TM0NUajBTc2VKYmVBKzBPblo3REdpaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5STdqYXd3RFFodjlGY085OERQQmVCTlROSmlBL050cmllNHpKOTlUR1VBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsREk3YUdHOUNtazVPeENuemc3SEg0K2tvbEZLSHhmZm9JTlJNdWxRUUZ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllQK3kzWng4VDEvVXhHb2oyVWZSMjF0OWlYLzJPc2E0b3MrcHZ4S2VGSFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims2YkcxeFpZR01penpuMzBEKzB1TVVzTWd2M3kwakd3U3p2Y3YydTk5U2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEZ4K0ltYzFxeSt2SmRGZFRpN3BFMkdYNTNta05HdExXaTE5RmhNa2xXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0tneE5ieFBNcFVTaTdmTVBVanBLdXI5aFc4TlU4cUlkR2l5ak5NdWpsRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndVK1l1dGJ3RDZhRXRmQVNySG96eTdMclZ3ZlBtS1U4S0J1czJlTTl2QnJrc1o5S3JXZisyUi9oSVZBQ21pMC9TaUxtZkNRSU9rZVhZQXFCNTNvMGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6IjA5bXUxYU9QalB0VFRkVGxnanl2elc2eU5kT1U2WkNqeGNZRTI5Z2F2OTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImI1QkJiMUpIUzNxcDNjUXJ3Ym53c2ciLCJwaG9uZUlkIjoiNjEwODFhZjYtOGVmNS00ZWVkLTg4ODgtNDAzZjAzMTkyOTc5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRmMWxPb0lJWk5QVW1qekxLekV6T29HWkFUVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKS3dhRkdiYUxJYU1FS2dsZHp1L2dTbzJRRGM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNVY5VEZKS0wiLCJtZSI6eyJpZCI6IjI2MzcxNTI3NTYxMTo1OEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVcxdDhVQkVJZjIzclFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZkR5SVRHc0p2VE5qWWk4cmQ4bVVIYXJRV2k0c2VKRGJvd1cyRURHMWhrZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidzBWR3lnMEdkNHZRZWRCQm9aMU1jbVc4OGo5VXgrNWZtRGNHMGhoVVk1MW8yZzRXUWxKWmZUSjk5Y0MwYi96SkdjalM5Q2ZJenNhQ3hEVFVjUUo2Q2c9PSIsImRldmljZVNpZ25hdHVyZSI6IkVhNnpjUHBqdHAxNTVrNTZ4UVVoS3R6ZWdsOE5PVjZBZnl3ZjR5TWJPOEJMTStaQWF1aVBwa0ZrUXgwOGVNdVdUMFE4NmFtUmhYK1JYa21MV0JKNWdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE1Mjc1NjExOjU4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh3OGlFeHJDYjB6WTJJdkszZkpsQjJxMEZvdUxIaVEyNk1GdGhBeHRZWkkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEyMTk4NjJ9',
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
