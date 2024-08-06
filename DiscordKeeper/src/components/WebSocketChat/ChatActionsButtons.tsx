import React from 'react';

const Chat_Responsive_Buttons: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button className="btn btn-primary">Button 1</button>
        <button className="btn btn-secondary">Button 2</button>
        <button className="btn btn-accent">Button 3</button>
        <button className="btn btn-info">Button 4</button>
        <button className="btn btn-success">Button 5</button>
        <button className="btn btn-warning">Button 6</button>
      </div>
    </div>
  );
};

export default Chat_Responsive_Buttons;
