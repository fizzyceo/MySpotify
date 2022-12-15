import { useEffect } from 'react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Trackonplay } from '../atoms/playerAtom'
import spotifyApi from '../lib/Spotify'
export default function useSongInfo() {
  const [song, setSong] = useState(null)
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)
  console.log(trackplaying)
  useEffect(() => {
    const fetching = async () => {
      const track = await fetch(
        `https://api.spotify.com/v1/tracks/${trackplaying.id}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((data) => data.json())

      setSong(track)
    }
    fetching()
  }, [trackplaying, spotifyApi])
  console.log(song)
  return song
}
