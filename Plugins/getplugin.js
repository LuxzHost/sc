const fs = require("fs");

const handler = async (m, { reply, isOwner, text, command, cmd }) => {
try {
if (!isOwner) return reply(mess.owner)
const Plugin = await fs.readdirSync("./Plugins")
if (Plugin.length < 1) return reply("Tidak ada file plugin")
if (!text || !text.endsWith(".js")) return reply(`*contoh:* ${cmd} ping.js`)
if (!Plugin.includes(text)) return reply("Plugin tidak ditemukan")
const result = Plugin.find(i => i == text.toLowerCase().trim())
const teks = await fs.readFileSync(`./Plugins/${text.toLowerCase().trim()}`).toString()
return reply(teks)
} catch (err) {
console.log(err)
}
}

handler.command = ["getp", "gp", "getplugin", "getplugins"]
module.exports = handler