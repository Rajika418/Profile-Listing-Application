import apiClient from "./apiClient";

export const fetchProfilesAPI = async () => {
  try {
    const response = await apiClient.get("/tempClients");
    return response.data;
  } catch (error) {
    console.error("Fetch Profile API Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch Profile details"
    );
  }
};
