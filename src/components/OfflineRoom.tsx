import React from 'react';
import Table from './Table';
import { handleClickType, restartGame } from './../App'
import { useNavigate } from 'react-router-dom';


const OfflineRoom = () => {
  const navigate = useNavigate();
  const [isX, setIsX] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("")

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
  
  const redirectToGameRoom = () => {
    console.log("join", value);
    fetch(`http://localhost:3000/gamerooms/${value.trimEnd()}`)
      .then((response):void => {
        console.log(response);
        if (response.statusText === 'Found') {
          const redirect = `/tic-tac-toe-typescript/gameroom/${value.trimEnd()}/guest`
          navigate(redirect);
        } else {
          window.alert(`Sorry, we were not able to find ${value.trimEnd()} gameroom. Please, check with your friend or you might want to create a new one.`)
        }
      })
  } 
  const createGameRoom = () => {
    console.log("create", value);
    const formData = new FormData();
    formData.append("gameroom[name]", value);
    fetch("http://localhost:3000/gamerooms", {
      method: 'post',
      body: formData
    }).then(response => response.json())
    .then((data):void => {
      console.log(data);
      if (data.status === "created") {
        const redirect = `/tic-tac-toe-typescript/gameroom/${data.gameroom_name}/admin`
        navigate(redirect);
      } else {
        window.alert(data.error_msg);
      }
    })
  }

  return (
    <div>
      <button onClick={() => restartGame(document.querySelectorAll<HTMLElement>("td"))}>Restart</button>
      <h2><span>{isX ? "X" : "O"}</span>'s turn</h2>
      <form>
        <input type={"text"} value={value} onChange={(e)=> setValue(e.target.value)}></input>
        <input type="button" value="Create game room" onClick={(e)=> {
          e.preventDefault();
          createGameRoom();
          }} />
        <input type="button" value="Enter game room" onClick={(e):void=> { 
          e.preventDefault();
          redirectToGameRoom()
          }} />
      </form>
      < Table handleClick={handleClick} />
    </div>
  );
};

export default OfflineRoom;