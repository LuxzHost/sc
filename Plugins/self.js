const handler = async (m, { isOwner, sock, reply, command }) => {
if (!isOwner) return reply(mess.owner)
let status = true
if (command == "self") status = false
sock.public = status
return reply(`Berhasil mengganti ke mode ${command}`)
}

handler.command = ["self", "public"]
module.exports = handler