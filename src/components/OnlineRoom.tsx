import React from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';
import { handleClickType } from '../App';

const OnlineRoom = () => {
  const { id } = useParams();

    // const [isX, setIsX] = React.useState<boolean>(false);
  
  // const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  
  // cable.subscriptions.create(
  //   { channel: 'GameroomChannel', id: 1 },
  //   { received: (data: {[index: string]: string}): void => {
  //     const box = document.querySelector<HTMLElement>(`[data-row='${data.row}'][data-col='${data.col}']`)
  //     const turn = box?.dataset.turn
  //     if (box !== null && !turn) {
  //       console.log("In here");
  //       box.dataset.turn = data.user_name
  //       gameCheck(data);
  //     }
  //   }}
  // )
  // function restartGame(tdes: NodeListOf<HTMLElement>) {
  //   tdes.forEach((td) => {
  //     td.dataset.turn = ""  
  //     td.textContent = ""
  //     td.style.background = "initial"
  //   })
  // };
  


  // const gameCheck = (data: {[index: string]: string}) => {
  //   console.log(data);
  //   // const row: string = e.currentTarget.dataset.row as string;
  //   // const col: string = e.currentTarget.dataset.col as string; 
  //   const row = data.row;
  //   const col = data.col; 
  //   const winOrNot = (boxes: HTMLElement[]): void => {
  //     if (boxes.length > 0 && (boxes.every(td => td.dataset.turn === `${isX}`))) {
  //       boxes.forEach((td)=> {td.style.background="green"});
  //       const tdes = document.querySelectorAll<HTMLElement>('td');
  //       console.log("In here!");
  //       tdes.forEach(td => {
  //         if (!td.dataset.turn) td.dataset.turn = "over";
  //       })
  //       setTimeout( ()=> {
  //         if (window.confirm("Would you like to start a new game?")) {
  //           restartGame(tdes);
  //         }
  //       }, 1000)
  //     }
  //   };
  //   // Horizontal Check
  //   (() => {
  //     const xBoxes = document.querySelectorAll<HTMLElement>(`[data-row='${row}']`);
  //     console.log("horizontal", xBoxes)
  //     winOrNot(Array.from(xBoxes));
  //   })();
    
    
  //   // Vertical Check
  //   (() => {
  //     const yBoxes = document.querySelectorAll<HTMLElement>(`[data-col='${col}']`);
  //     console.log("vertical", yBoxes)
  //     winOrNot(Array.from(yBoxes));
  //   })();
  //   // CrossCheck
  //   (() => {
  //     if (row === col) {
  //       const backBoxes: HTMLElement[] = [];
  //       for (let i = 1; i <=3; i++) {
  //         let box = document.querySelector<HTMLElement>(`[data-row='${i}'][data-col='${i}']`)
  //         if (box) backBoxes.push(box);
  //       };
  //       if (backBoxes.length > 0) winOrNot(backBoxes);
  //     }
  //     if (['1x3', '2x2', '3x1'].includes(`${row}x${col}`)) {
  //       const frontBoxes: HTMLElement[] = [];
  //       for (let i = 1; i <=3; i++) {
  //         let box = document.querySelector<HTMLElement>(`[data-row='${i}'][data-col='${4 - i}']`)
  //         if (box) frontBoxes.push(box);
  //       }
  //       if (frontBoxes.length > 0) winOrNot(frontBoxes);
  //     }
  //   })();
  //   // Moves Over Check
  // }

  const handleClick: handleClickType = (e) => {
    if (e.currentTarget.dataset.turn) return
    // e.currentTarget.textContent = isX ? "X" : "O";
    // e.currentTarget.dataset.turn = `${isX}`;
    const formData = new FormData();
    formData.append("chatroom_id", `${id}`);
    // formData.append("move[user_name]", `${isX}`)
    formData.append("move[row]", `${e.currentTarget.dataset.row}`)
    formData.append("move[col]", `${e.currentTarget.dataset.col}`)
    console.log(Object.fromEntries(formData));
    // fetch("http://localhost:3000/gamerooms/1/moves", {
    //   method: 'post',
    //   body: formData
    // })
    // setIsX(() => !isX);
  } 

 

  return (
    <div>
      <h1>{ id }</h1>
      {
        id &&
        <Table handleClick={handleClick} />
      
      }
    </div>
  );
};

export default OnlineRoom;