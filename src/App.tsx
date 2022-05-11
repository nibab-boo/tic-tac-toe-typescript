import React from 'react';

import './App.css';
import Row from './Row';

type clickEvent = React.MouseEvent<HTMLTableCellElement>;
type handleClickType = (e: clickEvent)=> void 


// Context Handler
const HandleClickContext = React.createContext<handleClickType | undefined>(undefined);

export const useHandleClick = (): handleClickType => {
  const context: handleClickType | undefined = React.useContext(HandleClickContext);
  if (context === undefined) {
    throw new Error ("HANDLECLICK MUST BE USED INSIDE APP");
  } else {
    return context;    
  }
}


function App() {
  // const [isX, setIsX] = React.useState<boolean>(false);
  const handleClick: handleClickType = (e) => {
    console.log(e.currentTarget);
  } 

  const row:React.ReactElement[] = [];
  for(let i:number = 1; i <= 3; i ++) {
    row.push(<Row key={i} rowNo = {i} />)
  }
  return (
    <HandleClickContext.Provider value={ handleClick }>
      <div className="App">
        <h2>0's turn</h2>
        <table>
          <tbody>
            { row }
          </tbody>
        </table>
      </div>
    </HandleClickContext.Provider>
  );
}

export default App;
