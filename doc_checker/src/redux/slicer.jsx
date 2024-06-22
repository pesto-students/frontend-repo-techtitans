import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        // getUser: (state, action) => {
        //     return state.user
        // }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer