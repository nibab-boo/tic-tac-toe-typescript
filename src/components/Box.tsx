import React from 'react';
import { handleClickType } from '../App';

const Box: React.FC<{ rowNo: number, colNo: number, handleClick: handleClickType }> = ({rowNo, colNo, handleClick}) => {
  // const handleClick = useHandleClick();
  return (
    <td onClick={ (e) => handleClick(e)} data-row={rowNo} data-col={colNo}></td>
  );
};

export default Box;