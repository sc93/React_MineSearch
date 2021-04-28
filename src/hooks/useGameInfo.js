import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME_END, GAME_FAIL, GAME_START } from '../lib/mineUtil';
import { increment_timer, start_game } from '../modules/mine/mineSlice';

export const useGameInfo = () => {
    const state = useSelector((state) => state.mine.state);
    const flags = useSelector((state) => state.mine.flags);
    const timer = useSelector((state) => state.mine.timer);
    const width = useSelector((state) => state.mine.width);
    const height = useSelector((state) => state.mine.height);
    const mines = useSelector((state) => state.mine.mines);
    const msg = useSelector((state) => state.mine.msg);

    const dispatch = useDispatch();

    // timer 시작
    useEffect(() => {
        let interval;
        if (state === GAME_END || state === GAME_FAIL) {
            alert(msg);
        }
        if (state === GAME_START) {
            interval = setInterval(() => {
                dispatch(increment_timer());
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [state]);
    // 초기화
    const reGame = () => dispatch(start_game({ width, height, mines }));

    return { flags, timer, reGame };
};
