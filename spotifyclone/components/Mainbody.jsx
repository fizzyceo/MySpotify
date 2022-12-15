import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Searchbar from '../components/Searchbar'
import Slice from '../components/Slice'
import spotifyApi from '../lib/Spotify'
import Poster from '../components/Poster'
import { PlayState, Trackonplay } from '../atoms/playerAtom'
import { useRecoilState } from 'recoil'
export default function Mainbody({ setchosenTrack }) {
  const [search, setsearch] = useState('')
  const [searchresults, setSearchresults] = useState([])
  const [newreleases, setnewreleases] = useState([])
  const [genresSeed, setgenresSeed] = useState([])
  const { data: session } = useSession()
  const [genrestoshow, setgenrestoshow] = useState(9)
  const [moreless, setmoreless] = useState('MORE...')

  const [Play, setPlay] = useRecoilState(PlayState)
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)

  const { accessToken } = session

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])
  useEffect(() => {
    if (!search) return setSearchresults([])
    else {
      spotifyApi.searchTracks(search).then(
        (data) => {
          console.log(data)
          setSearchresults(
            data.body.tracks.items.map((track) => {
              return {
                id: track.id,
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                image: track.album.images[0].url,
                popularity: track.popularity,
              }
            })
          )
        },
        (err) => console.log(err)
      )
    }
  }, [search, accessToken])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.getNewReleases().then(
      (data) => {
        setnewreleases(
          data.body.albums.items.map((track) => {
            return {
              id: track.id,
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              image: track.images[0].url,
            }
          })
        )
      },
      (err) => console.log(err)
    )

    spotifyApi.getAvailableGenreSeeds().then(
      function (data) {
        setgenresSeed(data.body.genres)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }, [accessToken])

  return (
    <div className="w-[75%] overflow-x-scroll text-white scrollbar-hide sm:w-screen">
      <Searchbar search={search} setsearch={setsearch} />
      <div className="md:grid-x-10 grid  h-96 grid-cols-1 gap-y-3 overflow-x-scroll overflow-y-scroll p-3 scrollbar-hide sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-52">
        {searchresults.length === 0
          ? newreleases
              .slice(0, 4)
              .map((release) => (
                <Poster release={release} setchosenTrack={setchosenTrack} />
              ))
          : searchresults
              .slice(0, 4)
              .map((release) => (
                <Poster release={release} setchosenTrack={setchosenTrack} />
              ))}
      </div>
      <div className="flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row">
        <div className="genres">
          <h1 className="font-semibold ">Genres</h1>
          <div className="my-2 grid max-h-80 grid-cols-1 gap-3 overflow-y-scroll text-center scrollbar-hide md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {genresSeed.slice(0, genrestoshow).map((genre) => (
              <p className="cursor-pointer rounded-lg border-[1px] border-green-600 bg-inherit py-1 px-2 text-sm text-white hover:shadow-sm hover:shadow-white ">
                {genre}
              </p>
            ))}
          </div>
          <h3
            onClick={() => {
              genrestoshow === 9
                ? setgenrestoshow(genresSeed.length)
                : setgenrestoshow(9)

              moreless === 'MORE...'
                ? setmoreless('LESS')
                : setmoreless('MORE...')
            }}
            className="my-2  cursor-pointer rounded-lg border-[1px] border-green-600 bg-inherit py-1 px-3 text-center text-white hover:shadow-sm hover:shadow-white "
          >
            {moreless}
          </h3>
        </div>
        <div className="ml-5">
          <h1 className="font-semibold ">
            {searchresults.length === 0 ? 'new Releases' : 'Tracks'}
          </h1>
          <div className="container max-h-[250px] w-[700px] overflow-y-scroll rounded-lg border-[1px] border-gray-600 p-2 scrollbar-w-3 scrollbar-thumb-gray-800 scrollbar-track-gray-400">
            {searchresults.length === 0
              ? newreleases
                  .slice(4, newreleases.length)
                  .map((release) => (
                    <Slice track={release} setchosenTrack={setchosenTrack} />
                  ))
              : searchresults
                  .slice(4, searchresults.length)
                  .map((result) => (
                    <Slice track={result} setchosenTrack={setchosenTrack} />
                  ))}
          </div>
        </div>
      </div>
    </div>
  )
}
