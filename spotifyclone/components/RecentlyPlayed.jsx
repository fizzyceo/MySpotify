import React from 'react'
import { useRecoilState } from 'recoil'
import { PlayState, Trackonplay } from '../atoms/playerAtom'

export default function RecentlyPlayed({ track, setchosenTrack }) {
  const [Play, setPlay] = useRecoilState(PlayState)
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)

  const handleplay = () => {
    setchosenTrack(track)

    if (track.uri === trackplaying.uri) {
      setPlay(!Play)
    }
  }
  return (
    <div className={`flex items-center space-x-3`} onClick={handleplay}>
      <img
        src={track.albumUrl}
        alt=""
        className={`h-[52px] w-[52px] rounded-full  ${
          Play ? 'border border-green-600' : ''
        }`}
      />
      <div>
        <h4 className="mb-0.5 max-w-[150px] cursor-pointer truncate text-[13px] font-semibold text-white hover:underline">
          {track.title}
        </h4>
        <p className="cursor-pointer text-xs font-semibold text-[#686868] hover:underline">
          {track.artist}
        </p>
      </div>
    </div>
  )
}
