import congrats from './congrats.png';
import twitter from './twitter.png';
import telegram from './telegram.png';
import instagram from './instagram.png';
import '../App.css';

function Congrats() {
  return (
    <div className="App">
        <div className="white-container2">
            <span className="info">i</span>
            <span className="song-img song-img2"></span>
            <span className="song-info">
                <h1>Song Title</h1>
                <h5><span className="profile-pic"></span>Artist Name</h5>
            </span> 
            <div className="white-container-inner wci2">
                <h6><img src={congrats} className="congrats" alt="congrats" />Congrats!<img src={congrats} className="congrats" alt="congrats" /></h6>
                <p className="large-text">You are an owner of the first ever FST!!! <br />
                To say thanks for participating in our test launch, <br />
                we have sent some extra rewards to your wallet :) <br />
                <span className="blue-text">What happens next?</span> Tokn Music will launch in <br />
                February of 2022 and you'll get early access <br />
                so make sure to keep up to date with everything <br />
                on our telegram or other socials. <span className="bold-text">See you soon!</span></p>
                <img src={twitter} className="twitter" alt="twitter" />
                <img src={telegram} className="telegram" alt="telegram" />
                <img src={instagram} className="instagram" alt="instagram" />
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
            </div>          
        </div>
    </div>
  );
}

export default Congrats;
