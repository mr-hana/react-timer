import React, { Component } from 'react';
import Timer from './components/Timer';
import TimeInputArea from './components/TimeInputArea';
import TimerController from './components/TimerController';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      isRunning: false,
    }
  }

  handleRunning () {
    this.setState({ isRunning: true, isPause: false });
  }

  handleCancel () {
    this.setState({ isRunning: false });
  }

  handlePause () {
    this.setState({ isPause: true });
  }

  handleChangeTime (timeSeconds) {
    this.setState({ time: timeSeconds });
  }

  render () {
    return (
      <div className="App">
        {this.state.isRunning
          ? <Timer countSeconds={this.state.time} isRunning={this.state.isRunning} isPause={this.state.isPause} /> 
          : <TimeInputArea time={this.state.time} onChange={(value) => this.handleChangeTime(value)} />}
        <TimerController
          isRunning={this.state.isRunning}
          isPause={this.state.isPause}
          onStart={() => this.handleRunning()}
          onCancel={() => this.handleCancel()}
          onPause={() => this.handlePause()}
           />
        <audio id="finish" src="finish.mp3" />
        <audio id="alarm" src="alarm.mp3" />
      </div>
    );
  }
}

export default App;
