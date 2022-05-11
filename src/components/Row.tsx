import React from 'react';
import Box from './Box';
const Row: React.FC<{rowNo: number}> = ({ rowNo }) => {

  const boxes: React.ReactElement[] = [];
  for (let j: number = 1; j <= 3; j++) {
    boxes.push(<Box key={j} rowNo={rowNo} colNo={j} />);
  }

  return (
    <tr>
      {boxes}
    </tr>
  );
};

export default Row;