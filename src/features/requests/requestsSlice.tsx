import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
// add in requestsSlice.ts
export const addRequestAsync = createAsyncThunk(
  "requests/addRequestAsync",
  async (newRequest: Request) => {
    const res = await fetch("http://localhost:3001/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRequest),
    });
    if (!res.ok) throw new Error("Failed to add request");
    return (await res.json()) as Request;
  }
);


export interface Request {
  id: string;
  requestedBy: string;
  service: string;
  purpose: string;
  status: string;
  requestedDate: string;
}

interface RequestsState {
  items: Request[];
}

const initialState: RequestsState = {
  items: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<Request>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
