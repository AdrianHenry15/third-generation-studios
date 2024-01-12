"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MovieItem from "../movies/movie-item";

interface RowProps {
    title: string;
    fetchURL: string;
    rowID?: string;
}

const MovieRow: React.FC<RowProps> = ({ title, fetchURL, rowID }) => {
    const [movies, setMovies] = useState<any[]>([]); // Adjust 'any' to the actual type of your movie data

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results);
        });
    }, [fetchURL]);

    const slideLeft = () => {
        const slider = document.getElementById(`slider${rowID}`);
        if (slider) slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        const slider = document.getElementById(`slider${rowID}`);
        if (slider) slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div className="relative h-min">
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative flex group items-center">
                <MdChevronLeft
                    onClick={slideLeft}
                    className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-30 hidden group-hover:block"
                    size={40}
                />
                <div id={`slider${rowID}`} className="w-full h-[170px] overflow-hidden flex scroll-smooth relative">
                    {movies.map((item, id) => (
                        <MovieItem key={id} item={item} />
                    ))}
                </div>
                <MdChevronRight
                    onClick={slideRight}
                    className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-30 hidden group-hover:block"
                    size={40}
                />
            </div>
        </div>
    );
};

export default MovieRow;
