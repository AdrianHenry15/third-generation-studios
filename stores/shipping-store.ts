import { create } from "zustand";

interface ShippingState {
    state: string;
    city: string;
    zip_code: string;
    address: string;
    setState: (state: string) => void;
    setCity: (city: string) => void;
    setZipCode: (zipCode: string) => void;
    setAddress: (address: string) => void;
}

const useShippingStore = create<ShippingState>((set) => ({
    state: "",
    city: "",
    zip_code: "",
    address: "",
    setState: (state) => set({ state }),
    setCity: (city) => set({ city }),
    setZipCode: (zip_code) => set({ zip_code }),
    setAddress: (address) => set({ address }),
}));

export default useShippingStore;
