import { signOut, useSession } from 'next-auth/react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { BiHomeSmile } from 'react-icons/bi'
import { IoMdMusicalNote } from 'react-icons/io'
import Image from 'next/image'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { GiNetworkBars } from 'react-icons/gi'
import { GoSettings } from 'react-icons/go'
function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="box-border flex h-screen w-28 flex-col items-center justify-start space-y-8 overflow-hidden border-r-2 border-gray-800 py-14 text-sm text-gray-500">
      <img
        className="profilpic h-12 w-12 rounded-full object-fill"
        src={session.user.image}
      />
      <button className=" space-x-2  hover:text-white">
        <BiHomeSmile className="h-8 w-8 bg-inherit text-white shadow-md " />
      </button>
      <button className=" space-x-2 hover:text-white">
        <IoMdMusicalNote className="h-8 w-8" />
      </button>
      <button className=" space-x-2 hover:text-white">
        <FaMicrophoneAlt className="h-8 w-8" />
      </button>

      <button className=" space-x-2  hover:text-white">
        <GiNetworkBars className="h-8 w-8" />
      </button>
      <button className=" space-x-2 hover:text-white">
        <HeartIcon className="h-8 w-8" />
      </button>
      <button className=" space-x-2 hover:text-white">
        <GoSettings className="h-8 w-8" />
      </button>
    </div>
  )
}

export default Sidebar
