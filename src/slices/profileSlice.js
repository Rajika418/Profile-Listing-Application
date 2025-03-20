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
    success: false,
  },
  reducers: {
    resetProfileState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
        state.success = false;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
