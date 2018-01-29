/* global chrome */
import React, { Component } from 'react';
import {Tabs, Tab, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontColor: '',
      element: 'Select an Element'
    }

    this.handleFontColorChange = this.handleFontColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {

      var selectedClassName = request.selectedClassName;
      var selectedNode = request.selectedNode.toLowerCase();
      var selectedClassList = request.selectedClassList;
      var display = selectedNode+"."+selectedClassName

      // console.log("request Obj", request)
      this.setState({element: display})
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
          <input type="text" value={this.state.element} id="displayImg"></input>
        </header>
        <Tabs>
        <TabList >
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
        </TabList>
        
        <TabPanel>
        <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.fontColor}  onChange={this.handleFontColorChange} id="fontColor" className="jscolor" >
            </input>
            <button type="submit" value="Submit"> Change Color </button>
          </form>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
      </div>
    );
  }
}

export default App;
