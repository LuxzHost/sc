const fs = require("fs");

const handler = async (m, { reply, isOwner, text, command, cmd }) => {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`*contoh:*\n${cmd} keyresponnya`)
const Respon = JSON.parse(fs.readFileSync("./Data/respon.json"));
const res = text.toLowerCase()
if (!Respon[res]) return reply("Key respon tidak ditemukan")
delete Respon[res]
await fs.writeFileSync("./Data/respon.json", JSON.stringify(Respon, null, 2))
const result = `Berhasil menghapus respon key *${res}*`
return reply(result)
}

handler.command = ["delrespon"]
module.exports = handler