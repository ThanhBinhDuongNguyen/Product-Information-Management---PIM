import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type WorkspaceState = { channel: string; locale: string };
const initialState: WorkspaceState = { channel: "Ecommerce", locale: "en_US" };

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setChannel: (state, action: PayloadAction<string>) => { state.channel = action.payload; },
    setLocale: (state, action: PayloadAction<string>) => { state.locale = action.payload; },
  },
});

export const { setChannel, setLocale } = workspaceSlice.actions;
export default workspaceSlice.reducer;
