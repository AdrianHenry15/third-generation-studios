import axios from "axios";

// API key and host for streaming availability API
const streamingAvailabilityApiKey = "10253f2aadmsh1a6744a84a4e18bp10c58fjsnfc1d2f172ccd";
const streamingAvailabilityApiHost = "streaming-availability.p.rapidapi.com";

const streamingAvailabilityApiBaseUrl = "https://streaming-availability.p.rapidapi.com";

const requests = {
    // Function to get streaming availability data
    requestStreamingAvailability: async () => {
        const options = {
            method: "GET",
            url: `${streamingAvailabilityApiBaseUrl}/countries`,
            headers: {
                "X-RapidAPI-Key": streamingAvailabilityApiKey,
                "X-RapidAPI-Host": streamingAvailabilityApiHost,
            },
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error; // Re-throw the error to handle it where the request is made
        }
    },
};

export default requests;
