import React, { Component } from 'react';
import TimeSelector from "./TimeSelector";
import { convertTime } from "../Util";

class TimeInputArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hour: 0,
      minute: 0,
      second: 0
    }
  }

  componentDidMount () {
    const time = convertTime(this.props.time);
    this.setState(time);
  }

  handleChange (name, value) {
    let time = this.getCurrentTime();
    time[name] = Number(value);
    this.setState(() => { return { [name]: value }; });
    this.onChange(time);
  }

  getCurrentTime () {
    return {
      hour: Number(this.state.hour),
      minute: Number(this.state.minute),
      second: Number(this.state.second)
    };
  }

  onChange (time) {
    let seconds = time.hour * 3600;
    seconds += time.minute * 60;
    seconds += time.second;
    this.props.onChange(seconds);
  }

  render () {
    return (
      <div className="time-input-container">
        <TimeSelector value={this.state.hour} onChange={(val) => this.handleChange('hour', val)} />
        <span>:</span>
        <TimeSelector value={this.state.minute} onChange={(val) => this.handleChange('minute', val)} />
        <span>:</span>
        <TimeSelector value={this.state.second} onChange={(val) => this.handleChange('second', val)} />
      </div>
    )
  };
};

export default TimeInputArea;