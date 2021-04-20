import { createSlice } from '@reduxjs/toolkit';
import {
    setMine,
    openTd,
    raiseFlag,
    searchNum,
    GAME_END,
    GAME_START,
    RAISE_FLAG,
    GAME_FAIL,
    isEnd,
    allOpen,
} from '../../lib/mineUtil';

export const mineSlice = createSlice({
    name: 'mine',
    initialState: {
        state: '',
        table: [],
        timer: 0,
        width: 0,
        height: 0,
        mines: 0,
        flags: 0,
        msg: '',
    },
    reducers: {
        start_game: (state, { payload: { width, height, mines } }) => {
            state.table = setMine(width, height, mines);
            state.state = GAME_START;
            state.timer = 0;
            state.width = width;
            state.height = height;
            state.mines = mines;
            state.flags = mines;
            state.msg = '';
        },
        restart_game: () => {
            state.table = setMine(width, height, mines);
            state.state = GAME_START;
            state.timer = 0;
        },
        open_td: (state, { payload: { trIndex, tdIndex } }) => {
            state.table = openTd(state.table, trIndex, tdIndex);
        },
        open_mine: (state) => {
            state.state = GAME_FAIL;
            state.table = allOpen(state.table);
            state.msg = `${'실패'}`;
        },
        raise_flag: (state, { payload: { trIndex, tdIndex } }) => {
            state.table = raiseFlag(state.table, trIndex, tdIndex);
            // 깃발세우면 -1 깃발 내리면 1
            const num =
                state.table[trIndex][tdIndex].state === RAISE_FLAG ? -1 : 1;
            state.flags = state.flags + num;
        },
        search_num: (state, { payload: { trIndex, tdIndex } }) => {
            state.table = searchNum(state.table, trIndex, tdIndex);
        },
        increment_timer: (state) => {
            state.timer = state.timer + 1;
        },
        is_end: (state) => {
            if (isEnd(state.table)) {
                state.state = GAME_END;
                state.msg = `${'성공! 걸린시간 :'}${state.timer}초`;
            }
        },
    },
});

export const {
    start_game,
    open_td,
    open_mine,
    raise_flag,
    search_num,
    increment_timer,
    is_end,
} = mineSlice.actions;

export default mineSlice.reducer;
