import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Loading from '../components/Loading'
import Mainbody from '../components/Mainbody'
import Leftbar from '../components/Leftbar'
import { useRecoilState } from 'recoil'
import { Trackonplay } from '../atoms/playerAtom'
import spotifyApi from '../lib/Spotify'
import Player from '../components/Player'
export default function Home() {
  const router = useRouter()
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('auth/login')
    },
  })
  if (status === 'loading') {
    return <Loading />
  }
  const setchosenTrack = (track) => {
    settrackplaying(track)
  }

  return (
    <div className="flex flex-col overflow-x-hidden bg-gray-900 pb-36 scrollbar-hide">
      <main className="flex  w-screen flex-row ">
        <Sidebar />
        <Mainbody spotifyAPI={spotifyApi} setchosenTrack={setchosenTrack} />
        <Leftbar
          className=""
          spotifyAPI={spotifyApi}
          setchosenTrack={setchosenTrack}
        />
        <Player
          accessToken={session.accessToken}
          track={trackplaying}
          setchosenTrack={setchosenTrack}
        />
        {/**
         
         * tasks : fix the genres width and colors
         * in mobile vew the sidebar should appear on the bottom under the player
         * add the left bar and logout
         *
         */}
      </main>
      <footer>{/**sound player */}</footer>
    </div>
  )
}
