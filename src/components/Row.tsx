import React from 'react';
import { handleClickType } from '../App';
import Box from './Box';

const Row: React.FC<{rowNo: number, handleClick: handleClickType}> = ({ rowNo, handleClick }) => {

  const boxes: React.ReactElement[] = [];
  for (let j: number = 1; j <= 3; j++) {
    boxes.push(<Box key={j} rowNo={rowNo} colNo={j} handleClick={ handleClick }/>);
  }

  return (
    <tr>
      {boxes}
    </tr>
  );
};

export default Row;