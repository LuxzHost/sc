const handler = async (m, { sock, reply, text, cmd }) => {
if (!text) return reply(`Masukan link vidio\n*contoh:* ${cmd} linkvidionya`)
if (!text.startsWith("https://")) return reply(`Masukan link vidio\n*contoh:* ${cmd} linkvidionya`)
const res = await fetchJson(`https://api-simplebot.vercel.app/download/tiktok-v2?apikey=${global.ApikeyRestApi}&url=${text}`)
if (!res.result) return reply("Error! result tidak ditemukan")
if (res.result.data.images && res.result.data.images.length !== 0) {
for (let i of res.result.data.images) {
await sock.sendMessage(m.chat, {image: {url: i}, caption: "Tiktok Downloader ✅"}, { quoted: m})
}
} else {
await sock.sendMessage(m.chat, {video: {url: res.result.data.hdplay || res.result.data.play}, caption: "Tiktok Downloader ✅"}, { quoted: m})
}
if (res.result.data) {
await sock.sendMessage(m.chat, {audio: {url: res.result.data.music}, mimetype: "audio/mpeg", ptt: false}, {quoted: m})
}
}

handler.command = ["tt", "tiktok"]
module.exports = handler