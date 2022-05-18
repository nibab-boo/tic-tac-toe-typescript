import React from 'react';
import Row from './Row';

const Table = () => {

   // Creating Rows
   const row:React.ReactElement[] = [];
   for(let i:number = 1; i <= 3; i ++) {
     row.push(<Row key={i} rowNo = {i} />)
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