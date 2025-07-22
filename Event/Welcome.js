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

require("../settings.js")
const fs = require("fs");

async function WelcomeMessage (sock, update) {
const bot = JSON.parse(fs.readFileSync("./Data/setbot.json"));
            const { id, author, participants, action } = update;
            if (!bot.welcome) return;
            try {
                const metadata = await sock.groupMetadata(id);
                for (let n of participants) {
                    let teks = "";        
                    if (action === "add") {
                        teks = "\n" + author === n ? `@${author.split("@")[0]} Telah *menambahkan* @${n.split("@")[0]} ke dalam grup.` : `@${n.split("@")[0]} Selamat datang di grup ${metadata.subject}`;
                        teks += `\n\n📢 Jangan lupa join grup :
* ${global.linkGrup}`                        
                        await sock.sendMessage(id, {text: teks, mentions: [author, n]}, {quoted: null})

                    } else if (action === "remove") {
                        teks = "\n" + author !== n ? `@${n.split("@")[0]} Telah *keluar* dari grup.` : `@${author.split("@")[0]} Telah *mengeluarkan* @${n.split("@")[0]} dari grup.`;
                        teks += `\n\n📢 Jangan lupa join grup :
* ${global.linkGrup}`              
                        await sock.sendMessage(id, {text: teks, mentions: [author, n]}, {quoted: null})

                    } else if (action === "promote") {
                        teks = "\n" + `@${author.split("@")[0]} Telah *menjadikan* @${n.split("@")[0]} sebagai *admin* grup.`;
                        teks += `\n\n📢 Jangan lupa join grup :
* ${global.linkGrup}`
                        await sock.sendMessage(id, {text: teks, mentions: [author, n]}, {quoted: null})

                    } else if (action === "demote") {
                        teks = "\n" + `@${author.split("@")[0]} Telah *menghentikan* @${n.split("@")[0]} sebagai *admin* grup.`;
                        teks += `\n\n📢 Jangan lupa join grup :
* ${global.linkGrup}`              
                        await sock.sendMessage(id, {text: teks, mentions: [author, n]}, {quoted: null})
                    }
                }
            } catch (e) {
            }
}

module.exports = WelcomeMessage