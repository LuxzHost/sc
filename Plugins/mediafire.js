const handler = async (m, {sock, reply, cmd, text}) => {
if (!text || !text.includes("mediafire")) return reply(`Masukan link mediafire\n*contoh:* ${cmd} linknya`)
const res = await fetchJson(`https://api-simplebot.vercel.app/download/mediafire?apikey=${global.ApikeyRestApi}&url=${text}`)
if (!res.result || !res.result.url) return reply(`Error file tidak ditemukan`)
const data = res.result
return sock.sendMessage(m.chat, {document: {url: data.url}, fileName: data.filename, mimetype: data.mimetype, caption: `Mediafire Downloader ✅`}, {quoted: m})
}

handler.command = ["mediafire"]
module.exports = handler