import { useSelector } from 'react-redux';

const useTable = () => {
    const table = useSelector((state) => state.mine.table);
    return { table };
};

export default useTable;
