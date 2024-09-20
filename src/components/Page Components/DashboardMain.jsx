import React from 'react';
import BatchRegistrationInteraction from './BatchRegistrationInteraction';
import ProductRegistrationInteraction from './ProductRegistrationInteraction';
import TransactionRegistration from './TransactionRegistration';

const Dashboard = ({ activeTab, web3 }) => {
  return (
    <div className="dashboard w-full">
      {/* Dashboard Properties */}
      <div className="dashboard-properties">
        <h2 className="text-2xl font-bold">Hello, Gidwan Kwano Farm</h2>
        {/* Adjust the grid system to prevent overflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="property-card p-4 bg-white shadow-md rounded-md">Total Products: 10</div>
          <div className="property-card p-4 bg-white shadow-md rounded-md">Total Batches: 5</div>
          <div className="property-card p-4 bg-white shadow-md rounded-md">Total Transactions: 2</div>
        </div>
      </div>

      {/* Registration Components */}
      <div className="registration-components mt-8">
        {activeTab === "register-products" && <ProductRegistrationInteraction web3={web3} />}
        {activeTab === "add-batch" && <BatchRegistrationInteraction />}
        {activeTab === "transaction-registration" && <TransactionRegistration />}
      </div>
    </div>
  );
};

export default Dashboard;
