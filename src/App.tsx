import React from 'react';
import ActionCable from 'actioncable';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import OfflineRoom from './components/OfflineRoom'
import OnlineRoom from './components/OnlineRoom'
import RoomForm from './components/OnlineRoom'
// types
type clickEvent = React.MouseEvent<HTMLTableCellElement>;
export type handleClickType = (e: clickEvent)=> void 

export function restartGame(tdes: NodeListOf<HTMLElement>):void {
  tdes.forEach((td) => {
    td.dataset.turn = ""  
    td.textContent = ""
    td.style.background = "initial"
  })
};

function App() {
  
  const cable = ActionCable.createConsumer('wss://game-room-center.herokuapp.com/cable');
  // const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/tic-tac-toe-typescript" element={
              <OfflineRoom />
            }>
            </Route>
            <Route path="/tic-tac-toe-typescript/Rooms" element={
              <RoomForm />
            }>
            </Route>
            <Route path="/tic-tac-toe-typescript/gameroom/:id/:status" element={
              <OnlineRoom cable= {cable} />
            }>
            </Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;

