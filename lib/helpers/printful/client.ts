import axios from "axios";

const PRINTFUL_BASE_URL = "https://api.printful.com";

export const printfulClient = axios.create({
    baseURL: PRINTFUL_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_PRIVATE_TOKEN}`,
        "Content-Type": "application/json",
        "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID,
    },
});
