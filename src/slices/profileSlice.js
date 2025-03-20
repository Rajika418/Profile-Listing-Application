import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfilesAPI } from "../api/profile.api";

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProfilesAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch profiles");
    }
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export default profileSlice.reducer;
