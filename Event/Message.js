const ConfigBaileys = require("../Control/Config.js");
const fs = require("fs");

async function MessageUpsert(sock, m, groupMetadataCache) {
const bot = JSON.parse(fs.readFileSync("./Data/setbot.json"));
    try {
        const msg = m.messages[0];
        if (!msg.message) return;
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return;
        if (bot.autoread && !msg.key.fromMe) sock.readMessages([msg.key]);
        const parsedMsg = await ConfigBaileys(sock, msg);
        if (!sock.public && !parsedMsg.key.fromMe) return;
        if (parsedMsg.isBaileys) return;
        require("../case.js")(parsedMsg, sock, groupMetadataCache);
    } catch (err) {
        console.log('Error on message:', err);
    }
}

module.exports = MessageUpsert;