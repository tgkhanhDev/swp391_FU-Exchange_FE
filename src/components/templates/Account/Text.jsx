import React, { useState } from 'react';
import './Text.css'; // Import your CSS file

function Text() {
  const [div1Active, setDiv1Active] = useState(false);

  const handleDiv1Click = () => {
    setDiv1Active(true);
  };

  const handleDiv2Click = () => {
    setDiv1Active(false);
  };

  return (
    <div>
      <button
        className={`your-div ${div1Active ? 'active' : ''}`}
        onClick={handleDiv1Click}
      >
        Div 1
      </button>
      <button
        className={`your-div ${!div1Active ? 'active' : ''}`}
        onClick={handleDiv2Click}
      >
        Div 2
      </button>
    </div>
  );
}

export default Text;
