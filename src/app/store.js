import { configureStore } from '@reduxjs/toolkit';
import mineReducer from '../modules/mine/mineSlice';
export default configureStore({
    reducer: {
        mine: mineReducer,
    },
});
