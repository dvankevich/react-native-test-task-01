import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
  AC: false,
  bathroom: false,
  kitchen: false,
  TV: false,
  radio: false,
  refrigerator: false,
  microwave: false,
  gas: false,
  water: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
