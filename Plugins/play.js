const Yts = require("yt-search")

const handler = async (m, { sock, text, reply }) => {
try {
if (!text) return reply(`Masukan judul youtube\n*contoh:* .play we cant be friends`)
const ress = await Yts(text)
if (ress.all.length < 1) return reply("Audio/vidio tidak ditemukan")
reply("Memproses pencarian audio 🔍")
const { title, url, thumbnail, timestamp, author } = ress.all[0]
const yt = await fetchJson(`https://api-simplebot.vercel.app/download/ytmp3?apikey=${global.ApikeyRestApi}&url=${url}`)
if (!yt.result) return reply("Audio/vidio tidak ditemukan")
return sock.sendMessage(m.chat, {audio: {url: yt.result}, mimetype: "audio/mpeg", ptt: false, contextInfo: {
externalAdReply: {
title: title, 
body: `Duration: ${timestamp} || Creator: ${author.name}`, 
thumbnailUrl: thumbnail,
renderLargerThumbnail: true, 
mediaType: 1, 
sourceUrl: url
}
}}, { quoted: m })
} catch (err) {
return reply(err)
}
}

handler.command = ["play"]
module.exports = handler