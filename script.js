function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Session = "Session";
const Break = "Break";

class Length extends React.Component {
  render() {
    let length = this.props.counterType === 'break' ? this.props.breakLength : this.props.sessionLength;

    return (
      React.createElement("div", { id: this.props.counterType + '-label', className: "length-label" },
      React.createElement("div", null, this.props.counterType.charAt(0).toUpperCase() + this.props.counterType.substring(1), " Length"),
      React.createElement("div", null,
      React.createElement("button", { id: this.props.counterType + '-decrement', className: "plusminus", value: "-", onClick: this.props.adjustTime },
      React.createElement("i", { className: "fa fa-minus" })),

      React.createElement("div", { id: this.props.counterType + '-length', className: "lengthVal" }, length),
      React.createElement("button", { id: this.props.counterType + '-increment', className: "plusminus", value: "+", onClick: this.props.adjustTime },
      React.createElement("i", { className: "fa fa-plus" })))));
  }}


class Tomato extends React.Component {

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }

  render() {
    return (
      React.createElement("div", { id: "tomato" },
      React.createElement("div", { id: "leaves" }),
      React.createElement("div", { id: "timer-label" }, this.props.timerLabel),
      React.createElement("div", { id: "time-left" }, this.formatTime(this.props.timer)),
      React.createElement(Scale, { timer: this.props.timer })));
  }}


class Scale extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "createScale",

    () => {
      let sticks = [];
      let x1 = 2;
      let x2 = 2;
      let y1 = 0;
      let y2 = 0;

      // Outer loop to create major sticks
      for (let i = 0; i < 12; i++) {
        let minorSticks = [];
        x2 = x1;
        y2 = y1;
        //Inner loop to create minor sticks
        for (let j = 0; j < 4; j++) {
          x2 = x2 + 6;
          y2 = this.calculateY(x2, y2, 'minor');
          minorSticks.push(React.createElement("rect", { className: "minor", x: x2, y: y2 }));
        }
        //Add the major and minor sticks
        sticks.push(minorSticks);
        x1 = x2 + 6;
        y1 = y2;
        y1 = this.calculateY(x1, y1, 'major');
        sticks.push(React.createElement("rect", { className: "major", x: x1, y: y1 }));
      }
      return sticks;
    });_defineProperty(this, "createMins",
    () => {
      let mins = [];
      let m = 5;
      let x = 24;
      for (let i = 1; i < 12; i++) {
        mins.push(React.createElement("text", { className: "mins", x: x },
        React.createElement("textPath", { xlinkHref: "#mins-curve" }, m)));

        m = m + 5;
        if (x < 80)
        x = x + 28;else

        x = x + 32;
      }
      return mins;
    });}calculateY(x, y, m) {if (m === 'minor') {if (x < 50) return y + 2.2;else if (x >= 50 && x <= 95) return y + 1.1;else if (x > 95 && x <= 143) return y + 0.9;else if (x > 143 && x <= 190) return y + 0.4;else if (x > 190 && x <= 237) return y - 0.4;else if (x > 237 && x <= 285) return y - 1.3;else if (x > 285 && x <= 332) return y - 1.4;else return y - 1.7;} else {if (x < 93) return y + 3;else if (x >= 93 && x <= 277) return y;else return y - 3;}}

  render() {
    let pointerPosition = (this.props.timer / 3600).toFixed(3) * 100;

    return (
      React.createElement("div", null,
      React.createElement("svg", { id: "pointer", width: "370", height: "65" },
      React.createElement("polygon", { id: "arrow", points: "-6,0 6,0 0,12",
        style: { offsetDistance: `${pointerPosition}%` } })),



      React.createElement("svg", { id: "scale", width: "365", height: "65" },
      React.createElement("path", { id: "scale-curve", d: "M 0 0 Q 185 75 370 0" }),
      this.createScale()),

      React.createElement("svg", { id: "mins", width: "365", height: "65" },
      React.createElement("path", { id: "mins-curve", d: "M 2 10 Q 184 85 372 10" }),
      this.createMins())));
  }}


class Controls extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "controls" },
      React.createElement("button", { id: "start_stop", className: "controls", onClick: this.props.controlTimer },
      !this.props.timerStatus ? React.createElement("i", { className: "fa fa-play fa-2x" }) : React.createElement("i", { className: "fa fa-pause fa-2x" })),

      React.createElement("button", { id: "reset", className: "controls", onClick: this.props.reset },
      React.createElement("i", { className: "fa fa-refresh fa-2x" }))));
  }}


class Footer extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "footer" },
      React.createElement("p", null, "Designed and coded by"),
      React.createElement("a", { target: "_blank", href: "https://s.codepen.io/atiyahaider/debug/oaZxeb/dGrXWdOKgPWM" }, "Atiya Haider")));
  }}



class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerLabel: Session,
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      timerStatus: false //false: timer off
    };

    this.adjustBreakTime = this.adjustBreakTime.bind(this);
    this.adjustSessionTime = this.adjustSessionTime.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.reset = this.reset.bind(this);
  }

  adjustBreakTime(e) {
    if (!this.state.timerStatus) {
      if (e.target.value === '-' && this.state.breakLength > 1) {
        this.setState({ breakLength: this.state.breakLength - 1 }, () => {
          if (this.state.timerLabel === Break)
          this.setState({ timer: this.state.breakLength * 60 });
        });
        //setState breakLength
      } //if
      else if (e.target.value === '+' && this.state.breakLength < 60) {
          this.setState({ breakLength: this.state.breakLength + 1 }, () => {
            if (this.state.timerLabel === Break)
            this.setState({ timer: this.state.breakLength * 60 });
          });

        }
    }
  }

  adjustSessionTime(e) {
    if (!this.state.timerStatus) {
      if (e.target.value === '-' && this.state.sessionLength > 1) {
        this.setState({ sessionLength: this.state.sessionLength - 1 }, () => {
          if (this.state.timerLabel === Session)
          this.setState({ timer: this.state.sessionLength * 60 });
        });

      } else
      if (e.target.value === '+' && this.state.sessionLength < 60) {
        this.setState({ sessionLength: this.state.sessionLength + 1 }, () => {
          if (this.state.timerLabel === Session)
          this.setState({ timer: this.state.sessionLength * 60 });
        });

      }
    }
  }

  controlTimer() {
    if (!this.state.timerStatus)
    this.interval = setInterval(this.runTimer, 1000);else

    clearInterval(this.interval);
    this.setState({ timerStatus: !this.state.timerStatus });
  }

  runTimer() {
    this.setState({ timer: this.state.timer - 1 }, () => {
      if (this.state.timer < 0) {

        const tomato = document.getElementById("tomato");
        $(tomato).addClass('animated shake');

        this.audioBeep.currentTime = 0;
        this.audioBeep.play();
        setTimeout(() => $(tomato).removeClass('animated shake'), 600);

        if (this.state.timerLabel === Session)
        this.setState({ timer: this.state.breakLength * 60,
          timerLabel: Break });else

        this.setState({ timer: this.state.sessionLength * 60,
          timerLabel: Session });
      }
    });
  }

  reset() {
    this.setState({
      timerLabel: Session,
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      timerStatus: false //false: timer off
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    clearInterval(this.interval);
  }

  render() {
    return (
      React.createElement("div", { id: "pomodoro" },
      React.createElement("div", { id: "heading" }, "Pomodoro Clock"),
      React.createElement("div", { id: "lengths" },
      React.createElement(Length, { counterType: "break", breakLength: this.state.breakLength, adjustTime: this.adjustBreakTime }),
      React.createElement(Length, { counterType: "session", sessionLength: this.state.sessionLength, adjustTime: this.adjustSessionTime })),

      React.createElement(Tomato, { timerLabel: this.state.timerLabel, timer: this.state.timer }),
      React.createElement(Controls, { timerStatus: this.state.timerStatus, controlTimer: this.controlTimer, reset: this.reset }),
      React.createElement(Footer, null),
      React.createElement("audio", { id: "beep", preload: "auto", type: "audio/wav", src: "https://goo.gl/65cBl1",
        ref: audio => this.audioBeep = audio })));
  }}


ReactDOM.render(React.createElement(Pomodoro, null), document.getElementById('PomodoroApp'));