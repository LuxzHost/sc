const handler = async (m, { sock, reply, text, cmd }) => {
if (!text) return reply(`Masukan link vidio\n*contoh:* ${cmd} linkvidionya`)
if (!text.startsWith("https://")) return reply(`Masukan link vidio\n*contoh:* ${cmd} linkvidionya`)
const res = await fetchJson(`https://api-simplebot.vercel.app/download/instagram?apikey=${global.ApikeyRestApi}&url=${text}`)
if (!res.result) return reply("Error! result tidak ditemukan")
if (res.result.length !== 1) {
for (let i of res.result) {
await sock.sendMessage(m.chat, {image: {url: i.url_download}, caption: "Instagram Downloader ✅"}, { quoted: m})
}
} else {
await sock.sendMessage(m.chat, {video: {url: res.result[0].url_download}, caption: "Instagram Downloader ✅"}, { quoted: m})
}
}

handler.command = ["ig", "igdl", "Instagram"]
module.exports = handler