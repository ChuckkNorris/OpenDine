import { createSlice } from "@reduxjs/toolkit";

export interface MenuSliceInitialState {
  menuItems: any[];
  loading: boolean;
  error?: any;
}

export const MenuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuItems: [],
    loading: false,
    // error: null
  } as MenuSliceInitialState,
  reducers: {
    getMenuItemsStart(state: MenuSliceInitialState) {
      state.loading = true;
      state.error = null;
    },
    getMenuItemsSuccess(state: MenuSliceInitialState) {
      // state.menuItems = action.payload;
      state.loading = false;
    },
    getMenuItemsFailure(state: MenuSliceInitialState,) {
      state.loading = false;
      // state.error = action.payload;
    }
  }
});