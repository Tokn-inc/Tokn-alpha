import congrats from './congrats.png';
import { Link } from "react-router-dom";
import contract from '../ToknContract';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateBalance } from '../redux';
import songPoster from './song-poster.jpg';
import artistImg from './NC-img.png';

function Congrats() {
  const {address, balance} = useSelector(state => state.wallet)
  const [toknsAvailable, setToknsAvailable] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getToknsAvailable(){
      const toknITO = await contract.methods.getITO('1').call();
      const tokns = toknITO.toknsAvailable;
      setToknsAvailable(tokns)
    }
    getToknsAvailable()
    dispatch(updateBalance(address, 1))
  }, [])
  
  function tooltip() {
    document.querySelector('.tooltip1').style.display = 'inline-block';
  }

  function tooltipNone() {
    document.querySelector('.tooltip1').style.display = 'none';
  }
  return (
    <div className="buy-now-wrap">
    <div className="wallet-wrap">
      <p className="wallet-address">Active Wallet: <span id="address">{address.substring(0,5) + "..." + address.substring(13,18)}</span></p>
      <p className="balance">Tokns Booked: <span id="bal">{balance}</span></p>
      </div>
        <div className="white-container2">
            <span className="info" onMouseOver={tooltip} onMouseOut={tooltipNone}>
              i 
            </span>
            <span className="tooltip1">Book the first ever FSTs by preordering. When beta goes live, tokn-holders will receive their FSTs and begin earning royalties.</span>
          <div className="left">
            <img src={songPoster} alt='song-poster' className="song-poster" />
            <span className="song-info song-info2">
                <h1>On My Own</h1>
                <h5><img src={artistImg} alt='NC' className="artist-img" />NC</h5>
            </span> 
          </div>
            <div className="white-container-inner">
                <h6><img src={congrats} className="congrats" alt="congrats" />Congrats!<img src={congrats} className="congrats" alt="congrats" /></h6>
                <p className="large-text">You've booked the first ever FST!!! <br />
                To say thanks for participating in our test launch, <br />
                we have sent some extra rewards to your wallet :) <br />
                <span className="blue-text">What happens next?</span> Tokn Music will launch in <br />
                February of 2022 and you'll get early access <br />
                so make sure to keep up to date with everything <br />
                on our telegram or other socials. <span className="bold-text">See you soon!</span></p>
                <br />
                <Link to="/buy-now">
                <button type="button" name="button" class="btn-primary buy-now-btn">
                    Book More
                </button>
                </Link>
                <br />
                <br />
                <span className="left">Tokns Available</span>
                <span className="right" id="tokns-available2">{toknsAvailable}</span>
                <br />
                <hr />
                <span className="left">Your Booked Tokns</span>
                <span className="right" id="bal2">{balance}</span>
                <br />
                <hr />
                <span className="left">Your Royalties</span>
                <span className="right" id="rylty">{Number(balance)*Number(0.1)}</span>
            </div>          
        </div>
    </div>
  );
}

export default Congrats;
