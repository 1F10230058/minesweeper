import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  //0->未クリック
  //1->左クリック
  //2->はてな
  //3->旗
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  //0->ボムなし
  //1->ボムあり
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [board, setBoard] = useState([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]);
  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [-1, -1],
    [0, -1],
    // -1 ->石
    // 0 ->画像なしセル
    // 1~8 ->数字セル
    // 9 ->石＋はてな
    // 10 ->石＋旗
    // 11 ->ボムセル
  ];
  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const notBomb = [y][x];
    const newBombmap: number[][] = JSON.parse(JSON.stringify(bombMap));
    function placeBombs(bombCount: 10) {
      const rows = 9;
      const cols = 9;
      let bombPlaced = 0;
      if (bombMap.flat().filter(Boolean).length === 0)
        while (bombPlaced < bombCount) {
          const randomRow = Math.floor(Math.random() * rows);
          const randomCol = Math.floor(Math.random() * cols);
          if (newBombmap[randomRow][randomCol] !== 1 && [randomRow][randomCol] !== [y][x]) {
            newBombmap[randomRow][randomCol] = 1;
            bombPlaced++;
          }
        }
      console.table(newBombmap);
      return newBombmap;
    }
    const bombCount = 10;
    const updatedBombMap = placeBombs(bombCount);
    setBombMap(updatedBombMap);
    const newUserInputs: number[][] = JSON.parse(JSON.stringify(userInputs));
    let bombCounter = 0;
    if (userInputs[y][x] === 0)
      for (const [dy, dx] of direction) {
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          [y][x] === bombMap[y][x]
        ) {
          if (bombMap[y + dy][x + dx] === 0) bombCounter++;
        }
        const bombCounter1 = bombCounter;

        const myElement = document.getElementById('myElement');
        myElement.style.backgroundPosition = `-${10 * bombCounter}px 0`;

        return;
      }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && <div className={styles.stone} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
//cssスプライト
//計算値computed
//計算値＝状態＋状態
//board=userInput+bombMap

export default Home;
