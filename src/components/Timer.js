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

  componentDidMount() {
    this.setStateTime(this.props.countSeconds);
    this.setState({ playAlarm: this.props.countSeconds <= 60 })
    this.beginAt = new Date();
    this.runTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPause === this.props.isPause) {
      return;
    }

    if (this.props.isPause) {
      this.elapsedSeconds = this.getElapsedSeconds();
      clearInterval(this.timerID);
    } else {
      const currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() - this.elapsedSeconds);
      this.beginAt = currentDate;
      this.runTimer();
    }
  }

  runTimer() {
    this.timerID = setInterval(
      () => this.tick(),
      250
    );
  }

  tick() {
    const remaining = this.getRemainingSeconds();
    this.setStateTime(remaining);
    if (!this.state.playFinish && remaining <= 0) {
      this.setState({ playFinish: true });
      this.playSound('finish');
    } else if (!this.state.playAlarm && remaining <= 60) {
      this.setState({ playAlarm: true });
      this.playSound('alarm');
    }
  }

  getRemainingSeconds() {
    const getElapsedSeconds = this.getElapsedSeconds();
    return this.props.countSeconds - getElapsedSeconds;
  }

  getElapsedSeconds() {
    // 900ms：経過時間の観点から補正
    const elapsedSeconds = (new Date() - this.beginAt - 900);
    return elapsedSeconds / 1000;
  }

  setStateTime(remainingSeconds) {
    const time = convertTime(remainingSeconds);
    this.setState({
      isNegative: remainingSeconds < 0,
      hour: padZero(time.hour),
      minute: padZero(time.minute),
      second: padZero(time.second)
    })
  }

  playSound(id) {
    const finish = document.getElementById(id);
    finish.play();
  }

  attachClass() {
    const baseClass = ['timer'];
    if (this.state.isNegative) {
      baseClass.push('negative')
    }

    return baseClass.join(' ')
  }

  render() {
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