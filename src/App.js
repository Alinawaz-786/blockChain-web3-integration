import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  const disConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          "method": "wallet_revokePermissions",
          "params": [
            {
              "eth_accounts": {}
            }
          ]
        });
        setAccount(null);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking for wallet:', error);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  return (
    <div>
      {account ? (
        <>
          <p>Connected account: {account}</p>
          <button onClick={disConnectWallet}>Disconnect Wallet</button>
        </>

      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
