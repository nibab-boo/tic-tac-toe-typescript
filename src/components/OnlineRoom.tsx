import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from './Table';

import { handleClickType, restartGame } from '../App';

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

      if (data.status === "reset") {
        restartGame(document.querySelectorAll<HTMLElement>("td"));
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

  const gameCheck = (data: {[index: string]: string}) => {
    const row = data.row;
    const col = data.col; 
    const winOrNot = (boxes: HTMLElement[]): void => {
      const checkX = (boxes.every(td => td.dataset.turn === 'X'));
      const checkO = (boxes.every(td => td.dataset.turn === 'O'));
      if (boxes.length > 0 && (checkX || checkO)) {
        boxes.forEach((td)=> {td.style.background="green"});
        const tdes = document.querySelectorAll<HTMLElement>('td');
        tdes.forEach(td => {
          if (!td.dataset.turn) td.dataset.turn = "over";
        })
        setTimeout( ()=> {
          let winMessage = "Would you like to start a new game?";
          if ((checkX && mySign === "X") || (checkO && mySign === "O")) {
            winMessage = "You win. Keep it rolling.";
          } else {
            winMessage = "You Lose. Don't let you past get better of you? You got this.";
          }
          if (window.confirm(winMessage)) {
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
    // fetch(`http://game-room-center.herokuapp.com/gamerooms/${id}/moves`, {
    fetch(`http://localhost:3000/gamerooms/${id}/moves`, {
      method: 'post',
      body: formData
    })
  }

  const deleteRoom = ():void => {
    console.log("success");
    fetch(`http://localhost:3000/gamerooms/${id}`, {
      method: 'delete'
    })
  };

  const resetGameForBoth = ():void => {
    fetch(`http://localhost:3000/gamerooms/${id}/reset`)
  }
  return (
    <div>
      <h1>{ id }</h1>
      <div className="d-flex w-100 justify-content-between">
        <button onClick={() => deleteRoom()}>Destroy GameRoom</button>
        <button onClick={() => resetGameForBoth()}>Restart</button>
      </div>
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