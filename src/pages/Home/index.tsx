import { useState } from 'react';

import './styles.css';

import api, { TLyricResponse } from '../../api';

export const Home = () => {
  const [artistInput, setArtistInput] = useState('');
  const [musicInput, setMusicInput] = useState('');
  const [data, setData] = useState<TLyricResponse>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await api.getLyrics(artistInput, musicInput);
    setLoading(false);

    if (!response.success) {
      setError(response.error);
      setData(undefined);
      return;
    }

    setData(response);
  };

  return (
    <main className='container home'>
      <div className='content'>
        <div className='home-search-area'>
          <form action='' onSubmit={handleSubmit}>
            <input
              type='search'
              id='artist'
              placeholder='Artista'
              onChange={(event) => setArtistInput(event.target.value)}
              required
            />
            <input
              type='search'
              id='music'
              placeholder='Música'
              onChange={(event) => setMusicInput(event.target.value)}
              required
            />
            <button>Pesquisar</button>
          </form>
        </div>

        <div className='home-lyrics'>
          {data && (
            <>
              <h1>Letra da Música</h1>

              <div className='home-artist'>
                <img src={data.image} alt='Artist' />
                <div>
                  <h2>{data.name}</h2>
                  <h3>{data.lyricsName}</h3>
                </div>
              </div>

              <div className='home-lyrics-text'>
                <pre>{data.lyricsText}</pre>
                <pre>
                  {data.translate && <h3>Tradução</h3>}
                  {data.translate}
                </pre>
              </div>
            </>
          )}
          {error && <h3>{error}</h3>}
        </div>
      </div>

      {loading && (
        <div className='load'>
          <span></span>
        </div>
      )}
    </main>
  );
};
