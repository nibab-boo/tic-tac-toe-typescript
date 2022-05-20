import React from 'react';
import { restartGame } from '../App';
const Header: React.FC<{ active: string}> = ({ active }) => {
  return (
    <div className="header">
      <h2 className={ active === "offline" ? "active" : ""}>Offline Mode</h2>
      <h2>Online Mode</h2>
      <button className='reset' onClick={() => restartGame(document.querySelectorAll<HTMLElement>("td"))}>Restart</button>
    </div>
  );
};

export default Header;