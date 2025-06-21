import React, { useEffect, useState } from 'react';
import { CoinflowApplePayButton, CoinflowGooglePayButton, Currency, type CartItemClassOmitted } from '@coinflowlabs/react';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';

function App() {

  const merchantId = 'dreamgaming';
  const chargebackProtectionData: CartItemClassOmitted[] =
  [{
    productType: "gameOfSkill",
    rawProductData: {
        package_id: "2",
        package_cost: 5.0,
        description: "Purchase for a pack of 50000 gold coins. \n                Gold Coins are purely for entertainment and gameplay purposes. \n                They allow you to enjoy Americana Casino wide selection of games."
    },
    productName: "coins",
    quantity: 50000
  }];

  const [googlePayHeight, setGooglePayHeight] = useState<number>(40);
  const [applePayHeight, setApplePayHeight] = useState<number>(40);
  const [sessionKey, setSessionKey] = useState('');

  useEffect(() => {
    const fetchSessionKey = async () => {
      try {
        const response = await fetch('https://api-sandbox.coinflow.cash/api/auth/session-key', {
          method: 'GET',
          headers: {
            'Authorization': `${process.env.REACT_APP_API_KEY}`,
            'accept': 'application/json',
            'x-coinflow-auth-user-id': 'user_test'
          }
        });
        const data = await response.json();
        if (data.key) {
          setSessionKey(data.key);
        } else {
          console.error('Failed to fetch session key:', data);
        }
      } catch (error) {
        console.error('Error fetching session key:', error);
      }
    };

    if (process.env.REACT_APP_API_KEY) {
      fetchSessionKey();
    }
  }, []);

  const handleHeight = (newHeight: string, type: 'google' | 'apple') => {
    if (Number(newHeight) < 50) {
      newHeight = '40';
    }
    if (type === 'google') {
      setGooglePayHeight(Number(newHeight));
    } else {
      setApplePayHeight(Number(newHeight));
    }
  };

  const handleGooglePaySuccess = (...args: any[]) => {
    console.log('Google Pay Success', args);
  }

  const handleApplePaySuccess = (...args: any[]) => {
    console.log('Apple Pay Success', args);
  }

  const handleGooglePayError = (...args: any[]) => {
    console.log('Google Pay Error', args);
  }

  const handleApplePayError = (...args: any[]) => {
    console.log('Apple Pay Error', args);
  }


  return (
    <div style={{ padding: '20px' }}>
      <h1>Coinflow Purchase Demo</h1>
      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <div
          style={{ position: 'relative', height: `${googlePayHeight}px`, flex: 1, margin: '16px 0' }}
          className="w-full"
        >

          <CoinflowGooglePayButton
            env={'sandbox'}
            sessionKey={sessionKey}
            merchantId={merchantId}
            handleHeightChange={(newHeight: string) => handleHeight(newHeight, 'google')}
            subtotal={{ cents: 100, currency: Currency.USD }}
            color={'black'}
            chargebackProtectionData={chargebackProtectionData}
            onSuccess={handleGooglePaySuccess}
            onError={handleGooglePayError}
            origins={['http://localhost:3000', 'https://api.coinflow.cash/', 'http://pay.localhost:3000/', 'http://pay.localhost:8000/', 'https://pay.americanacasino.com/', 'https://www.americanacasino.com/']}
          />
        </div>

        <div style={{ height: `${applePayHeight}px`, flex: 1, position: 'relative' }} className="w-full">
            <CoinflowApplePayButton
              env={'sandbox'}
              sessionKey={sessionKey}
              merchantId={merchantId}
              handleHeightChange={(newHeight: string) => handleHeight(newHeight, 'apple')}
              subtotal={{ cents: 100, currency: Currency.USD }}
              color={'black'}
              chargebackProtectionData={chargebackProtectionData}
              onSuccess={handleApplePaySuccess}
              onError={handleApplePayError}
              origins={['http://localhost:3000', 'https://api.coinflow.cash/', 'http://pay.localhost:3000/', 'http://pay.localhost:8000/', 'https://pay.americanacasino.com/', 'https://www.americanacasino.com/']}
            />
        </div>
      </div>
    </div>
  );
}

export default App; 