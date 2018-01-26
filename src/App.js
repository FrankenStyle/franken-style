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

  handleFontColorChange(newColor){
    // console.log('clicked', event.target.value, event.target.fontColor.value)
    // this.state = ({ fontColor: newColor });
    this.setState({fontColor: newColor});
  }

  handleSubmit(event) {
    let theData = event.target.fontColor.value;
    event.preventDefault();
    console.log('submitted from handleSubmit', event.target.fontColor.value)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { data: theData }, function (response) {
        // chrome.tabs.sendMessage(tabs[0].id, { data: 'hello world' }, function (response) {
        // $('#status').html('changed data in page');
        console.log('success');
      });
    });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          {/* <input type="text" id="fontColor" className="jscolor" value="#ffcc00" ></input> */}
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.fontColor}  onChange={this.handleFontColorChange} id="fontColor" className="jscolor" ></input>

            {/* <input type="text" id="fontColor" className="jscolor" value={this.state.fontColor} ></input> */}
          {/* <button onClick={()=>{

            console.log('font color',this.state.fontColor)
            console.log('chrom changd', chrome)
            // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            //   chrome.tabs.sendMessage(tabs[0].id, { fontColor: 'xxx'}, function (response) {
            //   // chrome.tabs.sendMessage(tabs[0].id, { data: 'hello world' }, function (response) {
            //     // $('#status').html('changed data in page');
            //     console.log('success');
            //   });
            // });

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, { data: 'dd'  }, function (response) {
                // chrome.tabs.sendMessage(tabs[0].id, { data: 'hello world' }, function (response) {
                // $('#status').html('changed data in page');
                console.log('success');
              });
            });

          }}> Change </button> */}

          {/* <button onClick={() => {
            console.log('chrom changd', chrome)
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { data: 'hello world' }, function (response) {
                // $('#status').html('changed data in page');
                console.log('success');
              });
            });
          }}> Click me </button> */}
            <button type="submit" value="Submit"> Change </button>


          </form>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
