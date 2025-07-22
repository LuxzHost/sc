const fs = require("fs");
const { ImageUploadService } = require('node-upload-images');

const handler = async (m, {reply, sock, isOwner, text, command, cmd, mime, qmsg }) => {
if (!isOwner) return reply(mess.owner)
if (!text || text.split("|").length < 1) return reply(`*contoh:*\n${cmd} key|responnya bisa dengan kirim foto juga`)
const [key, respon] = text.split("|")
if (!key || !respon) return reply(`*contoh:*\n${cmd} key|responnya bisa dengan kirim foto juga`)
const Respon = JSON.parse(fs.readFileSync("./Data/respon.json"));
let media
if (/image/.test(mime)) {
try {
        let mediaPath = await sock.download(qmsg);
        const service = new ImageUploadService('pixhost.to');
  let buffer = fs.readFileSync(mediaPath);
  let { directLink } = await service.uploadFromBinary(buffer, 'skyzo.png');
  media = directLink
        await fs.unlinkSync(mediaPath);
    } catch (err) {
        console.error("Tourl Error:", err);
        reply("Terjadi kesalahan saat mengubah media menjadi URL.");
    }
}

Respon[key] = media !== undefined ? { teks: respon, image: media } : { teks: respon }
await fs.writeFileSync("./Data/respon.json", JSON.stringify(Respon, null, 2))
const result = `Berhasil menambah respon key *${key}* ${media !== undefined ? "Dengan image" : ""}`
return reply(result)
}

handler.command = ["addrespon"]
module.exports = handler