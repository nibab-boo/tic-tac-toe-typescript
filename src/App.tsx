import React from 'react';
import ActionCable from 'actioncable';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import ActionCable from 'actioncable';
// import Table from './components/Table'
import OfflineRoom from './components/OfflineRoom'
import OnlineRoom from './components/OnlineRoom'
// types
type clickEvent = React.MouseEvent<HTMLTableCellElement>;
export type handleClickType = (e: clickEvent)=> void 
      
function App() {
  
  // const cable = ActionCable.createConsumer('wss://game-room-center.herokuapp.com/cable');
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

  return (
    <Router>
      {/* <HandleClickContext.Provider value={ handleClick }> */}
        <div className="App">
          {/* <button onClick={() => restartGame(document.querySelectorAll<HTMLElement>("td"))}>Restart</button>
          <h2><span>{isX ? "X" : "O"}</span>'s turn</h2> */}
            <Routes>
            <Route path="/tic-tac-toe-typescript" element={
              <OfflineRoom />
            }>
            </Route>
            <Route path="/tic-tac-toe-typescript/gameroom/:id/:status" element={
              <OnlineRoom cable= {cable} />
            }>
            </Route>
            </Routes>
        </div>
      {/* </HandleClickContext.Provider> */}
    </Router>
  );
}

export default App;

