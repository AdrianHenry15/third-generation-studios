import React, { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Image from "next/image"

const Project = ({ item }: { item: string }) => {
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)

  // const saveShow = async () => {
  //   if (user?.email) {
  //     setLike(!like);
  //     setSaved(true);
  //     await updateDoc(movieID, {
  //       savedShows: arrayUnion({
  //         id: item.id,
  //         title: item.title,
  //         img: item.backdrop_path,
  //       }),
  //     });
  //   } else {
  //     alert('Please log in to save a movie');
  //   }
  // };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <Image className="w-full h-auto block" src={``} alt={item} />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item}
        </p>
        <p onClick={() => {}}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  )
}

export default Project
