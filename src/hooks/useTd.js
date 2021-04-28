import { useDispatch } from 'react-redux';
import {
    open_td,
    raise_flag,
    search_num,
    open_mine,
    is_end,
} from '../modules/mine/mineSlice';
import { OPEN, RAISE_FLAG, NOT_OPEN } from '../lib/mineUtil';

const getText = ({ state, value }) => {
    switch (state) {
        case OPEN:
            return value === 0 ? '' : value;
        case RAISE_FLAG:
            return 'F';
        case NOT_OPEN:
            return '';
        default:
            break;
    }
};
const getColor = (td) => {
    if (td.state !== OPEN) return 'black';
    switch (td.value) {
        case 1:
            return 'red';
        case 2:
            return 'orange';
        case 3:
            return 'yellow';
        case 4:
            return 'green';
        case 5:
            return 'blue';
        case 6:
            return 'indigo';
        case 7:
            return 'purple';
        default:
            return 'black';
    }
};

export const useTd = ({ td, tdIndex, trIndex }) => {
    const dispatch = useDispatch();
    const isEnd = () => dispatch(is_end());

    //왼쪽 클릭
    const onLeftClickTd = () => {
        if (td.state === OPEN) return;

        // 지뢰 눌렀을 때
        if (td.value === -1) {
            dispatch(open_mine());
            return;
        }

        dispatch(open_td({ trIndex, tdIndex }));
        isEnd();
    };

    //오른쪽 클릭
    const onRightClickTd = (e) => {
        e.preventDefault();
        if (td.state === OPEN) return;
        dispatch(raise_flag({ trIndex, tdIndex }));
        isEnd();
    };

    //가운데 누르기
    const onMouseDown = (e) => {
        if (e.button !== 1) return;
    };

    //가운데 떼기
    const onMouseUp = (e) => {
        if (e.button !== 1) return;
        dispatch(search_num({ trIndex, tdIndex }));
        isEnd();
    };
    // td 텍스트
    const text = getText(td);

    // td 컬러
    const color = {
        backgroundColor: td.state === OPEN ? '#c5c5c5' : '#e5e5e5',
        fontColor: getColor(td),
    };

    return {
        onLeftClickTd,
        onRightClickTd,
        onMouseDown,
        onMouseUp,
        text,
        color,
    };
};

export default useTd;
