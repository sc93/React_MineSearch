import React from 'react';
import styled from 'styled-components';
import Td from './Td';

const TrBlock = styled.tr``;
const Tr = ({ tr, trIndex }) => {
    // console.log('tr render');
    return (
        <TrBlock>
            {tr.map((td, idx) => (
                <Td key={idx} td={td} trIndex={trIndex} tdIndex={idx} />
            ))}
        </TrBlock>
    );
};

export default React.memo(Tr);
