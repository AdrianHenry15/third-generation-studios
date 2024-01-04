"use client"

import React, { useEffect, useState } from "react"
import Project from "./project"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

const Row = ({ title, rowID }: { title: string; rowID: string }) => {
  const [movies, setMovies] = useState([])

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID)
    slider!.scrollLeft = slider!.scrollLeft - 500
  }
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID)
    slider!.scrollLeft = slider!.scrollLeft + 500
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies.map((item, id) => (
            <Project key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  )
}

export default Row
