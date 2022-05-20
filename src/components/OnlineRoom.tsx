import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from './Table';

import { handleClickType } from '../App';

const OnlineRoom: React.FC<{ cable: ActionCable.Cable }> = ({ cable }) => {
  const navigate = useNavigate();
  const {id, status} = useParams();
  const mySign = status === "admin" ? "X" : "O"

  cable.subscriptions.create(
    { channel: 'GameroomChannel', id: id },
    { connected: () => {
        console.log("connected")
      },
      disconnected: () => {
        console.log("disconnected");
      },
      received: (data: {[index: string]: string}): void => {
      if ( data.status === "destroy" ) {
        window.alert("Gameroom destroyed by Creator. Redirecting to main room");
        const redirect = '/tic-tac-toe-typescript';
        navigate(redirect);
        cable.disconnect();
      }
      const box = document.querySelector<HTMLElement>(`[data-row='${data.row}'][data-col='${data.col}']`)
      const turn = box?.dataset.turn
      if (box !== null && !turn) {
        box.dataset.turn = data.user_name
        box.textContent = data.user_name
        gameCheck(data);
      }
    }}
  )
  function restartGame(tdes: NodeListOf<HTMLElement>) {
    tdes.forEach((td) => {
      td.dataset.turn = ""  
      td.textContent = ""
      td.style.background = "initial"
    })
  };

  const gameCheck = (data: {[index: string]: string}) => {
    const row = data.row;
    const col = data.col; 
    const winOrNot = (boxes: HTMLElement[]): void => {
      if (boxes.length > 0 && ((boxes.every(td => td.dataset.turn === 'X')))) {
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
      if (boxes.length > 0 && (boxes.every(td => td.dataset.turn === 'O'))) {
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
    const formData = new FormData();
    formData.append("chatroom_id", `${id}`);
    formData.append("move[user_name]", mySign)
    formData.append("move[row]", `${e.currentTarget.dataset.row}`)
    formData.append("move[col]", `${e.currentTarget.dataset.col}`)
    // console.log(Object.fromEntries(formData));
    // fetch(`http://game-room-center.herokuapp.com/gamerooms/${id}/moves`, {
    fetch(`http://localhost:3000/gamerooms/${id}/moves`, {
      method: 'post',
      body: formData
    })
    // setIsX(() => !isX); 
  }

  const deleteRoom = ():void => {
    console.log("success");
    fetch(`http://localhost:3000/gamerooms/${id}`, {
      method: 'delete'
    })
  };


  return (
    <div>
      <h1>{ id }</h1>
      <button onClick={() => deleteRoom()}>Destroy GameRoom</button>
      <h1>{ mySign }</h1>
      <h1><strong>{ "Your Turn" || "Other's Turn"}</strong></h1>
      {
        id &&
        <Table handleClick={handleClick} />
      
      }
    </div>
  );
};

export default OnlineRoom;