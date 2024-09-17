const key = import.meta.env.VITE_VAGALUME_API_KEY;
const baseUrl = `https://api.vagalume.com.br/search.php`;

export type TLyricResponse = {
  success: true;
  name: string;
  image: string;
  lyricsName: string;
  lyricsText: string;
  translate: string;
};

type TError = {
  success: false;
  error: string;
};

const api = {
  getLyrics: async (
    artist: string,
    music: string
  ): Promise<TLyricResponse | TError> => {
    let data: TLyricResponse | TError;

    try {
      const url = `${baseUrl}?apikey=${key}&art=${artist}&mus=${music}&extra=artpic`;
      const response = await fetch(url);

      const lyrics = await response.json();
      if (lyrics.type === 'exact') {
        data = {
          success: true,
          name: lyrics.art.name,
          image: lyrics.art.pic_medium,
          lyricsName: lyrics.mus[0].name,
          lyricsText: lyrics.mus[0].text,
          translate: lyrics.mus[0].translate
            ? lyrics.mus[0].translate[0].text
            : '',
        };
      } else {
        // throw new Error('Nenhum resultado.');
        data = { success: false, error: 'Nenhum resultado.' };
      }
    } catch (err: any) {
      data = { success: false, error: err.message };
    }

    return data;
  },
};

export default api;
