import React from 'react'
import { Button } from "../../components/ui/button"
import { Web3 } from 'web3'

import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../components/ui/tabs"
import { CustomAvatar, BatchRegistrationInteraction, ProductRegistrationInteraction, TransactionRegistration } from '../components/index'

const Home = () => {
  const web3 = new Web3(window.ethereum)

  return (
    <div className='w-full flex flex-col items-center justify-center min-h-screen px-4'> {/* Added padding for scaling */}
      <CustomAvatar />

      <Tabs defaultValue="register-products" className="h-full w-full max-w-4xl"> {/* Use max-w to fit the layout */}
        <TabsList className="grid w-full grid-cols-3"> {/* Set grid to 3 columns */}
          <TabsTrigger className='font-spaceGrotesk' value="register-products">Register Products</TabsTrigger>
          <TabsTrigger className='font-spaceGrotesk' value="add-batch">Batch Registration</TabsTrigger>
          <TabsTrigger className='font-spaceGrotesk' value="transaction-registration">TX Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="register-products">
          <ProductRegistrationInteraction web3={web3} />
        </TabsContent>
        <TabsContent value="add-batch">
          <BatchRegistrationInteraction />
        </TabsContent>
        <TabsContent value="transaction-registration">
          <TransactionRegistration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Home
