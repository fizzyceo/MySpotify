import { BsFilter, BsSearch } from 'react-icons/bs'

export default function Searchbar({ search, setsearch }) {
  return (
    <div className="my-5 mx-12 flex w-[80%] flex-row items-center rounded-full border-2 border-gray-700 py-2 pl-7 text-sm">
      <BsSearch className="h-4 w-4 animate-pulse" />
      <input
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        type="text"
        placeholder="Search Artist,Song,..."
        className="w-[90%] bg-inherit py-2 px-5 outline-none "
      />
      <div className="flex cursor-pointer items-center py-1 px-5 text-white ">
        <BsFilter className="h-4 w-4 " />
        <p>Filter</p>
      </div>
    </div>
  )
}
