import { useDispatch, useSelector } from 'react-redux';
import {
    open_td,
    raise_flag,
    search_num,
    open_mine,
    is_end,
} from '../modules/mine/mineSlice';
import { OPEN } from '../lib/mineUtil';
import { useCallback } from 'react';

export const useTd = ({ td, tdIndex, trIndex }) => {
    const dispatch = useDispatch();
    const isEnd = useCallback(() => {
        dispatch(is_end());
    }, [dispatch]);
    //왼쪽 클릭
    const onLeftClickTd = useCallback(() => {
        if (td.state === OPEN) return;

        // 지뢰 눌렀을 때
        if (td.value === -1) {
            dispatch(open_mine());
            return;
        }

        dispatch(open_td({ trIndex, tdIndex }));
        isEnd();
    }, [td.state, trIndex, tdIndex, dispatch]);
    //오른쪽 클릭
    const onRightClickTd = useCallback(
        (e) => {
            e.preventDefault();
            if (td.state === OPEN) return;
            dispatch(raise_flag({ trIndex, tdIndex }));
            isEnd();
        },
        [td.state, trIndex, tdIndex, dispatch],
    );
    //가운데 누르기
    const onMouseDown = useCallback((e) => {
        if (e.button !== 1) return;
    }, []);
    //가운데 떼기
    const onMouseUp = useCallback(
        (e) => {
            if (e.button !== 1) return;
            dispatch(search_num({ trIndex, tdIndex }));
            isEnd();
        },
        [trIndex, tdIndex, dispatch],
    );
    return {
        onLeftClickTd,
        onRightClickTd,
        onMouseDown,
        onMouseUp,
    };
};

const useTable = () => {
    const table = useSelector((state) => state.mine.table);
    return { table };
};

export default useTable;
