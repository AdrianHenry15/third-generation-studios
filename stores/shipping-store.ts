import { ICity, IState } from "country-state-city";
import { create } from "zustand";

interface ShippingState {
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

const useShippingStore = create<ShippingState>((set) => ({
    state: null,
    city: null,
    zip_code: "",
    address: "",
    apartment_no: "",
    setState: (state) => set({ state }),
    setCity: (city) => set({ city }),
    setZipCode: (zip_code) => set({ zip_code }),
    setAddress: (address) => set({ address }),
    setApartmentNo: (apartment_no) => set({ apartment_no }),
}));

export default useShippingStore;
