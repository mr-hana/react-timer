import React from "react";
import { range, padZero } from "../Util";

const TimeSelector = (props) => {
  const options = range(0, 59);
  return (
    <div>
      <select className="time-select" onChange={e => props.onChange(e.target.value)} value={props.value}>
        <optgroup>
          {options.map(val => (
            <option key={val} value={val}>
              {padZero(val)}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default TimeSelector;