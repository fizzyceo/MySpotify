import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai'
import { ViewGridIcon } from '@heroicons/react/solid'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import Dropdown from '../components/Dropdown'
import RecentlyPlayed from './RecentlyPlayed'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
export default function Leftbar({ spotifyAPI, setchosenTrack }) {
  const { data: session } = useSession()
  const { accessToken } = session
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return

    spotifyAPI.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          }
        })
      )
    })
  }, [accessToken])

  return (
    <div className="w-[450px] space-x-4 space-y-5 p-5 ">
      <div className="flex items-center justify-between space-x-5">
        <div className="flex h-12 items-center justify-center space-x-4 rounded-full border border-[#ccc] py-2 px-2">
          <MdOutlineNotificationsNone className="text-xl text-white" />
          <AiOutlineSetting className="text-xl text-white" />
        </div>
        <Dropdown className="text-xl text-white" />
      </div>
      <div>
        <div className="space-y-4 rounded-xl border-2 border-[#262626] bg-[#0D0D0D] p-4 backdrop-blur-lg ">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">
              Recently Played
            </h4>
            <ViewGridIcon className="h-6 text-[#686868]" />
          </div>

          <div className="h-[250px] space-y-4 overflow-x-hidden overflow-y-scroll scrollbar-hide md:h-[400px]">
            {recentlyPlayed.map((track, index) => (
              <RecentlyPlayed
                key={index}
                track={track}
                setchosenTrack={setchosenTrack}
              />
            ))}
          </div>
          <button className="w-full rounded-2xl bg-[#1A1A1A] bg-opacity-80 py-3.5 px-4 text-[13px] font-bold text-[#CECECE] transition ease-out hover:bg-opacity-100">
            View All
          </button>
        </div>
      </div>
    </div>
  )
}
