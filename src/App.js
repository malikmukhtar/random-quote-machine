import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends React.Component {
  state = {
    quotes: [],
    index: 0
  };

  componentDidMount() {
    //call API and update state
    fetch(API).then(res =>
      res.json().then(res => {
        this.setState(
          {
            quotes: res.quotes
          },
          this.getRandomIndex
        );
      })
    );
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      });
    }
  };

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    // let tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}`;
    return (
      <div className="wrapper d-flex justify-content-center align-items-center vh-100">
        <div className="col-6 box p-4 rounded">
          {quote && (
            <div className="mb-4">
              <p>{quote.quote}</p>
              <cite className="d-block text-right">- {quote.author}</cite>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <a
              href="https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}"
              className="btn btn-primary"
              target="_blank"
            >
              Tweet
            </a>
            <button className="btn btn-primary">Get Quote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
