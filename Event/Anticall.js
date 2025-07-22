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

async function AnticallMessage (sock, update) {
try {
   const setting = JSON.parse(fs.readFileSync("./Data/setbot.json"));
    let botNumber = await sock.decodeJid(sock.user.id);
    let anticall = setting.anticall && setting.anticall == true
    if (!anticall) return;
    for (let user of update) {
        if (!user.isGroup && user.status === "offer") {
            let message = `
*Panggilan Terdeteksi 🚩*

Kamu akan saya blokir, karna owner menyalakan fitur anticall.
Hubungi ownerbot untuk membuka blokiran!
            `;
       await sock.rejectCall(user.id, user.from)

            let chats = await sock.sendMessage(user.from, {
                text: message,
                mentions: [user.from]
            });
            
            await sock.sendContact(user.from, [global.owner], global.namaOwner, "Developer Bot", chats)

          setTimeout(async () => {
                await sock.updateBlockStatus(user.from, "block");
            }, 8000);
        }
    }
  } catch (e) {
  }
}

module.exports = AnticallMessage