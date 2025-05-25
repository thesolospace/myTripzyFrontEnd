import apiClient from ".";

export const homeScreenApi = {
 homeScreenTripList: async () => {
  return apiClient.get("/trips");
 },
  filteredTripSearch: (params: Record<string, any>) =>
    apiClient.get('/trips/search', { params }),
};
