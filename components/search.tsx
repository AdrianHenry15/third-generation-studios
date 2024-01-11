"use client";

import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Search = () => {
    return (
        <div className="flex w-full justify-center items-center">
            <Autocomplete
                className="w-11/12 flex bg-zinc-600 text-white rounded-lg lg:w-1/2"
                freeSolo
                size="small"
                options={[]}
                renderInput={(params) => <TextField {...params} label={"Search Movies..."} />}
            />
        </div>
    );
};

export default Search;
