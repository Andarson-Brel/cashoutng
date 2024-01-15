import React from "react";

export default function Homepage({ userData, TopNavbar }) {
  return (
    <>
      <header className="home-header ">
        <TopNavbar />
        <section className="hero-sectiion ninety-percent display-flex-top">
          <div className="left-cont">
            <h1 className="hero-heading">Sell At The Best Rate</h1>
            <p className="hero-desc">
              Embark on a seamless trading adventure with cashOut.ng, where you
              can effortlessly sell over 20 cryptocurrencies paired with 20+
              fiat currencies.
            </p>
            <form className="login-form">
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <button className="login-btn">Login</button>
            </form>
          </div>
          <div className="hero-illustration">
            <img src="/images/astronaut.svg" alt="hero section illustration" />
          </div>
        </section>
        <img className="hill" src="/images/hill.svg" alt="hill illustration" />
      </header>
      <section className="about-section ">
        <div className="ninety-percent">
          <div className="about-heading-cont">
            <h2 className="about-head">Why You Should Use Us</h2>
            <p>
              Since 2018 the main goal of CashOut.ng has been to remove the
              complexity of the crypto space
              <br />
              for fiat users.
            </p>
          </div>
          <div className="cards-cont">
            <div className="card">
              <img
                className="card-icon"
                alt="card-icon"
                src="/images/crypto-icon.svg"
              />
              <div className="card-des-cont">
                <h3 className="card-head">Swift and Fast Payout</h3>
                <p className="card-desc">
                  We prioritize your time and efficiency. Our fast payout system
                  ensures that you receive your funds promptly, providing a
                  seamless and swift experience for every transaction.
                </p>
              </div>
            </div>
            <div className="card">
              <img className="card-icon" alt="card-icon" src="/images/ui.svg" />
              <div className="card-des-cont">
                <h3 className="card-head">Easy To Use Interface</h3>
                <p className="card-desc">
                  Navigating the world of cryptocurrencies has never been this
                  straightforward. Your journey begins with an interface so
                  easy, it feels like second nature. Welcome to simplicity
                </p>
              </div>
            </div>
            <div className="card">
              <img
                className="card-icon"
                alt="card-icon"
                src="/images/rates.svg"
              />
              <div className="card-des-cont">
                <h3 className="card-head">Best Rates</h3>
                <p className="card-desc">
                  We are dedicated to maximizing your returns. Enjoy
                  unparalleled value with our commitment to offering the best
                  rates in the market. Rest assured that every transaction is
                  optimized for your benefit.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                className="card-icon"
                alt="card-icon"
                src="/images/crypto-icon.svg"
              />
              <div className="card-des-cont">
                <h3 className="card-head">Swift and Fast Payout</h3>
                <p className="card-desc">
                  We prioritize your time and efficiency. Our fast payout system
                  ensures that you receive your funds promptly, providing a
                  seamless and swift experience for every transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rate-section">
        <div className="ninety-percent">
          <h3 className="rate-title">How It Works?</h3>
          <p className="rate-title-desc">Trade With us in 4 Basic Steps</p>
          <div className="rate-container">
            <div className="step-container">
              <p className="number">1</p>
              <h3 className="step-title">Sign Up</h3>
              <p className="step-desc">
                Sign Up and get Access to our fast and easy Trading
              </p>
            </div>

            <div className="step-container">
              <p className="number">2</p>
              <h3 className="step-title">Select Coin</h3>
              <p className="step-desc">
                Select Coin You want to trade and copy Wallet Address
              </p>
            </div>
            <div className="step-container">
              <p className="number">3</p>
              <h3 className="step-title">Transfer</h3>
              <p className="step-desc">
                Send the coin amount from your wallet to our Copied wallet
                Address
              </p>
            </div>
            <div className="step-container">
              <p className="number">4</p>
              <h3 className="step-title">Fill Out Form and Submit</h3>
              <p className="step-desc">
                Fill out the form and upload screenshot of the confirmation page
                provided from your crypto wallet
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
