const fs = require("fs");

const handler = async (m, {sock, reply, cmd, isOwner, text}) => {
if (!isOwner) return reply(mess.owner)
let input = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null
if (!input) return reply(`*example:* ${cmd} 6283XXX`)
let jid = input.split("@")[0]
const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net"
if (jid == global.owner || input == botNumber) return reply(`Nomor ${jid} sudah menjadi ownerbot.`)
const Own = JSON.parse(fs.readFileSync("./Data/developer.json"))
if (Own.includes(input)) return reply(`Nomor ${jid} sudah menjadi ownerbot.`)
Own.push(input)
await fs.writeFileSync("./Data/developer.json", JSON.stringify(Own, null, 2))
await reply(`Berhasil menambah owner ✅
- Jid: ${input}`)
}

handler.command = ["addown", "addowner"]
module.exports = handler