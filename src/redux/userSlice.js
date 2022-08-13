import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        forgetPassClick: false,
        isOpenFilter: false,
    },
    reducers: {
        setForgetPassClick: (state, action) => {
            state.forgetPassClick = action.payload
        },
        setIsOpenFilter: (state, action) => {
            state.isOpenFilter = action.payload
        }
    }
})

export const { setForgetPassClick, setIsOpenFilter } = userSlice.actions;
export default userSlice.reducer;