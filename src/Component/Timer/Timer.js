import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './Timer.css';

class Timer extends Component {
  componentWillMount() {
    this.initialiseValues();
  }


  initialiseValues = () => {

    this.setState({
      buttonDisplay: {
        showButton: false
      },
      startTime: {
        startValue: '',
        startFlag: false,
        inputStartHour: 0,
        inputStartMinute: 0,
      },
      endTime: {
        endValue: '',
        endFlag: false,
        inputEndHour: 0,
        inputEndMinute: 0,
      },
      frontTimer: {
        frontValue: '',
        frontTimerFlag: false,
        frontHour: 0,
        frontMinute: 0,
        frontSecond: 0
      },
      backGroundTimer: {
        backGroundValue: '',
        backGroundTimerFlag: false,
        backGroundHour: 0,
        backGroundMinute: 0,
        backGroundSecond: 0
      },
      startButton: {
        startLabel: 'Start',
        startButtonFlag: true,
        showStartButtonFlag: true
      },
      pauseButton: {
        pauseLabel: 'Pause',
        pauseButtonFlag: false
      },
      resumeButton: {
        resumeLabel: 'Resume',
        resumeButtonFlag: false
      },
      stopButton: {
        stopLabel: 'Stop',
        stopButtonFlag: true
      },
     
     
    })
  }


  //Handling  Input value for Timer
  handleChange = (e) => {
    const { startTime, endTime } = this.state

   
    let inputHTMLname = e.target.name      

    
    let x, hour, min, flag

   
    if (inputHTMLname === 'startValue') {
      x = startTime
      hour = 'inputStartHour'
      min = 'inputStartMinute'
      flag = 'startFlag'
    }
    else if (inputHTMLname === 'endValue') {
      x = endTime
      hour = 'inputEndHour'
      min = 'inputEndMinute'
      flag = 'endFlag'
    }

   
    let inputHTMLvalue = e.target.value

    
    x[inputHTMLname] = inputHTMLvalue;

   
    x[hour] = parseInt(inputHTMLvalue.substr(0, 2))

   
    x[min] = parseInt(inputHTMLvalue.substr(3, 2))

    
    x[flag] = true

    this.setState({
      startTime,
      endTime,
    });
  }


  //Handling Initial Display of StartButton
  validateButtonHandler = () => {
    let { startTime, endTime, startButton } = this.state
    const { startFlag } = startTime
    const { endFlag } = endTime

    if (startFlag && endFlag) {
      startButton = {
        ...startButton,
        startButtonFlag: false
      }
    }

    this.setState({
      startButton
    })
  }

  startTimerHandler = (e) => {

    this.initialAssignTimer();
    this.frontTimerunner();
  }

  //Handling Initial Value in Front-Timer
  initialAssignTimer = () => {
    let { startTime, frontTimer, backGroundTimer, startButton, pauseButton, stopButton } = this.state

    // let { startButtonFlag } = startButton
    const { inputStartHour, inputStartMinute } = startTime
    let { frontHour, frontMinute, frontTimerFlag } = frontTimer;
    let { backGroundHour, backGroundMinute, backGroundTimerFlag } = backGroundTimer

    frontHour = inputStartHour
    frontMinute = inputStartMinute
    frontTimerFlag = true

    backGroundHour = inputStartHour
    backGroundMinute = inputStartMinute
    backGroundTimerFlag = true

   
    frontTimer = {
      ...frontTimer,
      frontHour, frontMinute, frontTimerFlag
    }

    backGroundTimer = {
      ...backGroundTimer,
      backGroundHour, backGroundMinute, backGroundTimerFlag
    }

    startButton = {
      ...startButton,
      startButtonFlag: false,
      showStartButtonFlag: false
    }

    pauseButton = {
      ...pauseButton,
      pauseButtonFlag: true
    }

    stopButton = {
      ...stopButton,
      stopButtonFlag: false
    }

    this.setState({
      frontTimer,
      backGroundTimer,
      startButton, pauseButton, stopButton
    })
  }

 // Handling Front-Timer
  frontTimerunner = () => {
    const { buttonDisplay } = this.state
    let { showButton } = buttonDisplay
    setInterval(() => {

     
      this.incrementTimer();
    }, 1000)

    
    this.setState({
      buttonDisplay: {
        showButton: !showButton
      }
    })
  }

  //Handling BackGround Timer & Front-Timer

  incrementTimer = () => {
    let { frontTimer, endTime, backGroundTimer } = this.state

    const { inputEndHour, inputEndMinute } = endTime
    let { frontHour, frontMinute, frontSecond, frontTimerFlag } = frontTimer;
    let { backGroundHour, backGroundMinute, backGroundSecond, backGroundTimerFlag } = backGroundTimer

    if ((inputEndHour > backGroundHour) || ((inputEndHour === backGroundHour) && (inputEndMinute > backGroundMinute))) {
      backGroundSecond = backGroundSecond + 1;
      if (backGroundSecond > 59) {
        backGroundSecond = 0;
        backGroundMinute += 1;
      }
      if (backGroundMinute > 59) {
        backGroundMinute = 0;
        backGroundHour += 1;
      }
      if (frontTimerFlag) {
        frontSecond = backGroundSecond
        frontMinute = backGroundMinute
        frontHour = backGroundHour
      }

      this.setState({
        backGroundTimer: {
          ...backGroundTimer,
          backGroundSecond,
          backGroundMinute,
          backGroundHour,
          backGroundTimerFlag
        },
        frontTimer: {
          ...frontTimer,
          frontSecond,
          frontMinute,
          frontHour,
          frontTimerFlag
        }
      })
    }
    else {
      frontTimerFlag = false;
      frontTimer.frontHour = backGroundTimer.backGroundHour
      frontTimer.frontMinute = backGroundTimer.backGroundMinute
      frontTimer.frontSecond = backGroundTimer.backGroundSecond
      this.setState({
        frontTimer,
        buttonDisplay: {
          showButton: false
        },
        startTime: {
          startValue: '',
          startFlag: false,
          inputStartHour: 0,
          inputStartMinute: 0,
        },
        endTime: {
          endValue: '',
          endFlag: false,
          inputEndHour: 0,
          inputEndMinute: 0,
        },
        startButton: {
          startLabel: 'Start',
          startButtonFlag: true,
          showStartButtonFlag: true
        },
        resumeButton: {
          resumeLabel: 'Resume',
          resumeButtonFlag: false
        },
        stopButton: {
          stopLabel: 'Stop',
          stopButtonFlag: true
        }
      })
    }
  }


  // Handling Pause Button
  pauseTimerHandler = () => {
    const { frontTimer, pauseButton, resumeButton } = this.state;
    let { frontTimerFlag } = frontTimer
    frontTimerFlag = false


    this.setState({
      frontTimer: {
        ...frontTimer,
        frontTimerFlag
      },
      pauseButton: {
        ...pauseButton,
        pauseButtonFlag: false
      },
      resumeButton: {
        ...resumeButton,
        resumeButtonFlag: true
      }
    })
  }


  //Handling  Resume Button
  resumeTimerHandler = () => {
    const { frontTimer, pauseButton, resumeButton } = this.state;
    let { frontTimerFlag } = frontTimer
    frontTimerFlag = true


    this.setState({
      frontTimer: {
        ...frontTimer,
        frontTimerFlag
      },
      pauseButton: {
        ...pauseButton,
        pauseButtonFlag: true
      },
      resumeButton: {
        ...resumeButton,
        resumeButtonFlag: false
      }
    })
  }


  //Handling Stop Button
  stopTimerHandler = () => {
    this.initialiseValues();
    window.location.reload()
  }

  render() {
    const { startTime, endTime, startButton, pauseButton, stopButton, resumeButton, frontTimer, buttonDisplay,  } = this.state
    const { showButton } = buttonDisplay
    const { startValue } = startTime
    const { endValue } = endTime
    let { startLabel, startButtonFlag, showStartButtonFlag } = startButton
    const { pauseLabel, pauseButtonFlag } = pauseButton
    const { stopLabel, stopButtonFlag } = stopButton
    const { resumeLabel, resumeButtonFlag } = resumeButton


    const { handleChange, startTimerHandler, pauseTimerHandler, resumeTimerHandler, stopTimerHandler, validateButtonHandler } = this

    let { frontValue, frontHour, frontMinute, frontSecond } = frontTimer
      
    frontValue = `${frontHour}:${frontMinute}:${frontSecond}`

    return (
    
          <React.Fragment >
              <Container>
                  <Row>
                      <Col sm={4}></Col>
                      <Col sm={4} className='circle'>
                         
        <div style={{marginTop:'20%', marginLeft:'33%'}}>
          Start Time:
          <input type='time' name='startValue' value={startValue} onChange={(e) => { handleChange(e); validateButtonHandler(); }}></input><br />
         <br/><br/>
         
          End Time:
          <input type='time' name='endValue' value={endValue} onChange={(e) => { handleChange(e); validateButtonHandler(); }}></input>
        </div>
        <br/><br/>
        <hr/>
        <div style={{marginTop:'4%', marginLeft:'33%'}}>
           
          Timer: <span style={{backgroundColor:'grey'}}>{frontValue}</span>
        </div>
        <hr/>
        <div  style={{marginTop:'4%', marginLeft:'38%'}}>

          {
            (!showButton && showStartButtonFlag) ? <input type='button' value={startLabel} onClick={startTimerHandler} disabled={startButtonFlag}></input>
              : null
          }

          {(showButton && pauseButtonFlag) && <input type='button' value={pauseLabel} onClick={pauseTimerHandler}></input>}
          {(showButton && resumeButtonFlag) && <input type='button' value={resumeLabel} onClick={resumeTimerHandler}></input>}

          <br /><br/>
          <input type='button' value={stopLabel} onClick={stopTimerHandler} disabled={stopButtonFlag}></input>
        </div></Col>
        <Col sm={4}></Col>
        </Row>
        </Container>
</React.Fragment>
     
    );
  }
}

export default Timer;
