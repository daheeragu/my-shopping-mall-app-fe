import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

const initialState = {
  loading: false,
  error: "",
  wishlist: [],
};

// Async thunk actions
export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async ({ item }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/wishlist", { item });
      if (response.status !== 200) throw new Error(response.error);
      // TODO 관심 상품 리스트 업데이트
      dispatch(getWishlist());
      return response.data.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFromWishlist = createAsyncThunk(
  "cart/deleteFromWishlist",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/wishlist/${id}`);
      if (response.status !== 200) throw new Error(response.error);
      // TODO 관심 상품 리스트 업데이트
      dispatch(getWishlist());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "cart/getWishlist",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/wishlist");
      if (response.status !== 200) throw new Error(response.error);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
        state.error = "";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWishlist.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
export const { clearError } = wishlistSlice.actions;
