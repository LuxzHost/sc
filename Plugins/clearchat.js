const handler = async (m, { sock, reply, isOwner, text, cmd }) => {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`Masukan nomor target\n*contoh:* ${cmd} 62838XXX`)
let jid = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const user = await sock.onWhatsApp(jid.split("@")[0])
if (user.length < 1) return reply("Nomor target tidak terdaftar di whatsapp!")
await sock.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]}, jid)
await reply(`Berhasil menghapus semua chat @${jid.split("@")[0]}`, m.chat, [jid])
}

handler.command = ["clearchat"]
module.exports = handler