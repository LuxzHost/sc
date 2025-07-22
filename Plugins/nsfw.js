const handler = async (m, { text, sock, reply, command, cmd }) => {
return sock.sendMessage(m.chat, {image: {url: `https://api-simplebot.vercel.app/random/nsfw?apikey=${global.ApikeyRestApi}`}, caption: `Random Image NSFW ✅`}, {quoted: m})
}

handler.command = ["hentai", "nsfw"]
module.exports = handler