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
  const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));

  const board = [
    // [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 0, 1, 2, 3, 4, 5, 6, 7],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];

  // -1 ->石
  // 0 ->画像なしセル
  // 1~8 ->数字セル
  // 9 ->石＋はてな
  // 10 ->石＋旗
  // 11 ->ボムセル
  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [-1, -1],
    [0, -1],
  ];


  const bombCount = 10;

  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  const onClick = (x: number, y: number) => {
    console.log("a");
    function placeBombs(bombCount: number) {
      console.log(1);
      const bombPlaced = 0;
      const newBombMap: (0 | 1)[][] = JSON.parse(JSON.stringify(bombMap));
      if (newBombMap.flat().filter(Boolean).length === 0) {
        console.log(2);
        while (newBombMap.flat().filter(Boolean).length < 10) {
          console.log(3);
          const randomRow = Math.floor(Math.random() * 9);
          const randomCol = Math.floor(Math.random() * 9);
          if (newBombMap[randomRow][randomCol] !== 1 && `${randomRow}${randomCol}` !== `${y}${x}`) {
            console.log(4);
            console.log(randomRow,randomCol);
            newBombMap[randomRow][randomCol] = 1;
            // bombPlaced++;
          }
        }
      }
      console.table(newBombMap);
      return newBombMap;
    }
    console.log(5);
    if (userInputs[y][x] === 0) {
      console.log(6);
      newUserInputs[y][x] = 1;
      setUserInputs(newUserInputs);
    }
    const updatedBombMap = placeBombs(10);
    setBombMap(updatedBombMap);
  };
  // const bombCounter = 0;
  // if (userInputs[y][x] === 0) {
  //   for (const [dy, dx] of direction) {
  //     if (
  //       board[y + dy] !== undefined &&
  //       board[y + dy][x + dx] !== undefined &&
  //       [y][x] === bombMap[y][x]
  //     ) {
  //       if (bombMap[y + dy][x + dx] === 0) bombCounter++;
  //     }
  //   }
  // }
  
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {newUserInputs.map((row, y) =>
          row.map((state, x) => (
            <div
              className={styles.sprite}
              key={`${x}-${y}`}
              style={{ backgroundPosition: state * -30 + 30 }}
              onClick={() => onClick(x, y)}
            >
              {state === -1 && <div className={styles.stone} />}
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
