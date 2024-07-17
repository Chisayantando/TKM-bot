const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9MWmFJTFVNeC9sa2dFTk9yQ0xWSkNOSlZ6TzRGQ0JOMHZON2hINkNWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibXNQY001R3h0REI5dndVR1VGTGx1OHZnQ2JxS1ZHVCtQSWZtWEZxQjYydz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRS9veDFGUnpPeW0wd0tuMkdyb0lQSVpLZFZ1SW5YR0c4VmZ5bStWOFhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5R0Izak9KNndJZzNlUHhBMHh4anc0TW9rNHg0WFdSVlkwZzliOWxUNmdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdNZzRLR3FVQlBDV2lFSkl4U0t0U3AyK3N2WTV3YU1Bb1QyUXZFOXRlRkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVxdkdxVVQwaEdQb29Mc3ZFV3BqeVpUV2EzZnRQcGNNL29kSk4wbWw4bTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0NwWVdQYnIrYWFCdHVxcEtYcU1raTlDV2lJL1hiaC9NcTNlZ010VFFWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDZJWlRKcWp1RVZIdDdxUUdGNHdOTC93WVBXRy9vVW0vQmNPdzhTelpDcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImoyMDY2dnFGRHFEMW1BdkpEc3QxN0hBMkJjQnNHY3ZsYnBMdm4xd1lqb3VMYlVGeGphRmwrZy85Wlp3Y3FraUxFbE81R291Z3lVblJBUHVIR2JiL2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiI1SS9IQnBRT3hObHZndG1JZXY1Q2praGxRbXR5RWxLSGdYMlozZGw5ZTdBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJEZzVpWjFLQlFKS1Naejl1NjJYRXpRIiwicGhvbmVJZCI6ImE0ODE1YjViLTk5ZDktNGE3Mi04NWUzLWE4YWE0N2VhZDk2YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUVzczQTdmT1FRbTY3VFVTZnFuazFZdzFISzg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUE4rK2ZRRlkwWXVQRWxyY0Qrc0FRb1pBVlVBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlM3MU03QUIxIiwibWUiOnsiaWQiOiIyNjM3ODE2ODY1Njg6NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmE4LzdRRUVKYlU0TFFHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRjlRYjVlTng4MmtVNlg2VExXbGdPR21vcS96NzZlK1RrdGVXNzZFUmwxWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibXk4Um5XVmZDd2hwL2FzZkI2V1Rvcm41dmJhSnh4VEdtQkNUeXRkVWovNWw2endQWEtsYUpLYThjUmoxaEtKcVJ3eGhwc1hRM2RhVTduK09XSTMwQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IjJVUndpNGxjUXpUS1FsdkxsUGZ2OUQ1bkdscDVjc1ZIejg0aHhFN1JYaHk4WG5la1dSQXZRYkdGMDZyV2lhYjUzRTU5ZmhwWlRiRkR0dEs5NWtPdmh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgxNjg2NTY4OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmZVRytYamNmTnBGT2wra3kxcFlEaHBxS3Y4Kytudms1TFhsdStoRVpkVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTI0ODI5Mn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mr Ntando ofc",
    NUMERO_OWNER : process.env.OWNER_NUM || "263715275611",              
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
