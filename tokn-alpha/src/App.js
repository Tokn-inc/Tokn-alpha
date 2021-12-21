import React, {Component} from "react";
import {Route, Switch } from "react-router-dom";
import Web3 from 'web3'
import NFTSContractInstance from './contracts_build/NFTSContract.json'
import MVPManagerInstance from './contracts_build/MVPManager.json'
import background from './background.jpg';
import ComingSoon from "./Components/ComingSoon.jsx"
import Input from "./Components/Input.jsx"
import Login from "./Components/Login.jsx"
import CreateAccount from "./Components/CreateAccount.jsx"
import BuyNow from "./Components/BuyNow.jsx"
import Congrats from "./Components/Congrats.jsx"

class App extends Component {

  async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }

  async loadWeb3(){

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load nftsContractData
    const nftsContractData = NFTSContractInstance.networks[networkId]
    if(nftsContractData) {
      const nftsContractInstance = new web3.eth.Contract(NFTSContractInstance.abi, nftsContractData.address)
      this.setState({ nftsContractInstance })
      console.log(nftsContractInstance)
    } else {
      window.alert('NFT contract not deployed to detected network.')
    }
  }

  buyButtonClicked = (toAddress,nftID,amount) => {
    this.state.nftsContractInstance.methods.mintMyNFT(toAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      nftsContractInstance: {},
    }
  }

render(){
  return (
    <div className="App">
        <img src={background} className="background" alt="background" />
        <Switch>
          <Route path="/" exact component={() => <ComingSoon />} />
          <Route path="/input" exact component={() => <Input />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/create-account" exact component={() => <CreateAccount />} />
          <Route path="/buy-now" exact component={() => <BuyNow />} />
          <Route path="/congrats" exact component={() => <Congrats />} />
        </Switch>
    </div>
  );
}
}
export default App;
