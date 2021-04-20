export const NOT_OPEN = 'NOT_OPEN';
export const OPEN = 'OPEN';
export const MINE = 'MINE';
export const RAISE_FLAG = 'RAISE_FLAG';

export const GAME_START = 'GAME_START';
export const GAME_END = 'GAME_END';
export const GAME_FAIL = 'GAME_FAIL';

// 게임 생성
export const setMine = (width, height, mines) => {
    const mineNum = [];
    // 게임판 생성
    const tableData = new Array(height)
        .fill(0)
        .map(() => new Array(width).fill({ state: NOT_OPEN, value: 0 }));

    //지뢰 심기
    for (let i = 0; i < mines; i++) {
        const randomNum = Math.floor(Math.random() * (width * height));
        if (mineNum.some((num) => num === randomNum)) i--;
        else {
            const tr = Math.floor(randomNum / width);
            const td = randomNum % width;
            // console.log({ tr, td });
            tableData[tr][td] = { state: MINE, value: -1 };

            mineNum.push(randomNum);
        }
    }
    // 주변 지뢰갯수 찾기
    for (let trIndex = 0; trIndex < height; trIndex++) {
        for (let tdIndex = 0; tdIndex < width; tdIndex++) {
            // 지뢰일 경우 다음으로 넘어감
            if (tableData[trIndex][tdIndex].value < 0) continue;

            // 주변 지뢰갯수
            let count = 0;
            // 주변 td 8개 탐색
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    // 자기 자신은 제외
                    if (i === 0 && j === 0) continue;
                    // 테이블 크기 밖이면 제외
                    if (
                        trIndex + i < 0 ||
                        tdIndex + j < 0 ||
                        trIndex + i > height - 1 ||
                        tdIndex + j > width - 1
                    ) {
                        continue;
                    }
                    // 작으면 +1 크면 +0
                    count +=
                        tableData[trIndex + i][tdIndex + j].value < 0 ? 1 : 0;
                }
            }
            tableData[trIndex][tdIndex] = { state: NOT_OPEN, value: count };
        }
    }

    return tableData;
};

// td열기
export const openTd = (table, trIndex, tdIndex) => {
    // const table = _table.map((tr) => tr.map((td) => ({ ...td })));
    const search = (_trIndex, _tdIndex) => {
        // 지뢰이거나 이미 열려있는 경우
        if (
            table[_trIndex][_tdIndex].state === MINE ||
            table[_trIndex][_tdIndex].state === OPEN
        ) {
            return;
        }
        // 지뢰 갯수가 0보다 클경우
        if (table[_trIndex][_tdIndex].value > 0) {
            table[_trIndex][_tdIndex].state = OPEN;
            return;
        }

        // 지뢰 갯수가 0일 경우
        if (table[_trIndex][_tdIndex].value === 0) {
            const tableHeight = table.length;
            const tableWidth = table[_trIndex].length;

            table[_trIndex][_tdIndex].state = OPEN;
            // 주변 8개 td탐색
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    // 자기 자신은 제외
                    if (i === 0 && j === 0) continue;

                    // 테이블 크기 밖이면 제외
                    if (
                        _trIndex + i < 0 ||
                        _tdIndex + j < 0 ||
                        _trIndex + i > tableHeight - 1 ||
                        _tdIndex + j > tableWidth - 1
                    ) {
                        continue;
                    }
                    // 오픈되지 않은 것들 search 재귀호출
                    if (table[_trIndex + i][_tdIndex + j].state === NOT_OPEN) {
                        search(_trIndex + i, _tdIndex + j);
                    }
                }
            }
            return;
        }
    };
    search(trIndex, tdIndex);
    return table;
};

// 깃발세우기
export const raiseFlag = (table, trIndex, tdIndex) => {
    table[trIndex][tdIndex].state =
        table[trIndex][tdIndex].state === RAISE_FLAG ? NOT_OPEN : RAISE_FLAG;
    return table;
};

// 주변 td 탐색
export const searchNum = (table, trIndex, tdIndex) => {
    const tableHeight = table.length;
    const tableWidth = table[trIndex].length;
    let count = 0;
    let total = 0;
    // 깃발과 지뢰가 일치하는 갯수구하기
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // 자기 자신은 제외
            if (i === 0 && j === 0) continue;
            // 테이블 크기 밖이면 제외
            if (
                trIndex + i < 0 ||
                tdIndex + j < 0 ||
                trIndex + i > tableHeight - 1 ||
                tdIndex + j > tableWidth - 1
            ) {
                continue;
            }

            // 깃발갯수
            if (table[trIndex + i][tdIndex + j].state === RAISE_FLAG) {
                total++;
            }
            // 지뢰의 깃발세운 갯수
            if (
                table[trIndex + i][tdIndex + j].state === RAISE_FLAG &&
                table[trIndex + i][tdIndex + j].value === -1
            ) {
                count++;
            }
        }
    }
    // 위에서 구한 갯수와 선택한 블럭의 value가 같다면 나머지 OPEN

    if (total === count && count === table[trIndex][tdIndex].value) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                // 자기 자신은 제외
                if (i === 0 && j === 0) continue;
                // 테이블 크기 밖이면 제외
                if (
                    trIndex + i < 0 ||
                    tdIndex + j < 0 ||
                    trIndex + i > tableHeight - 1 ||
                    tdIndex + j > tableWidth - 1
                ) {
                    continue;
                }
                // OPEN되지 않은 것들에 대해서만
                if (table[trIndex + i][tdIndex + j].state === NOT_OPEN) {
                    if (table[trIndex + i][tdIndex + j].value === 0) {
                        // 0일경우 openTd 함수호출
                        table = openTd(table, trIndex + i, tdIndex + j);
                    } else {
                        // 아니면 그냥 열기
                        table[trIndex + i][tdIndex + j].state = OPEN;
                    }
                }
            }
        }
    }
    return table;
};

// 전부 열렸는지 확인
export const isEnd = (table) => {
    const end = table
        .map((tr) => tr.every((td) => [OPEN, RAISE_FLAG].includes(td.state)))
        .every((tr) => tr);
    return end;
};
// 실패시 전부 열기
export const allOpen = (table) => {
    return table.map((tr) =>
        tr.map((td) => ({
            ...td,
            state: OPEN,
            value: td.value === -1 ? 'M' : td.value,
        })),
    );
};
