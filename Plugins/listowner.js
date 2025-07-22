const fs = require("fs");

const handler = async (m, {sock, reply, cmd, isOwner, text}) => {
const Own = JSON.parse(fs.readFileSync("./Data/developer.json"))
if (Own.length < 1) return reply("Tidak ada owner tambahan.")
let teks = ""
for (let i of Own) {
teks += `\n- Number: ${i.split("@")[0]}
- Tag: @${i.split("@")[0]}\n`
}
return reply(teks, m.chat, Own)
}

handler.command = ["listown", "listowner"]
module.exports = handler