import React from 'react';
import { padZero, convertTime } from "../Util";

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isNegative: false,
      hour: '00',
      minute: '00',
      second: '00',
      playAlarm: false,
      playFinish: false
    }
  }

  componentDidMount () {
    this.setStateTime(this.props.countSeconds - 1);
    this.setState({playAlarm: this.props.countSeconds <= 60})
    this.beginAt = new Date();
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount () {
    clearInterval(this.timerID);
  }

  tick () {
    const elapsedTime = (new Date() - this.beginAt) / 1000;
    const remaining = this.props.countSeconds - elapsedTime;
    this.setStateTime(remaining);
    if (!this.state.playFinish && remaining <= 0) {
      this.setState({playFinish: true});
      this.playSound('finish');
    } else if (!this.state.playAlarm && remaining <= 60) {
      this.setState({playAlarm: true});
      this.playSound('alarm');
    }
  }

  setStateTime (remainingSeconds) {
    let time = convertTime(remainingSeconds);
    this.setState({
      isNegative: remainingSeconds < 0,
      hour: padZero(time.hour),
      minute: padZero(time.minute),
      second: padZero(time.second)
    })
  }

  playSound (id) {
    let finish = document.getElementById(id);
    finish.play();
  }

  attachClass () {
    let baseClass = ['timer'];
    if (this.state.isNegative) {
      baseClass.push('negative')
    }

    return baseClass.join(' ')
  }

  render () {
    return (
      <div className="timer-container">
        <div className={this.attachClass()}>
          {this.state.hour}:{this.state.minute}:{this.state.second}
        </div>
      </div>
    );
  }
};

export default Timer;