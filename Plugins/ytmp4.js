const handler = async (m, { cmd, sock, text, reply }) => {
try {
if (!text) return reply(`Masukan link youtube\n*contoh:* ${cmd} linknya`)
const url = text.trim()
const yt = await fetchJson(`https://api-simplebot.vercel.app/download/ytmp4?apikey=${global.ApikeyRestApi}&url=${url}`)
if (!yt.result) return reply("Audio/vidio tidak ditemukan")
return sock.sendMessage(m.chat, {video: {url: yt.result}, mimetype: "video/mp4", caption: "Youtube Downloader ✅"}, { quoted: m })
} catch (err) {
console.log(err)
return reply(err)
}
}

handler.command = ["ytmp4"]
module.exports = handler