import { ICity, IState } from "country-state-city";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IShippingAddress {
    state: IState | null;
    city: ICity | null;
    zip_code: string;
    address: string;
    apartment_no: string;
    setState: (state: IState | null) => void;
    setCity: (city: ICity | null) => void;
    setZipCode: (zipCode: string) => void;
    setAddress: (address: string) => void;
    setApartmentNo: (apartmentNo: string) => void;
}

const useShippingStore = create<IShippingAddress>()(
    persist(
        (set) => ({
            state: null,
            city: null,
            zip_code: "",
            address: "",
            apartment_no: "",
            setState: (state) => {
                // console.log("Updated state:", state);
                set({ state });
            },
            setCity: (city) => {
                // console.log("Updated city:", city);
                set({ city });
            },
            setZipCode: (zip_code) => {
                // console.log("Updated zip code:", zip_code);
                set({ zip_code });
            },
            setAddress: (address) => {
                console.log("Updated address:", address);
                set({ address });
            },
            setApartmentNo: (apartment_no) => {
                // console.log("Updated apartment number:", apartment_no);
                set({ apartment_no });
            },
        }),
        {
            name: "shipping-store", // Unique name for persisted storage key
        }
    )
);

export default useShippingStore;
