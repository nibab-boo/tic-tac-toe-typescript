import React from 'react';
import Table from './Table';
// import ActionCable from 'actioncable';
import { handleClickType } from './../App'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// type clickEvent = React.MouseEvent<HTMLTableCellElement>;

// Context Handler
// const HandleClickContext = React.createContext<handleClickType | undefined>(undefined);

// export const useHandleClick = (): handleClickType => {
//   const context: handleClickType | undefined = React.useContext(HandleClickContext);
//   if (context === undefined) {
//     throw new Error ("HANDLECLICK MUST BE USED INSIDE APP");
//   } else {
//     return context;    
//   }
// }

const OfflineRoom = () => {
  const navigate = useNavigate();
  const [isX, setIsX] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("")
  function restartGame(tdes: NodeListOf<HTMLElement>) {
    tdes.forEach((td) => {
      td.dataset.turn = ""  
      td.textContent = ""
      td.style.background = "initial"
    })
  };
  


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
    const redirect = `/tic-tac-toe-typescript/gameroom/${value}/guest`
    navigate(redirect);
  } 
  const createGameRoom = () => {
    console.log("create", value);
    const redirect = `/tic-tac-toe-typescript/gameroom/${value}/admin`
    navigate(redirect);
  }

  return (
    // <HandleClickContext.Provider value={ handleClick }>
      <div>
        <button onClick={() => restartGame(document.querySelectorAll<HTMLElement>("td"))}>Restart</button>
        <h2><span>{isX ? "X" : "O"}</span>'s turn</h2>
        <form>
          <input type={"text"} value={value} onChange={(e)=> setValue(e.target.value)}></input>
          <input type="button" value="Create game room" onClick={(e)=> {
            e.preventDefault();
            createGameRoom();
            }} />
          <input type="button" value="Enter game room" onClick={(e)=> { 
            e.preventDefault();
            redirectToGameRoom()
            }} />
        </form>
        < Table handleClick={handleClick} />
      </div>
    // </HandleClickContext.Provider>
  );
};

export default OfflineRoom;