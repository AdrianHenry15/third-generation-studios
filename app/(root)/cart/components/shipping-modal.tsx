"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { State, City, ICity, IState } from "country-state-city";

import Autocomplete from "@mui/material/Autocomplete";

import CartInput from "./cart-input";
import useShippingStore from "@/stores/shipping-store";
import { TextField } from "@mui/material";

interface IShippingModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    handleCheckout: () => void;
}

const ShippingModal = (props: IShippingModalProps) => {
    const { isModalOpen, handleCheckout, setIsModalOpen } = props;
    const { state, city, zip_code, address, setCity, setState, setZipCode, setAddress } = useShippingStore();

    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    // Load states once when the component mounts
    useEffect(() => {
        const fetchedStates = State.getStatesOfCountry("US");
        setStates(fetchedStates);
    }, []);

    // Update cities based on selected state
    useEffect(() => {
        if (state) {
            const fetchedCities = City.getCitiesOfState("US", state.isoCode);
            setCities(fetchedCities);
        } else {
            setCities([]);
        }
    }, [state]);

    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <Dialog.Title className="text-2xl font-semibold">Enter Shipping Information</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm text-gray-500">
                    Please note: We currently only deliver to select states within the United States.
                </Dialog.Description>
                <div className="mt-4 space-y-4">
                    {/* State Input */}
                    <Autocomplete
                        options={states}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="State" />}
                        value={state}
                        onChange={(event, newValue) => setState(newValue || null)}
                    />

                    {/* City Input */}
                    <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="City" />}
                        value={city}
                        onChange={(event, newValue) => setCity(newValue || null)}
                        disabled={!state} // Disable if no state is selected
                    />

                    {/* ZIP Code Input */}
                    <CartInput
                        type="text"
                        placeholder="Enter your ZIP Code"
                        label="ZIP Code"
                        value={zip_code}
                        onTextChange={(e) => setZipCode(e.target.value)}
                    />

                    {/* Address Input */}
                    <CartInput
                        type="text"
                        placeholder="Enter your Shipping Address"
                        label="Shipping Address"
                        value={address}
                        onTextChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mt-6 flex justify-between">
                    {/* Cancel Button */}
                    <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancel
                    </button>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={!address || !state || !zip_code || !city}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 disabled:bg-gray-400"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default ShippingModal;
