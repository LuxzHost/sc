const fs = require("fs");
const { S_WHATSAPP_NET } = require("@whiskeysockets/baileys");

const handler = async (m, { sock, reply, isOwner, mime, qmsg, cmd }) => {
if (!isOwner) return reply(mess.owner)
if (!/image/.test(mime)) return reply(`Ketik *${cmd}* dengan kirim/reply foto`)
const buffer = await sock.download(qmsg)
var { img } = await global.generateProfilePicture(buffer)
await sock.query({
tag: 'iq',
attrs: {
to: S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
m.reply("Sukses mengganti foto profil ✅")
await fs.unlinkSync(buffer)
}

handler.command = ["setppbot"]
module.exports = handler