import React from 'react';
import { useHandleClick } from './App';

const Box: React.FC<{ rowNo: number, colNo: number }> = ({rowNo, colNo}) => {
  const handleClick = useHandleClick();
  return (
    <td onClick={ (e) => handleClick(e)} data-row={rowNo} data-col={colNo}></td>
  );
};

export default Box;