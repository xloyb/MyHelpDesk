import React, { useState } from 'react';

const DynamicTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3']; 

  return (
    <div role="tablist" className="tabs tabs-boxed">
      {tabs.map((tab, index) => (
        <a
          key={index}
          role="tab"
          className={`tab ${activeTab === index ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </a>
      ))}
    </div>
  );
};

export default DynamicTabs;
