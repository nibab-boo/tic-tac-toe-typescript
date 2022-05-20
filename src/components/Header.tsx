import React from 'react';
import { restartGame } from '../App';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{ active: string}> = ({ active }) => {
  const navigate = useNavigate();

  const goOnline = ():void => {
    navigate("/tic-tac-toe-typescript/rooms");
  }

  return (
    <div className="header">
      { active !== "roomform" ? 
      <>
        <h3 className={ active === "offline" ? "active" : ""}>{active === "offline" ? "Offline Mode" : "Delete Room" }</h3>
        <h3 onClick={()=> goOnline()} className={ active === "online" ? "active" : ""}>Online Mode</h3>
        <button className='reset' onClick={() => restartGame(document.querySelectorAll<HTMLElement>("td"))}>Restart</button>
      </> : <>
        <h5 className='reset' style={{marginLeft: "0"}}>Go back</h5>
      </>
      }
    </div>
  );
};

export default Header;