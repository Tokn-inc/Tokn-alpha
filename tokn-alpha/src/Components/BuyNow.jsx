import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../App.css';
import contract from "../ToknContract";
import usdc from "../usdcContract";
import { updateBalance } from "../redux";
import songPoster from './song.jpg';
import artistImg from './artist.jpg';

function BuyNow() {

  const [qty, setQty] = useState(0)
  const [ryl, setRyl] = useState(0)
  const [amount, setAmount] = useState(0)
  const [toknsAvailable, setToknsAvailable] = useState(0)
  const [price, setPrice] = useState(0)
  const [treasury, setTreasury] = useState(0)
  const [errmess,setErrmess] = useState(null)
  const {address, error, balance, loading} = useSelector((state) => state.wallet)
  const {loggedIn} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!loggedIn){
      alert("User not loggedIn.")
      window.location = "/create-account"
    }
     async function getToknDetails(){
      const toknITO = await contract.methods.getITO('1').call();
      const tokns = toknITO.toknsAvailable;
      const treasurypc = await contract.methods.treasuryPercentage().call();
      setTreasury(treasurypc)
      const toknPrice = toknITO.price;
      setPrice(toknPrice)
      setToknsAvailable(tokns)
    }
    getToknDetails()
  }, [balance])
  

  window.onload = async (e) => {
    if (!loggedIn){
      alert("User not loggedIn.")
      window.location = "/create-account"
    }else if(address){
    dispatch(updateBalance(address, 1))
    }else{
      alert("Connect wallet first.");
      window.location = "/metamask"
    }
    
    

  }
  function handleChange(event) {
    event.preventDefault()
    setQty(event.target.value * 1)
    setRyl(event.target.value * 0.1)
    let amt = event.target.value * price/1000000;
    setAmount(Number(amt) + Number(amt*treasury/100))
    setErrmess(null)
    console.log(typeof event.target.value)
    console.log(typeof toknsAvailable);
    if (Number(event.target.value) > Number(toknsAvailable)) {
      console.log(toknsAvailable, "&", event.target.value);
     setErrmess("Amount exceeds available tokens"); 
    }
    if (event.target.value < 1 || event.target.value%1 !==0) {
     setErrmess("Please enter valid amount"); 
    }
  }

  const buyTokns = async (event) => {
    event.preventDefault()
    if(!qty){
      alert("Enter a quantity!");
    }else{
      if(errmess){
      alert(errmess)
    }else{
      try{
      console.log("processing...");
      setProcessing(true)
      await usdc.methods.approve(contract._address, amount*1000000).send({from: address})
      console.log("approved");
    await contract.methods.investFixedPrice(1, qty).send({from: address})
    
    console.log("Tokens bought: ", qty);
    dispatch(updateBalance(address, 1))
    window.location = "/congrats"
    setTimeout(() => {
      setProcessing(false)
    }, 5000)
    
    if(error){
      console.log("Error in if");
      alert(error)
    }
    
    }catch(error){
      console.log("Error in catch");
      alert("Something went wrong. Check if your metamask is logged in with correct address and try reloading.")
      setProcessing(false)
    }
    }
    
    }
    

  }



  function tooltip() {
    document.querySelector('.tooltip1').style.display = 'inline-block';
  }

  function tooltipNone() {
    document.querySelector('.tooltip1').style.display = 'none';
  }

 function toggleTooltip() {
  var x = document.querySelector('.tooltip1');
  if (x.style.display === "none") {
    x.style.display = "inline-block";
  } else {
    x.style.display = "none";
  }
}

  return (
    <div className="buy-now-wrap" >
      <div className="wallet-wrap">
        <p className="wallet-address">Active Wallet: <span id="address">{address.substring(0,5) + "..." + address.substring(13,18)}</span></p>
        <p className="balance">Tokns Booked: <span id="bal">{balance}</span></p>
      </div>
        
        <div className="white-container2">
            <span className="info" onMouseOver={tooltip} onMouseOut={tooltipNone} onClick={toggleTooltip}>
              i 
            </span>
            <span className="tooltip1">Book the first ever FSTs by preordering. When beta goes live, tokn-holders will receive their FSTs and begin earning royalties.</span>
          <div className="left">
            <img src={songPoster} alt="" className="song-poster" />
            <span className="song-info">
                <h1>In My Head</h1>
                <div className="artist-info">
                  <img src={artistImg} alt="" className="artist-img" />
                  <h5>Stevie Flowers</h5>
                </div>
            </span> 
          </div>
            <div className="white-container-inner">
                <p className="qty">Quantity</p>
                <input className="qty-input" id="quantity" type="number" placeholder="---" min="0" step="1" max="100" onChange={handleChange} />
                {errmess ? <p style={{color: 'red'}}>{errmess}</p>: null}
                <br />
                <span className="left">Tokns Available</span>
                <span className="right">{toknsAvailable}</span>
                <br />
                <hr />
                <span className="left">Royalties</span>
                <span className="right">{ryl} %</span>
                <br />
                <hr />
                <span className="left">Quantity</span>
                <span className="right">{qty} Tokns</span>
                <br />
                <hr />
                <span className="left">Total Price</span>
                <span className="right">{amount} USDC</span>
                <br />
                <br />
                <br />
                <button type="button" name="button" className="btn-primary buy-now-btn" id="buy-now" onClick={buyTokns}>
                   {processing ? <span>Processing...</span> : <span>Book Now</span>} 
                </button>
                <br />
              

                {/* <div className="popup-wrapper">
                  <div className="popup">
                    <div className="popup-close" onClick={popout}>+</div>
                    <div className="popup-content">
                      <button type="button" name="button" class="btn-primary buy-now-btn popup-btn pb1" id="buy-now" onClick={buyTokns}>
                        Pay now with USDC
                      </button>
                      <br />
                      <br />
                      <Link to="/congrats">
                      <button type="button" name="button" class="btn-primary buy-now-btn popup-btn" id="buy-now">
                        Have already paid
                      </button>
                      </Link>
                    </div>
                  </div>
                </div> */}
            <Link to="/congrats">
                <p className="your-tokns-btn">
                  Booked Tokns 
                </p>
                </Link>
              </div> 
        </div>
    </div>
  );
}

export default BuyNow;
