const yts = require("yt-search");

let handler = async (m, { sock, text, cmd, reply }) => {
if (!text) return reply(`Masukan judul\n*contoh:* ${cmd} story anime 30detik`)
let data = await yts(text)
if (data.all.length < 1) return m.reply("Data vidio tidak ditemukan!")
let anuan = data.all
let teks = ""
for (let res of anuan) {
teks += `\n* *Title :* ${res.title}
* *Durasi :* ${res.timestamp}
* *Upload :* ${res.ago}
* *Views :* ${res.views || "Unknown"}
* *Author :* ${res?.author?.name || "Unknown"}
* *Source :* ${res.url}\n`
}
await m.reply(teks)
}

handler.command = ["yts", "ytsearch"]
module.exports = handler