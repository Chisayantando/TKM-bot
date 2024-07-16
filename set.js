const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdLVWhtV2JSTVBQY3RQMUc3TzlBUTN5UkNXTHhjMEpPQjV6emFNK2EzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmljaWRGR1ZSYlJYU21hdHNMM0JhTHhJakZySmw3eGdJMURBK1FZb1hGMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQ3FSa3RwaEFFV3RYUmNtd0EyN1lIY0NaeFRyWXVSQU15N1hUaFNsREc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRYVFRRG5IN1dkVEVEaDJ1L25qVGJBMENJVG54RVBUMzdUWkdWc1p4ODJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHMzlhVnRyanFWMkZsQ2F2cnFPMURyNFpCMTcwaUROU2lHL0Z0SkJCbkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd1Mk9UNUZicGxxcndIN3VkQ0E4UzJLSVU4QkRGWGRhTXk2TThsNXFhU289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0NkYlR3U0NlK3pWdjlHRk5ZdGptMkhRTWJCYmhLRGV5VndzSnpxOXBrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibC85eTg4WkJTVmxTYlAwbjU2c1VYclJ0WUJoUnhXelBaOXB6YldEMERGcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko1WWtFNTlobDRNQUorKzJOdFY0dzNBWmxnUm1xZVpqUkVZZlVJZUV3OEErTm1FZnlnS1ZTZCt3NHFFdDFOdGc2M1pFalU2UFVleU9PVURmSUJDMmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTIsImFkdlNlY3JldEtleSI6ImZ4M09ObDl0MWhGajVPU2p2dEkxNVFLQ2RuL2VoMzBZTFdjNWpQZHYxbTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IndNTlN2a01QUVJHLWVhN203QjYxMEEiLCJwaG9uZUlkIjoiNmQ5NDQ3NzEtNzQxOS00YmYwLTk5NTgtNzYyNWYwODZmZDZhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIycjdHZFdQbUtJSG12a1BFQ1ptOXJqQjRBRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWVzBpcmxwaTdObnVYQk5rbXJiTitHNXlPZ0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQUFZS0wzNTgiLCJtZSI6eyJpZCI6IjI2Mzc4MTY4NjU2ODoyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOVzgvN1FFRU9pTDJiUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJGOVFiNWVOeDgya1U2WDZUTFdsZ09HbW9xL3o3NmUrVGt0ZVc3NkVSbDFZPSIsImFjY291bnRTaWduYXR1cmUiOiJVb3dlZmJRTE5aRGVuaXV0M0V5bU9QMjBtZGdiZGEvWjEzdHB3ZVh0SmFMaTBUUkdOd3JINzQyR3F2TjdWS3NFMmU4MmhYZzVhNU0zWi9kcjNuS1REdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUVI5WFFHOXpGTjhhei9vYTg5ckpWeDNYWUxaSkdHazA0R3hmTG5hZnBqR2o5WnFvUVR4Y0ljazBCVHBjOTJsNnNGWmtkYzBaOGhDK3B3dGxwOTd2aFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODE2ODY1Njg6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSZlVHK1hqY2ZOcEZPbCtreTFwWURocHFLdjgrK252azVMWGx1K2hFWmRXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMTI0MzQzfQ==',
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
