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

const chalk = require("chalk");
const fs = require("fs");


//============ Setting Bot ============//

global.owner = "6283181145670"
global.namaOwner = "Skyzopedia"
global.namaBot = "Selfbot"
global.versiBot = "2.0.0"
global.idChannel = "120363411804377677@newsletter"
global.namaChannel = "~ Skyzopedia Testimoni"
global.linkChannel = "https://whatsapp.com/channel/0029Vb8cgMEH5JLqiOEdbH1t"
global.linkGrup = "https://chat.whatsapp.com/KrfYsKF0iYICQNWnV4BFzl?mode=ac_t"
global.thumbnail = "https://img1.pixhost.to/images/6965/618510211_skyzo.jpg"


//========== Setting Payment ===========//

global.payment = {
dana: "085624297893", 
ovo: "-", 
gopay: "-", 
qris: "https://img1.pixhost.to/images/6969/618548546_skyzo.jpg"
}


//========== Setting Api Panel ===========//

global.egg = "15" // Isi id egg
global.nestid = "5" // Isi id nest
global.loc = "1" // Isi id location
global.domain = "https://server.pteroweb.my.id"
global.apikey = "ptla_Y4ncswSnb1xUteM4wpBbS0HdSflv5UnA4kpV7ARFW" // Isi api ptla
global.capikey = "ptlc_4XHu5WA8vAjl6kWatRy7EKkuzlTWw2RyKYChFfu7x" // Isi api ptlc


//========= Setting Api Digitalocean =======//

global.apiDigitalOcean = ""


//======== Setting Link Grup Reseller =======//

global.linkGrupResellerPanel = ""


//========= Setting Api Orderkuota ========//

global.QrisOrderKuota = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214621103778158240303UMI51440014ID.CO.QRIS.WWW0215ID20243511142180303UMI5204541153033605802ID5920SKYZOPEDIA OK20882436009SIJUNJUNG61052751162070703A0163042A2F"
global.ApikeyOrderKuota = "846854217289281822088243OKCTF5EC133AC4A0C62E4E29B23C43291972"
global.IdMerchant = "OK2088243"
global.pinH2H = "1111"
global.passwordH2H = "Gajollay11111"


//========== Setting Api RestApi =========//

global.ApikeyRestApi = "free"


//========= Setting Api Subdomain ========//

global.subdomain = {
  "pteroweb.my.id": {
    "zone": "714e0f2e54a90875426f8a6819f782d0",
    "apitoken": "vOn3NN5HJPut8laSwCjzY-gBO0cxeEdgSLH9WBEH"
  },
  "panelwebsite.biz.id": {
    "zone": "2d6aab40136299392d66eed44a7b1122",
    "apitoken": "CcavVSmQ6ZcGSrTnOos-oXnawq4yf86TUhmQW29S"
  },
  "privatserver.my.id": {
    "zone": "699bb9eb65046a886399c91daacb1968",
    "apitoken": "CcavVSmQ6ZcGSrTnOos-oXnawq4yf86TUhmQW29S"
  },
  "serverku.biz.id": {
    "zone": "4e4feaba70b41ed78295d2dcc090dd3a",
    "apitoken": "CcavVSmQ6ZcGSrTnOos-oXnawq4yf86TUhmQW29S"
  },
  "vipserver.web.id": {
    "zone": "e305b750127749c9b80f41a9cf4a3a53",
    "apitoken": "cpny6vwi620Tfq4vTF4KGjeJIXdUCax3dZArCqnT"
  }, 
  "mypanelstore.web.id": {
    "zone": "c61c442d70392500611499c5af816532",
    "apitoken": "uaw-48Yb5tPqhh5HdhNQSJ6dPA3cauPL_qKkC-Oa"
  }
}


//=========== Setting Message ===========//

global.mess = {
owner: "Fitur ini hanya untuk ownerbot.", 
group: "Fitur ini hanya dapat digunakan ketika bot berada di dalam grup.", 
private: "Fitur ini hanya dapat digunakan ketika bot berada di private chat.", 
admin: "Fitur ini hanya dapat digunakan admin grup.", 
botadmin: "Fitur ini hanya dapat digunakan ketika bot menjadi admin grup.", 
}



let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.green(`File update: ${__filename}`));
    delete require.cache[file];
    require(file);
});