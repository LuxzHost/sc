const handler = async (m, { cmd, sock, text, reply }) => {
try {
if (!text) return reply(`Masukan link youtube\n*contoh:* ${cmd} linknya`)
const url = text.trim()
const yt = await fetchJson(`https://api-simplebot.vercel.app/download/ytmp3?apikey=${global.ApikeyRestApi}&url=${url}`)
if (!yt.result) return reply("Audio/vidio tidak ditemukan")
const audio = await getBuffer(yt.result)
return sock.sendMessage(m.chat, {audio: audio, mimetype: "audio/mpeg", ptt: false}, { quoted: m })
} catch (err) {
console.log(err)
return reply(err)
}
}

handler.command = ["ytmp3", "yt", "ytdl"]
module.exports = handler