import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTable from '../hooks/useTable';
import GameInfo from './GameInfo';
import Tr from './Tr';

const TableBlock = styled.table`
    border-collapse: collapse;
`;

const Table = () => {
    const { table } = useTable();

    // console.log('table render');
    return (
        <TableBlock>
            <caption>
                <GameInfo />
            </caption>
            <tbody>
                {table.map((tr, idx) => (
                    <Tr key={idx} tr={tr} trIndex={idx} />
                ))}
            </tbody>
        </TableBlock>
    );
};

export default Table;
