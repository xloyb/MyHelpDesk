"use client"
import React, { useState } from "react";

const TabbedMenu = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <>
          <div className="tabs tabs-lifted">
            <a 
              className={`tab tab-lifted ${activeTab === 'tab1' ? 'tab-active' : ''}`} 
              onClick={() => setActiveTab('tab1')}>
              Tab 1
            </a>
            <a 
              className={`tab tab-lifted ${activeTab === 'tab2' ? 'tab-active' : ''}`} 
              onClick={() => setActiveTab('tab2')}>
              Tab 2
            </a>
            <a 
              className={`tab tab-lifted ${activeTab === 'tab3' ? 'tab-active' : ''}`} 
              onClick={() => setActiveTab('tab3')}>
              Tab 3
            </a>
          </div>
          <div className="bg-base-100 border-base-300 rounded-box p-6">
            {activeTab === 'tab1' && (
              <div id="tab1-content">Tab content 1</div>
            )}
            {activeTab === 'tab2' && (
              <div id="tab2-content">Tab content 2</div>
            )}
            {activeTab === 'tab3' && (
              <div id="tab3-content">Tab content 3</div>
            )}
          </div>
        </>
      );
    
};

export default TabbedMenu;
