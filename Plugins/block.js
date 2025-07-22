const handler = async (m, {reply, sock, isOwner, text }) => {
  try {
    if (!isOwner) return;
    if (m.isGroup && !m.quoted && !text) {
      return reply("Tag atau reply nomor yang ingin diblokir.");
    }
    const mem = !m.isGroup
      ? m.chat
      : m.mentionedJid?.[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : text
      ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
      : null;
    if (!mem) return reply("Nomor tidak valid atau tidak ditemukan.");
    await sock.updateBlockStatus(mem, "block");
    if (m.isGroup) {
      await sock.sendMessage(
        m.chat,
        {
          text: `✅ Berhasil memblokir @${mem.split("@")[0]}`,
          mentions: [mem],
        },
        { quoted: m }
      );
    }
  } catch (err) {
    console.error("Gagal memblokir nomor:", err);
    reply("Terjadi kesalahan saat memblokir nomor.");
  }
};

handler.command = ["block", "blokir", "blok", "bl"]
module.exports = handler