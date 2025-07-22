const Jimp = require("jimp");
const QrCode = require("qrcode-reader");

const handler = async (m, { sock, reply, mime }) => {
try {
if (!/image/.test(mime)) return reply("Mana qr nya?\n*contoh:* .readqr dengan reply qr")
async function readQRISFromBuffer(buffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await Jimp.read(buffer);
            const qr = new QrCode();
            qr.callback = (err, value) => {
                if (err) return reject(err);
                resolve(value ? value.result : null);
            };
            qr.decode(image.bitmap);
        } catch (error) {
            return m.reply("error : " + error)
        }
    });
}
let aa = m.quoted ? await m.quoted.download() : await m.download()
let dd = await readQRISFromBuffer(aa)
reply(dd)
} catch (err) {
return reply(err)
}
}

handler.command = ["readqr"]
module.exports = handler