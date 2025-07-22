const fs = require("fs");

const handler = async (m, { reply, isOwner }) => {
const Respon = JSON.parse(fs.readFileSync("./Data/respon.json"));
const Obj = Object.keys(Respon)
if (Obj.length < 1) return reply("Tidak ada respon")
let teks = `\n- Total Respon : *${Obj.length}*\n`
for (let i of Obj) {
teks += `\n- *Key Respon:* ${i}\n${Respon[i].image ? "- *Image Respon:* " + Respon[i].image + "\n" : ""}`
}
return m.reply(teks)
}

handler.command = ["listrespon"]
module.exports = handler