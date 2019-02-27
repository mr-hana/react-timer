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
    this.setState({ isRunning: true });
  }

  handleCancel () {
    this.setState({ isRunning: false });
  }

  handleChangeTime (timeSeconds) {
    this.setState({ time: timeSeconds });
  }

  render () {
    return (
      <div className="App">
        {this.state.isRunning ? <Timer countSeconds={this.state.time} /> : <TimeInputArea time={this.state.time} onChange={(value) => this.handleChangeTime(value)} />}
        <TimerController
          isRunning={this.state.isRunning}
          onStart={() => this.handleRunning()}
          onCancel={() => this.handleCancel()} />
        <audio id="finish" src="finish.mp3" />
        <audio id="alarm" src="alarm.mp3" />
      </div>
    );
  }
}

export default App;
