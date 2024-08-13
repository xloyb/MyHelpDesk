import React, { useState } from 'react';

const DynamicTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3']; // Array of tab names

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <div>Content for Tab 1</div>;
      case 1:
        return <div>Content for Tab 2</div>;
      case 2:
        return <div>Content for Tab 3</div>;
      default:
        return <div>Select a tab to view its content</div>;
    }
  };

  return (
    <div>
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
      <div className="tab-content mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default DynamicTabs;
