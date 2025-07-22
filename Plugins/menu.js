const handler = async (m, { sock, isOwner }) => {
const teks = `
  ▢ Botmode: ${sock.public ? "Public" : "Self"}
  ▢ Runtime: ${runtime(process.uptime())}
  ▢ Creator: @${global.owner}
   
  ╭〣 *Mainmenu*
  │.rvo
  │.getpp
  │.script 
  │.brat
  │.toghibli
  │.tohitam
  │.sticker
  │.swm
  ╰〣

  ╭〣 *Toolsmenu*
  │.ai
  │.ssweb  
  │.tourl
  │.readqr
  │.enchard
  │.enchard2
  │.tohd
  │.removebg
  ╰〣
  
  ╭〣 *Downloadmenu*
  │.tiktok
  │.facebook
  │.instagram
  │.mediafire
  │.gitclone
  │.play
  │.ytmp3
  │.ytmp4
  │.xnxx
  ╰〣  
  
  ╭〣 *Searchmenu*
  │.pinterest
  │.yts
  │.npm
  │.nsfw
  │.xnxxs
  ╰〣
    
  ╭〣 *Shoopmenu*
  │.belipanel
  │.belireseller
  │.beliadp
  │.beliscript
  │.topupdana
  │.topupgopay
  │.topupovo
  │.topupml
  │.topupff
  ╰〣
 
  ╭〣 *Storemenu*
  │.jpm
  │.jpmht
  │.puskontak
  │.setjeda
  │.savekontak
  │.startjpm
  │.setjpm
  │.delsetjpm
  │.listgc
  │.testi
  │.payment
  │.proses
  │.done
  ╰〣

  ╭〣 *Groupmenu*
  │.kudeta
  │.antilink
  │.antilink2
  │.antilinkch
  │.bljpm
  │.delbljpm
  │.open/close
  │.kick
  │.hidetag
  │.promote
  │.demote
  │.acc/reject
  ╰〣
  
  ╭〣 *Channelmenu*
  │.addidch
  │.listidch
  │.delidch
  │.jpmch
  │.idch
  │.joinch
  │.reactch
  ╰〣  

  ╭〣 *Panelmenu*
  │.1gb
  │.2gb
  │.3gb
  │.4gb
  │.5gb
  │.6gb
  │.7gb
  │.8gb
  │.9gb
  │.10gb
  │.unlimited
  │.listpanel
  │.delpanel
  │.cadmin
  │.listadmin
  │.deladmin
  │.addakses
  │.listakses
  │.delakses
  │.subdomain
  │.installpanel
  │.uninstallpanel
  │.startwings  
  │.hbpanel  
  ╰〣
  
  ╭〣 *Digitaloceanmenu*
  │.createvps
  │.listdroplet
  │.deldroplet
  │.rebuildvps
  ╰〣  
  
  ╭〣 *Setbotmenu*
  │.autoread
  │.anticall
  │.setppbot
  │.welcome
  ╰〣  
  
  ╭〣 *Ownermenu*
  │.addplugin
  │.saveplugin
  │.listplugin
  │.delplugin 
  │.addown
  │.delown
  │.listown
  │.addsc
  │.delsc
  │.getsc
  │.addrespon
  │.listrespon
  │.delrespon
  │.getcase  
  │.addcase
  │.listcase
  │.block
  │.backupsc
  │.clearsesion
  │.clearchat
  │.restartbot
  ╰〣  
`
await sock.sendMessage(m.chat, {text: teks, contextInfo: {
mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"], 
isForwarded: true, 
forwardedNewsletterMessageInfo: {
newsletterJid: global.idChannel,
newsletterName: `Powered by ${global.namaOwner}`, 
serverId: 200
}, 
externalAdReply: {
title: `© ${global.namaBot} - Version ${global.versiBot}`, 
body: 'Whatsapp bot baileys automatic system', 
thumbnailUrl: global.thumbnail, 
renderLargerThumbnail: true, 
mediaType: 1, 
previewType: 1, 
sourceUrl: "", 
}}
}, {quoted: null })
}

handler.command = ["menu"]
module.exports = handler