import React, { useEffect } from 'react'
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs'
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/Io'
import { MdOutlineReplay } from 'react-icons/md'
import { GiMicrophone } from 'react-icons/gi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { PlayState, Trackonplay } from '../atoms/playerAtom'

import SpotifyPlayer from 'react-spotify-player'
import spotifyApi from '../lib/Spotify'
import useSongInfo from './useSongInfo'
export default function Player({ track, setchosenTrack, accessToken }) {
  const [Play, setPlay] = useRecoilState(PlayState)
  const [lyrics, setLyrics] = useState('')
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)
  const song = useSongInfo()
  console.log(song)
  console.log(spotifyApi.getAccessToken())
  const handleplay = () => {
    setchosenTrack(track)
    console.log(song)
    if (track.uri === trackplaying.uri) {
      setPlay(!Play)
    }
  }
  useEffect(() => {
    if (track.uri) {
    }
  }, [track.uri])
  const [like, setlike] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 box-border flex h-24 flex-grow flex-row items-center justify-between space-x-4 border-t  border-[#ccc] bg-gray-900 px-6 shadow-md shadow-white/70">
      <div className="flex max-w-xs flex-row items-center justify-center space-x-3">
        <img
          src={track.image ? track.image : track.albumUrl}
          alt=""
          className="h-14 w-14 rounded-lg"
        />
        <div className="flex flex-col justify-start ">
          <p className="text-base text-white">{track.title} </p>
          <p className="text-sm text-gray-500 underline">{track.artist}</p>
        </div>
      </div>

      <div className="flex  flex-row items-center justify-center space-x-4">
        <IoMdSkipBackward className="text-3xl text-white  " />
        <div
          onClick={handleplay}
          className="  h-10 w-10 rounded-full text-white hover:scale-110  hover:text-green-600 "
        >
          {track?.uri === trackplaying.uri && Play ? (
            <BsPauseCircle className="h-full w-full" />
          ) : (
            <BsPlayCircle className="h-full w-full" />
          )}
        </div>
        <IoMdSkipForward className="text-3xl text-white  " />
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <GiMicrophone className="h-10 w-10 cursor-pointer text-white transition-all hover:scale-105" />
        <div className="" onClick={() => setlike(!like)}>
          <AiFillHeart
            className={` h-10 w-10 text-white transition-all hover:scale-110 ${
              like ? 'text-green-600' : 'text-white/60'
            }`}
          />
        </div>
      </div>
    </div>
  )
}
