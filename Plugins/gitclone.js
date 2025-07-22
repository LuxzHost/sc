let handler = async (m, { sock, reply, text, cmd }) => {
  if (!text) {
    return reply(`Masukkan link repositori\n\n*contoh:* ${cmd} https://github.com/user/repo`);
  }

  let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
  if (!regex.test(text)) {
    return reply(`Masukkan link repositori\n\n*contoh:* ${cmd} https://github.com/user/repo`);
  }

  try {
    let [, user, repo] = text.match(regex) || [];
    repo = repo.replace(/\.git$/, '');
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    let res = await fetch(url, { method: 'HEAD' });
    let cd = res.headers.get('content-disposition');
    let filename = cd.match(/attachment; filename="?([^"]+)"?/)[1];

    await sock.sendMessage(m.chat, {
      document: { url },
      mimetype: 'application/zip',
      fileName: filename
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await reply(`Error! Repositori tidak ditemukan atau terjadi kesalahan.`);
  }
};

handler.command = ["gitclone"];
module.exports = handler;