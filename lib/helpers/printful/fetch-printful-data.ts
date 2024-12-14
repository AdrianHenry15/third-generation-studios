import { printfulClient } from "./client";

export const fetchPrintfulData = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET", // Default to 'GET'
    body?: any // Optional body parameter
) => {
    try {
        const options: any = {
            method,
            url: endpoint,
        };

        if (body) {
            options.data = body; // Add body for methods like POST or PUT
        }

        const response = await printfulClient.request(options);
        return response.data;
    } catch (error: any) {
        console.error("Printful API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data from Printful API");
    }
};
