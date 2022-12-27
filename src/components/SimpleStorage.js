import { ethers } from 'ethers';
import React, { useState } from 'react';
import SimpleStorage_abi from '../Abi/SimpleStorage_abi.json'

const SimpleStorage = () => {
  const contractAddress = '0x488c182b41ea809875fc256548a412df51895014';
    
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');

  const [currContractvalue, setCurrentContractValue] = useState(null);

  //ethers functions
  const[provider, setProvider] = useState(null);
  const[signer, setSigner] = useState(null);
  const[contract, setContract] = useState(null);

  const connectWalletHandler = () => {
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result =>{
                accountChangedHandler(result[0]);
                setConnectButtonText('Wallet Connected');
            })
        }
        else{
            setErrorMessage('Need to install MetaMask!');
        }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }
  
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
    setContract(tempContract);
  }

  const getCurrentVal = async () => {
    let val = await contract.get();
    setCurrentContractValue(val);
  }

  const setHandler = (event) => {
    event.preventDefault();
    contract.set(event.target.setText.value);
  }
  return (
    <div>
      <h3>{'Get/Set interaction with contract'}</h3>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>
      <h3>Address : {defaultAccount}</h3>

      <form onSubmit={setHandler}>
        <input id='setText' type="text" />
        <button type={'submit'}>Update Contract</button>
      </form>

      <button onClick={getCurrentVal}>Get Current Value</button>
      {currContractvalue}
      {errorMessage}
    </div>
  )
}

export default SimpleStorage;
