import React from 'react';
import { useHandleClick } from './App';
const Row = (props: { rowNo: number }) => {
  const handleClick = useHandleClick();
  const { rowNo } = props;
  return (
    <tr>
      <td onClick={ (e) => handleClick(e)} data-row={rowNo}></td>
      <td onClick={ (e) => handleClick(e)} data-row={rowNo}></td>
      <td onClick={ (e) => handleClick(e)} data-row={rowNo}></td>
    </tr>
  );
};

export default Row;