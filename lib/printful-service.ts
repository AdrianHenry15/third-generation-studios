import axios from "axios";
import { PrintfulOrderRequest } from "./types/printful-order-types";

const PRINTFUL_BASE_URL = "https://api.printful.com";

export const printfulClient = axios.create({
    baseURL: PRINTFUL_BASE_URL,
    headers: {
        // USE PRIVATE TOKEN WITH STORE ID
        Authorization: `Bearer ${process.env.PRINTFUL_PRIVATE_TOKEN}`,
        "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID,
    },
});

export const fetchPrintfulData = async (endpoint: string) => {
    try {
        const response = await printfulClient.get(endpoint);
        return response.data;
    } catch (error: any) {
        console.error("Printful API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data from Printful API");
    }
};

// Create data on Printful
export const createPrintfulData = async (endpoint: string, data: PrintfulOrderRequest) => {
    try {
        const response = await printfulClient.post(endpoint, data);
        return response.data;
    } catch (error: any) {
        console.error("Printful API Error:", error.response?.data || error.message);
        throw new Error("Failed to create data on Printful API");
    }
};
