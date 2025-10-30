import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import '../styles/errordetail.css';
import TabErrorSummary from '../components/TabErrorSummary';
import TabSolution from '../components/TabSolution';
import TabAIsolution from '../components/TabAIsolution';

const ErrorDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const tabs = [
    {
      label: 'Error Summary',
      content: <TabErrorSummary error={state} />,
    },
    {
      label: 'Solution',
      content: <TabSolution solution={state.SOLUTION} />,
    },
    { label: 'AI Solution', content: <TabAIsolution aiResponse={state.AI_RESPONSE}/> },
  ];

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="detail-container">
          <h2>Error Details — Task #{id}</h2>
          <Tabs tabs={tabs} />
          <div className="buttons">
            <button className="ignore">Ignore</button>
            <button className="resolve">Mark Resolved</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDetail;
