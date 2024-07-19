const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEVnNkVhM1BWNjNRb3I3ellvS05VRlBHR3BndFQ1WVlMTnYzZm1kU2xXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1l6TnZ5Nm1URXhYOGhxVkFCY0FVUStna0pWT3dmRkxpQTlUaWI1dE5IRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzT0Iya0owUHJnSTRuTDY1ZW9SNlRqdTI3OEMzMUxQNk9GbnZUVTlmSmtvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6UjY1TmxjYUZzRGZ5MDVjWHQzVjR6MFpUeU40Wk9yVzl0Nmk1RTFQRXlnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklQT1hhV09uQTl6ZUZVVCtFelhYdmFOWHdrWmY4R1gra2lzQ0x0dUkzVjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlV3WHpFbDVJZU9KbEVqVkJzQkVoUXY2YXBvNUdTN2haZktudTdlVkNUQkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0RpV1JJdzVVeW5iOGI1L1dzaHhYV2IvV0hQNjdMY1IxRTlNUmZzNHpGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEVvV1RtSk1uSlRxVHgrK1BiaDkvUGwzZXQyU2V5ODNNVUFRK2d6ckdHST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im93Nzh6bzBWLzgvNFpQcHE0emFNK2xyODR0SFRDNmxKcWxnWThPWGxMQy9oNTNYYk8ydlFlb2FrWTd6U0RVeXhDNi9ITlhWcHgzVDJmTUU1VG1WOUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6ImFrUVdrcUFVZ0h5T3J2R3gzaXFydXA4UDdNd3hDdU5pbDZFNzZrcUVPMEk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImYwYlF1ZUw4VGtDcXotenVSelpiT2ciLCJwaG9uZUlkIjoiYjRjY2Y2NjAtODQyNC00YjAyLThhN2MtOTRkNDRjMmVkNzU3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9sanUwWDVKZkVHak85ZHIzcEc2WVo3MXExaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIb0wxcFAyTERMbzYzTW1OMVZZZ0lyVnp3aU09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRDgzQ0RZMTgiLCJtZSI6eyJpZCI6IjI2MzcxMzM0NzM3ODoxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNoaXNheWFudGFuZG8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0syZ2s0RUVFTythNjdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldvYisxYTZWZW5MSEw3T0c3NDJDSmlVWHMrU2c3bGNVcW5ndkx1L0ExUm89IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZjS2hzTlJqWnlNTm0zWGI3M1pLWlllMUFqbGhjS3dQNUpDUnFJNUV1QkduM2prTWVoSnJSVjZUaWJzOTNuUTE2TXhjeXNwWml4L0hub1JUeWVPNUF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJobm9SL1AvTVNvaUM1VVpSWktUTVJIVloyWlByQmNQeFZ4cmhoYnVScjJ2emJrR08zelk1bFlPb0VxTllIYy83bWxZd1JIYUV0Y3RHb29BaDR2c0pCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxMzM0NzM3ODoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZxRy90V3VsWHB5eHkremh1K05naVlsRjdQa29PNVhGS3A0THk3dndOVWEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE0MjExODF9',
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
