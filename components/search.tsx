"use client";

import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Search = () => {
    return (
        <div className="flex w-full justify-center items-center">
            <Autocomplete
                className="w-11/12 p-2 flex bg-zinc-800 text-white rounded-lg lg:w-1/2"
                freeSolo
                size="small"
                disablePortal
                options={[]}
                renderInput={(params) => <TextField {...params} className="text-white" label={"Search Movies..."} />}
            />
        </div>
    );
};

export default Search;
