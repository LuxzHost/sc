const handler = async (m, { sock, reply, text, cmd }) => {
if (!text) return reply(`Masukan link vidio\n*contoh:* ${cmd} linkvidionya`)
if (!text.startsWith("https://")) return reply(`Masukan link vidio\n*contoh:* ${cmd} linkvidionya`)
const res = await fetchJson(`https://api-simplebot.vercel.app/download/xnxx?apikey=${global.ApikeyRestApi}&url=${text}`)
if (!res.result) return reply("Error! result tidak ditemukan")
await sock.sendMessage(m.chat, {video: {url: res.result.files.high || res.result.files.low}, caption: "XNXX Downloader ✅"}, { quoted: m})
}

handler.command = ["xnxx", "xnxxdl"]
module.exports = handler