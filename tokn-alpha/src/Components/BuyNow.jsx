import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux"
import { Link } from "react-router-dom";
import contract from "../contract"
import { updateBalance } from "../redux";
import '../App.css';

function BuyNow() {
  const address = useSelector((state) => state.wallet.address)
  const dispatch = useDispatch()
  const [state, setState] = useState(true);
  const [qty, setQty] = useState("----")
  const [ryl, setRyl] = useState("----")
  const [price, setPrice] = useState("----")

  function handleChange(event) {
    event.preventDefault()
    setQty(event.target.value * 1 + " Tokns")
    setRyl(event.target.value * 0.1 + " %")
    setPrice(event.target.value * 100 + " USDC")
  }

  async function handleClick(event){
      event.preventDefault()
      const id = 1
      try{
        await contract.methods.buyTokn(id, qty).send({from : address})
        dispatch(updateBalance(address, id))
      }catch(error){
          console.log(error.message);
      }
  }

  return (
    <div className="App">
        <p className="wallet-address">Active Wallet: <span id="address"></span></p>
        <p className="balance">Balance (Song Tokns): <span id="bal"></span></p>
        <div className="white-container2">
            <span className="info">i</span>
            <span className="song-img"></span>
            <span className="song-info">
                <h1>Song Title</h1>
                <h5><span className="profile-pic"></span>Artist Name</h5>
            </span>   
            <div className="white-container-inner">
                <p className="qty">Quantity</p>
                <input className="qty-input" id="quantity" type="text" placeholder="---" onChange={handleChange} />
                
                <br />
                <span className="left">Release Date</span>
                <span className="right">Jan 14 2022</span>
                <br />
                <hr />
                <span className="left">Royalties</span>
                <span className="right">{ryl}</span>
                <br />
                <hr />
                <span className="left">Quantity</span>
                <span className="right">{qty}</span>
                <br />
                <hr />
                <span className="left">Total Price</span>
                <span className="right">{price}</span>
                <br />
                <p className="terms">Accept Terms and Conditions</p>
                <input type="checkbox" name="" value="" class="checkbox" id="checkbox" onClick={() => setState(!useState)} />
                <br />
                {state && <button type="button" name="button" class="btn-primary buy-now-btn btn-inactive">
                    Buy Now
                </button>}
                {/* <Link to="/congrats"> */}
                {!state && <button type="button" name="button" class="btn-primary buy-now-btn" id="buy-now" onClick={handleClick}>
                    Buy Now
                </button>}
                {/* </Link> */}
            </div>          
        </div>
    </div>
  );
}

export default BuyNow;
