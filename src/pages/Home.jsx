import React, { useState } from 'react';
import { Web3 } from 'web3';
import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo';
import '../css/page/home.css';
import { userData } from "../dummyData";
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import CustomAvatar from '../Reusables/CustomAvatar';
import ProductRegistrationInteraction from '../components/Page Components/ProductRegistrationInteraction';
import BatchRegistrationInteraction from '../components/Page Components/BatchRegistrationInteraction';
import TransactionRegistration from '../components/Page Components/TransactionRegistration';

const HomePage = () => {
  const web3 = new Web3(window.ethereum);
  const [activeTab, setActiveTab] = useState("register-products");

  return (
    <div className='w-full flex flex-col items-center justify-start min-h-screen px-4'>
      {/* Custom Avatar */}
      <div className="w-full mt-4">
        <CustomAvatar />
      </div>
      

{/* Dashboard Overview */}
<div className="w-full max-w-full lg:max-w-6xl mt-12">
        <FeaturedInfo />
        <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
        </div>

        {/* Welcome User Section */}
      <div className="dashboard w-full mt-6">
        <div className="dashboard-properties">
          <h2 className="text-2xl font-bold">Hello, Gidwan Kwano Farm</h2>
          {/* Adjust the grid system to prevent overflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="property-card p-4 bg-white shadow-md rounded-md">Total Products: 10</div>
            <div className="property-card p-4 bg-white shadow-md rounded-md">Total Batches: 5</div>
            <div className="property-card p-4 bg-white shadow-md rounded-md">Total Transactions: 2</div>
          </div>
        </div>
      </div>

      {/* Welcome User Section */}
      <div className="dashboard w-full mt-6">
        <div className="dashboard-properties">
          <h2 className="text-2xl font-bold">Hello, Gidwan Kwano Farm</h2>
          {/* Adjust the grid system to prevent overflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="property-card p-4 bg-white shadow-md rounded-md">Total Products: 10</div>
            <div className="property-card p-4 bg-white shadow-md rounded-md">Total Batches: 5</div>
            <div className="property-card p-4 bg-white shadow-md rounded-md">Total Transactions: 2</div>
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="w-full max-w-full lg:max-w-6xl mt-12">
        <FeaturedInfo />
        <Chart data={userData} title="User Analytics" grid dataKey="Active User" />

      
      </div>

      {/* Tabs for Registration Functionalities */}
      <div className="w-full max-w-full lg:max-w-6xl mt-12">
        <Tabs defaultValue="register-products" className="h-full w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger className='font-spaceGrotesk' value="register-products">Register Products</TabsTrigger>
            <TabsTrigger className='font-spaceGrotesk' value="add-batch">Batch Registration</TabsTrigger>
            <TabsTrigger className='font-spaceGrotesk' value="transaction-registration">TX Registration</TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="register-products">
            <ProductRegistrationInteraction web3={web3} /> {/* Direct component instead of dashboard */}
          </TabsContent>
          <TabsContent value="add-batch">
            <BatchRegistrationInteraction /> {/* Direct component */}
          </TabsContent>
          <TabsContent value="transaction-registration">
            <TransactionRegistration /> {/* Direct component */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default HomePage;
