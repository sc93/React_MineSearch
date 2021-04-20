import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { start_game } from '../modules/mine/mineSlice';

const useForm = () => {
    const [game, setGame] = useState({
        width: 10,
        height: 10,
        mines: 10,
    });
    const dispatch = useDispatch();
    // form 수정
    const onChange = (e) => {
        setGame({ ...game, [e.target.name]: parseInt(e.target.value) });
    };
    // new game
    const onClick = useCallback(() => {
        dispatch(
            start_game({
                width: game.width,
                height: game.height,
                mines: game.mines,
            }),
        );
    }, [dispatch, game.width, game.height, game.mines]);

    // 처음 실행될 때 기본 게임판 생성
    useEffect(() => {
        dispatch(
            start_game({
                width: game.width,
                height: game.height,
                mines: game.mines,
            }),
        );
    }, []);
    return { game, onChange, onClick };
};
export default useForm;
