import React from 'react';
import Row from './Row';
import { handleClickType } from '../App';
const Table: React.FC<{handleClick: handleClickType }> = ({handleClick}) => {

   // Creating Rows
   const row:React.ReactElement[] = [];
   for(let i:number = 1; i <= 3; i ++) {
     row.push(<Row key={i} rowNo = {i} handleClick={handleClick}/>)
   }
  return (
    <table>
      <tbody>
        { row }
      </tbody>
    </table>
  );
};

export default Table;