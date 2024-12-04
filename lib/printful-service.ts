import axios from "axios";

const PRINTFUL_BASE_URL = "https://api.printful.com";

const printfulClient = axios.create({
    baseURL: PRINTFUL_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_PRIVATE_TOKEN}`,
    },
});

export const fetchPrintfulProducts = async () => {
    try {
        const response = await printfulClient.get("/store/products");
        return response.data.result; // Adjust based on Printful API response
    } catch (error: any) {
        console.error("Error fetching Printful products:", error.message);
        throw error;
    }
};

export const createPrintfulOrder = async (orderData: any) => {
    try {
        const response = await printfulClient.post("/orders", orderData);
        return response.data.result;
    } catch (error: any) {
        console.error("Error creating Printful order:", error.message);
        throw error;
    }
};
