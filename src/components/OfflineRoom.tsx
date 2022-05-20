import React from 'react';
import Table from './Table';
import { handleClickType, restartGame } from './../App'
import Header from './Header';

const OfflineRoom = () => {
  
  const [isX, setIsX] = React.useState<boolean>(false);

  const gameCheck: handleClickType = (e) => {
    const row: string = e.currentTarget.dataset.row as string;
    const col: string = e.currentTarget.dataset.col as string; 
 
    const winOrNot = (boxes: HTMLElement[]): void => {
      if (boxes.length > 0 && (boxes.every(td => td.dataset.turn === `${isX}`))) {
        boxes.forEach((td)=> {td.style.background="green"});
        const tdes = document.querySelectorAll<HTMLElement>('td');
          tdes.forEach(td => {
          if (!td.dataset.turn) td.dataset.turn = "over";
        })
        setTimeout( ()=> {
          if (window.confirm("Would you like to start a new game?")) {
            restartGame(tdes);
          }
        }, 1000)
      }
    };
    // Horizontal Check
    (() => {
      const xBoxes = document.querySelectorAll<HTMLElement>(`[data-row='${row}']`);
      winOrNot(Array.from(xBoxes));
    })();
    
    
    // Vertical Check
    (() => {
      const yBoxes = document.querySelectorAll<HTMLElement>(`[data-col='${col}']`);
      winOrNot(Array.from(yBoxes));
    })();
    // CrossCheck
    (() => {
      if (row === col) {
        const backBoxes: HTMLElement[] = [];
        for (let i = 1; i <=3; i++) {
          let box = document.querySelector<HTMLElement>(`[data-row='${i}'][data-col='${i}']`)
          if (box) backBoxes.push(box);
        };
        if (backBoxes.length > 0) winOrNot(backBoxes);
      }
      if (['1x3', '2x2', '3x1'].includes(`${row}x${col}`)) {
        const frontBoxes: HTMLElement[] = [];
        for (let i = 1; i <=3; i++) {
          let box = document.querySelector<HTMLElement>(`[data-row='${i}'][data-col='${4 - i}']`)
          if (box) frontBoxes.push(box);
        }
        if (frontBoxes.length > 0) winOrNot(frontBoxes);
      }
    })();
    // Moves Over Check
  }

  const handleClick: handleClickType = (e) => {
    if (e.currentTarget.dataset.turn) return
    e.currentTarget.textContent = isX ? "X" : "O";
    e.currentTarget.dataset.turn = `${isX}`;
    const formData = new FormData();
    formData.append("chatroom_id", "1");
    formData.append("move[user_name]", `${isX}`)
    formData.append("move[row]", `${e.currentTarget.dataset.row}`)
    formData.append("move[col]", `${e.currentTarget.dataset.col}`)
    gameCheck(e);
    setIsX(() => !isX);
  }

  return (
    <div>
      <Header active="offline" />
      <h2><span>{isX ? "X" : "O"}</span>'s turn</h2>
      < Table handleClick={handleClick} />
    </div>
  );
};

export default OfflineRoom;