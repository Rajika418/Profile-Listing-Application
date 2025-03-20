import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfilesAPI } from "../api/profile.api";

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    const response = await fetchProfilesAPI();
    return response;
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default profileSlice.reducer;
