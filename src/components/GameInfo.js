import React from 'react';
import styled from 'styled-components';
import { useGameInfo } from '../hooks/useGameInfo';

const GameInfoBlock = styled.div`
    display: flex;
    justify-content: space-between;
    span {
        width: 50px;
        height: 20px;
        border: 1px solid black;
        margin: 5px 0;
    }
    span:nth-child(2) {
        cursor: pointer;
    }
`;

const GameInfo = () => {
    const { flags, timer, reGame } = useGameInfo();
    // console.log('gameinfo render');
    return (
        <GameInfoBlock>
            <span>{flags}</span>
            <span onClick={reGame}>초기화</span>
            <span>{timer}</span>
        </GameInfoBlock>
    );
};

export default GameInfo;
