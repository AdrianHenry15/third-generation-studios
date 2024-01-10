"use client";

import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const Search = () => {
    return (
        <div className="flex w-full justify-center items-center">
            <Autocomplete
                className="w-[400px] flex bg-white text-black"
                freeSolo
                disablePortal
                options={[]}
                renderInput={(params) => <TextField className="" {...params} label={"Search Movies..."} />}
            />
        </div>
    );
};

export default Search;
