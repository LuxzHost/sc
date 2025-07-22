const handler = async (m, { text, sock, reply, command, cmd }) => {
if (!text) return reply(`Input url!\nContoh: *${cmd}* https://google.com`)
if (!text.startsWith("https://") && !text.startsWith("http://")) return reply("Link tautan tidak valid!")
const image = await fetchJson(`https://api-simplebot.vercel.app/tools/ssweb?apikey=${global.ApikeyRestApi}&url=${text.trim()}`)
return sock.sendMessage(m.chat, {image: {url: image.result}, caption: `Berhasil mengambil gambar web ✅\n- ${text.trim()}`}, {quoted: m})
}

handler.command = ["ssweb"]
module.exports = handler