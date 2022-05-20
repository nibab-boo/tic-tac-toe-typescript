import React from 'react';
import { restartGame } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

const Header: React.FC<{ active: string, onReset?: () => void }> = ({ active, onReset }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goOnline = ():void => {
    navigate("/tic-tac-toe-typescript/gameroom");
  }
  const goOffline = ():void => {
    navigate("/tic-tac-toe-typescript");
  }
  const resetAction = ():void => {
    if (active === "offline") {
      restartGame(document.querySelectorAll<HTMLElement>("td"))
    } else {
      if (onReset) onReset();
    }
  }

  const deleteRoom = ():void => {
    fetch(`https://game-room-center.herokuapp.com/gamerooms/${id}`, {
      method: 'delete'
    })
  };

  return (
    <div className="header">
      { active !== "roomform" ? 
      <>
        {active === "offline" ? (
          <h3 className="active">Offline Mode</h3>
          ) : (
          <h3 onClick={()=> deleteRoom()}>Delete Room</h3>
        ) }
        <h3 onClick={()=> goOnline()} className={ active === "online" ? "active" : ""}>Online Mode</h3>
        <button className='reset' onClick={():void => resetAction()}>Restart</button>
      </> : <>
        <h5 onClick={():void => goOffline()} className='reset' style={{marginLeft: "0"}}>Go back</h5>
      </>
      }
    </div>
  );
};

export default Header;