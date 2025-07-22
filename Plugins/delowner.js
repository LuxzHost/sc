const fs = require("fs");

const handler = async (m, {sock, isOwner, reply, text, cmd}) => {
if (!isOwner) return reply(mess.owner)
const Own = JSON.parse(fs.readFileSync("./Data/developer.json"))
if (!text) {
if (Own.length < 1) return reply("Tidak ada owner tambahan.")
let rows = []
let number = 0
rows.push({
title: "Hapus semua",
description: "Hapus semua owner", 
id: `.delown all`
})
for (let u of Own) {
rows.push({
title: `+${u.split("@")[0]}`,
description: `https://wa.me/${u.split("@")[0]}`, 
id: `.delown ${u}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Owner',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Owner Yang Ingin Dihapus\nTotal Owner: ${Own.length}\n`
}, { quoted: m })
}


const input = text.trim()
    if (input.toLowerCase() === "all") {
        Own.length = 0
        await fs.writeFileSync("./Data/developer.json", JSON.stringify(Own, null, 2))
        return reply("Berhasil menghapus semua owner ✅")
    }
    if (!Own.includes(input)) return 
    const index = Own.indexOf(input)
    Own.splice(index, 1)
    await fs.writeFileSync("./Data/developer.json", JSON.stringify(Own, null, 2))
await reply(`Berhasil menghapus owner ✅
- Jid: ${input}`)

}

handler.command = ["delown", "delowner"]
module.exports = handler