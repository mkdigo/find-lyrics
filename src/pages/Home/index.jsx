import { useState } from 'react'

import './styles.css'

import api from '../../api'

const Home = () => {
  const [artistInput, setArtistInput] = useState('')
  const [musicInput, setMusicInput] = useState('')
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    const response = await api.getLyrics(artistInput, musicInput)
    setData(response)

    setLoading(false)
  }


  return (
    <main className="container home">
      <div className="content">
        <div className="home-search-area">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="search"
              id="artist"
              placeholder="Artista"
              onChange={(event) => setArtistInput(event.target.value)}
              required
            />
            <input
              type="search"
              id="music"
              placeholder="Música"
              onChange={(event) => setMusicInput(event.target.value)}
              required
            />
            <button>Pesquisar</button>
          </form>
        </div>

        <div className="home-lyrics">
          {data.name && (
            <>

              <h1>Letra da Música</h1>

              <div className="home-artist">
                <img src={data.image} alt="Artist"/>
                <div>
                  <h2>{data.name}</h2>
                  <h3>{data.lyricsName}</h3>
                </div>
              </div>

              <div className="home-lyrics-text">
                <pre>
                  {data.lyricsText}
                </pre>
                <pre>
                  {data.translate && <h3>Tradução</h3>}
                  {data.translate}
                </pre>

              </div>
            </>
          )}
          {data.error && (
            <h3>{data.error}</h3>
          )}
        </div>
      </div>

      {loading && (
        <div className="load">
          <span></span>
        </div>
      )}
    </main>
  )
}

export default Home