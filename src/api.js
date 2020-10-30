const key = '7c26865789dd258a0c0eed188a26b275'
const baseUrl = `https://api.vagalume.com.br/search.php`

const api = {
  getLyrics: async (artist, music) => {
    try {
      const url = `${baseUrl}?apikey=${key}&art=${artist}&mus=${music}&extra=artpic`
      const response = await fetch(url)
      const lyrics = await response.json()
      if (lyrics.type === 'exact') {
        return {
          name: lyrics.art.name,
          image: lyrics.art.pic_medium,
          lyricsName: lyrics.mus[0].name,
          lyricsText: lyrics.mus[0].text,
          translate: lyrics.mus[0].translate ? lyrics.mus[0].translate[0].text : '',
        }
      } else {
        throw new Error("Nenhum resultado.")
      }
    } catch (err) {
      return {'error': err.message}
    }
  },
}

export default api