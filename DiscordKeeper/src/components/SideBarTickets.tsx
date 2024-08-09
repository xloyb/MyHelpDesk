import React, { useState } from 'react';

const StaticShowMoreList = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-base-100 card p-6 mx-auto mt-5 w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Items List</h2>
      <ul className="list-disc pl-5">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        {showMore && (
          <>
            <li>Item 6</li>
            <li>Item 7</li>
            <li>Item 8</li>
          </>
        )}
      </ul>
      <button
        onClick={handleToggle}
        className="btn btn-primary mt-4"
      >
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default StaticShowMoreList;
