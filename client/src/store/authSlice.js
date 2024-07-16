import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuth: false,
    user: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const { user } = action.payload;
            if(user!=null) {
                state.isAuth = true;
                state.user = user;
            }
            else {
                state.user = null;
                state.isAuth = false;
            }
        },
    },
})
// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer
