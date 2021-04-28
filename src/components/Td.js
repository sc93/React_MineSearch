import React from 'react';
import styled from 'styled-components';
import useTd from '../hooks/useTd';

const TdBlock = styled.td`
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    background: ${(props) => props.color.backgroundColor};
    color: ${(props) => props.color.fontColor};
`;
const Td = ({ td, trIndex, tdIndex }) => {
    const {
        onLeftClickTd,
        onRightClickTd,
        onMouseDown,
        onMouseUp,
        text,
        color,
    } = useTd({
        td,
        trIndex,
        tdIndex,
    });
    // const text = useMemo(() => getText(td), [td]);
    // console.log('td render');
    return (
        <TdBlock
            onClick={onLeftClickTd}
            onContextMenu={onRightClickTd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            color={color}
        >
            {text}
        </TdBlock>
    );
};

export default React.memo(Td);
