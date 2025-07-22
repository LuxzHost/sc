const handler = async (m, {reply, isOwner}) => {
if (!isOwner) return
let t = await fetchJson('https://api64.ipify.org?format=json')
await reply(`IP Panel : ${t.ip}`)
}

handler.command = ["ip", "getip"]
module.exports = handler