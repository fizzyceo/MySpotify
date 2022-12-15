import { FiPlay } from 'react-icons/fi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { PlayState, Trackonplay } from '../atoms/playerAtom'
export default function Poster({ release, setchosenTrack }) {
  const [Play, setPlay] = useRecoilState(PlayState)
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)
  const handleplay = () => {
    setchosenTrack(release)

    if (release.uri === trackplaying.uri) {
      setPlay(!Play)
    }
  }
  return (
    <div
      className="relative mx-3 h-[320px] w-[280px] cursor-pointer  rounded-[25px] text-white/80 transition-all  hover:scale-95"
      onClick={handleplay}
    >
      <img
        src={release.image}
        className="h-[85%] w-full rounded-[25px]  object-cover transition-all "
        alt={release.title}
      />
      <p className=" absolute bottom-20 left-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-600/90 shadow-sm shadow-green-600/80">
        {release.uri === trackplaying.uri && Play ? (
          <BsFillPauseFill className="text-2xl" />
        ) : (
          <BsFillPlayFill className="text-2xl" />
        )}
      </p>
      <h3 className="absolute bottom-0 left-3 text-white">{release.title}</h3>
      <p className="absolute -bottom-5 left-3 text-slate-200 decoration-black">
        {release.artist}
      </p>
    </div>
  )
}
