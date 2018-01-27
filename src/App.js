/* global chrome */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontColor: ''
    }

    this.handleFontColorChange = this.handleFontColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount(){
    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
      console.log("******",request)
      var htmlID = request.selectedID
      console.log("%^$%$%$%$", htmlID)
      sendResponse({test:'test'})
    })
  }

  handleFontColorChange(newColor){
    this.setState({fontColor: newColor});
  }

  handleSubmit(event) {
    let theData = event.target.fontColor.value;
    event.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { data: theData }, function (response) {
      });
    });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FrankenStyle</h1>
          <div id="displayImg">display current element here</div>
        </header>
        <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.fontColor}  onChange={this.handleFontColorChange} id="fontColor" className="jscolor" >
            </input>
            <button type="submit" value="Submit"> Change Color </button>
          </form>
      </div>
    );
  }
}

export default App;
