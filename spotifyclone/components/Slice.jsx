import { FaHeadphonesAlt } from 'react-icons/fa'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { PlayState, Trackonplay } from '../atoms/playerAtom'
import { useState } from 'react'
export default function Slice({ track, setchosenTrack }) {
  const [Play, setPlay] = useRecoilState(PlayState)
  const [trackplaying, settrackplaying] = useRecoilState(Trackonplay)
  const [like, setlike] = useState(false)

  const handleplay = () => {
    setchosenTrack(track)

    if (track.uri === trackplaying.uri) {
      console.log(track)
      setPlay(!Play)
    }
  }
  return (
    <div className="flex h-[70px] cursor-pointer flex-row items-center justify-between transition-all hover:bg-white/25">
      <div className="ml-8 flex flex-row items-center justify-center space-x-3">
        <img src={track.image} alt="" className="h-14 w-14 rounded-lg" />
        <div className="flex flex-col ">
          <h3 className="w-[450px] truncate text-sm font-semibold text-white">
            {track.title}
          </h3>
          <p className="text-[13px] font-semibold text-[rgb(179,179,179)] group-hover:text-white">
            {track.artist}
          </p>
        </div>
      </div>
      <div className="mx-3 flex flex-row items-center space-x-2">
        <FaHeadphonesAlt className="h-14 w-7" />
        <div className="relative flex h-10 w-[85px] flex-grow cursor-pointer items-center  rounded-full border-2 border-gray-600 group-hover:border-gray-300">
          <div className="" onClick={() => setlike(!like)}>
            <AiFillHeart
              className={`absolute left-0 top-0 bottom-0 mr-2 h-full w-7 transition-all hover:scale-110 ${
                like ? 'text-green-600' : 'text-white/60'
              }`}
            />
          </div>
          <div
            onClick={handleplay}
            className=" absolute -right-0.5 flex h-10 w-10 items-center justify-center rounded-full hover:scale-110  hover:text-green-600 "
          >
            {track.uri === trackplaying.uri && Play ? (
              <BsPauseCircle className="h-full w-full" />
            ) : (
              <BsPlayCircle className="h-full w-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
