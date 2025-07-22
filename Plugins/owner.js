const handler = async (m, { sock }) => {
await sock.sendContact(m.chat, [global.owner], global.namaOwner, "Developer Bot", m)
}

handler.command = ["owner", "own"]
module.exports = handler