import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTd } from '../hooks/useTable';
import { NOT_OPEN, OPEN, RAISE_FLAG } from '../lib/mineUtil';

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
const TdBlock = styled.td`
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    background: ${(props) => (props.td.state === OPEN ? '#c5c5c5' : '#e5e5e5')};
    color: ${(props) => getColor(props.td)};
`;

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
const Td = ({ td, trIndex, tdIndex }) => {
    const { onLeftClickTd, onRightClickTd, onMouseDown, onMouseUp } = useTd({
        td,
        trIndex,
        tdIndex,
    });
    const text = useMemo(() => getText(td), [td]);
    // console.log('td render');

    return (
        <TdBlock
            onClick={onLeftClickTd}
            onContextMenu={onRightClickTd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            td={td}
        >
            {text}
        </TdBlock>
    );
};

export default React.memo(Td);
