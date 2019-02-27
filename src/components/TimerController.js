import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause } from '@fortawesome/free-solid-svg-icons'

const TimerController = (props) => {
  const readyButtons = (
    <React.Fragment>
      <button onClick={props.onStart}>
        <FontAwesomeIcon icon={faPlay} size="4x" />
      </button>
    </React.Fragment>
  );
  const runningButtons = (
    <React.Fragment>
      <button>
        <FontAwesomeIcon icon={faPause} size="4x" />
      </button>
      <button onClick={props.onCancel}>
        <FontAwesomeIcon icon={faStop} size="4x" />
      </button>
    </React.Fragment>
  );
  const renderingButtons = props.isRunning ? runningButtons : readyButtons;

  return (
    <div className="button-controlls">
      {renderingButtons}
    </div>
  );
};

export default TimerController;