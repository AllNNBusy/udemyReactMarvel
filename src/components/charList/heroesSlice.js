import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    char: null,
    id: 1011400
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        getHeroes: (state, action) => {
            state.char = action.payload
        },
        getRndHeroes: (state, action) => {
            state.id = action.payload
        }
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const {getHeroes, getRndHeroes} = actions;