import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../App.css';

function BuyNow() {

  const [state, setState] = useState(true);  

  return (
    <div className="App">
        <div className="white-container2">
            <span className="info">i</span>
            <span className="song-img"></span>
            <span className="song-info">
                <h1>Song Title</h1>
                <h5><span className="profile-pic"></span>Artist Name</h5>
            </span>    
            <div className="white-container-inner">
                <p className="qty">Quantity</p>
                <input className="qty-input" type="text" name="" placeholder="----" />
                <br />
                <span className="left">Release Date</span>
                <span className="right">Jan 14 2022</span>
                <br />
                <hr />
                <span className="left">Royalties</span>
                <span className="right">----</span>
                <br />
                <hr />
                <span className="left">Quantity</span>
                <span className="right">----</span>
                <br />
                <hr />
                <span className="left">Total Price</span>
                <span className="right">----</span>
                <br />
                <p className="terms">Accept Terms and Conditions</p>
                <input type="checkbox" name="" value="" class="checkbox" id="checkbox" onClick={() => setState(!useState)} />
                <br />
                {state && <button type="button" name="button" class="btn-primary buy-now-btn btn-inactive">
                    Buy Now
                </button>}
                <Link to="/congrats">
                {!state && <button type="button" name="button" class="btn-primary buy-now-btn" id="buy-now">
                    Buy Now
                </button>}
                </Link>
            </div>          
        </div>
    </div>
  );
}

export default BuyNow;
