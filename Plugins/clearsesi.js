const fs = require("fs");

const handler = async (m, { reply, sock, isOwner }) => {
if (!isOwner) return reply(mess.owner)
const session = await fs.readdirSync("./Auth").filter(e => e !== "creds.json")
await reply(`${session.length} sampah session ditemukan\nmemproses penghapusan . . .`)
for (let i of session) {
await fs.unlinkSync("./Auth/"+i)
}
await global.sleep(3500)
return reply(`Sukses membersihkan ${session.length} sampah session ✅`)
}

handler.command = ["clearsession", "clsesi", "clearsesion"]
module.exports = handler