exports.run = {
  usage: ['fb'],
  hidden: ['fbdl', 'fbvid'],
  use: 'link',
  category: 'downloader',
  async: async (m, {
    client,
    args,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m)
      if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
      client.sendReact(m.chat, '🕒', m.key)
      let json = await Func.fetchJson(API('alya', '/api/fb', {
        url: args[0]
      }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      let result = json.data.find(v => v.quality == 'HD' && v.response == 200)
      if (result) {
        client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦ *Quality* : HD`, m)
      } else {
        let result = json.data.find(v => v.quality == 'SD' && v.response == 200)
        if (!result) return client.reply(m.chat, global.status.fail, m)
        client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦ *Quality* : SD`, m)
      }
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}
