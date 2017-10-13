import React from 'react';
import { connect } from "react-redux";

@connect((store) => {
  return {
    state: store.generalReducer
  };
})

class HomePage extends React.Component{


  constructor(props) {
    super(props);
    this._swipe = {};
    this.possHexValue = "0123456789ABCDEF";
    this.minDistance = 50;
    this.state = {
      log:"",
      swiped: false,
      currentTouches: [],
      ctx: undefined,
    };
  }

  componentWillMount(){

  }

  componentDidMount(){
    let $ctx = this.refs.canvas.getContext('2d')
    let currentTouches;
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      currentTouches = ["MOBILE"];
    }else{
      currentTouches = ["DESKTOP"];
    }
    let h = ((document.getElementById('head').clientHeight + document.getElementById('log').clientHeight + document.getElementById('foot').clientHeight) * 2);
    $ctx.canvas.width  = (window.innerWidth * .99);
    $ctx.canvas.height = (window.innerHeight - h);
    this.setState({ctx: $ctx, log: currentTouches});
  }

  componentDidUpdate(){
    //this.ctx = this.refs.canvas.getContext('2d'); //?
  }

  componentWillUnmount(){

  }

  // Returns a random color from an array.
  randomColour(){
    let hex = "#";
    for (var i = 0; i < 6; i++){
      hex += this.possHexValue.charAt(Math.floor(Math.random() * this.possHexValue.length));
    }
    console.log(hex);
    return hex;
  }

  randomColourAlpha(){ //alpha causes issues when direction changes
    let array = [];
    for(let i = 0; i<3; i++){
      array.push(Math.floor(Math.random() * 256));
    }
    array.push(Math.random()); //alpha
    return ("rgba("+array[0]+", "+ array[1]+", "+array[2]+", "+ array[3]+")");
  }

  // Finds the array index of a touch in the currentTouches array.
  findCurrentTouchIndex(id){
    for (let i=0; i < this.state.currentTouches.length; i++) {
      if (this.state.currentTouches[i].id === id) {
        return i;
      }
    }
    // Touch not found! Return -1.
    return -1;
  }

  touchStart = (event) => {
    event.stopPropagation();
    this.setState({log : "touchStart"});
    let touches = event.changedTouches;
    for (let i=0; i < touches.length; i++) {
      let touch = touches[i];
      let touchColor = this.randomColour();

      //adjust for mouse/canvas positioning
      let rect = this.refs.canvas.getBoundingClientRect(),
      x = touch.pageX - rect.left,
      y = touch.pageY - rect.top;

      console.log("[",x,":",y,"]");

      let $currentTouches = this.state.currentTouches;
      $currentTouches.push({
        id: touch.identifier,
        pageX: x,
        pageY: y,
        color: touchColor
      });

      let $ctx = this.refs.canvas.getContext('2d');
      $ctx.beginPath();
      $ctx.arc(x, y, 2.5, Math.PI*2, false);
      $ctx.fillStyle = touchColor;
      $ctx.lineJoin = "round";
      $ctx.lineWidth = 40;
      $ctx.fill();
      $ctx.closePath();
      this.setState({currentTouches: $currentTouches, ctx:$ctx});
    }
  }



  touchMove = (event) => {
    event.stopPropagation();
    this.setState({log : "touchMove"});
    let touches = event.changedTouches;
    for (let i=0; i < touches.length; i++) {
      let touch = touches[i];
      let currentTouchIndex = this.findCurrentTouchIndex(touch.identifier); //lodash?
      if (currentTouchIndex >= 0) {
        let currentTouch = this.state.currentTouches[currentTouchIndex];

        //adjust for mouse/canvas positioning
        let rect = this.refs.canvas.getBoundingClientRect(),
        x = touch.pageX - rect.left,
        y = touch.pageY - rect.top;
        //console.log("rect:", rect.left, ":", rect.top, " touch:", touch.pageX, ":", touch.pageY )
        console.log("[",x,":",y,"]");
        let $ctx = this.refs.canvas.getContext('2d');
        $ctx.beginPath();
        $ctx.moveTo(currentTouch.pageX, currentTouch.pageY);
        $ctx.lineTo(x, y);
        //$ctx.lineCap = "round";
        $ctx.lineWidth = 40;
        $ctx.strokeStyle = currentTouch.color;
        $ctx.stroke();
        $ctx.closePath();

        // Update the touch record.
        currentTouch.pageX = x;
        currentTouch.pageY = y;

        // Store the record.
        let $currentTouches = this.state.currentTouches;
        $currentTouches.splice(currentTouchIndex, 1, currentTouch);
        this.setState({ctx: $ctx, currentTouches: $currentTouches});
      } else {
        console.log('Touch was not found!');
      }
    }
  }


  touchEnd = (event) => {
    event.stopPropagation();
    let touches = event.changedTouches;
    for (let i=0; i < touches.length; i++) {
      let touch = touches[i];
      let currentTouchIndex = this.findCurrentTouchIndex(touch.identifier);
      if (currentTouchIndex >= 0) {
        let currentTouch = this.state.currentTouches[currentTouchIndex];

        //adjust for mouse/canvas positioning
        let rect = this.refs.canvas.getBoundingClientRect(),
        x = touch.pageX - rect.left,
        y = touch.pageY - rect.top;
        console.log("[",x,":",y,"]");

        let $ctx = this.refs.canvas.getContext('2d');
        $ctx.beginPath();
        $ctx.moveTo(currentTouch.pageX, currentTouch.pageY);
        $ctx.lineTo(x, y);
        $ctx.lineCap = "round";
        $ctx.lineWidth = 40;
        $ctx.strokeStyle = currentTouch.color;
        $ctx.closePath();
        $ctx.stroke();

        // Remove the record.
        let $currentTouches = this.state.currentTouches;
        $currentTouches.splice(currentTouchIndex, 1);

        this.setState({ctx:$ctx, currentTouches: $currentTouches});
      } else {
        console.log('Touch was not found!');
      }
    }
  }

  touchCancel = (event) => {
    event.stopPropagation();
    let touches = event.changedTouches;

    for (let i=0; i < touches.length; i++) {
      let currentTouchIndex = this.findCurrentTouchIndex(touches[i].identifier);

      if (currentTouchIndex >= 0) {
        // Remove the touch record.
        let $currentTouches = this.state.currentTouches;
        $currentTouches.splice(currentTouchIndex, 1);
        this.setState({currentTouches: $currentTouches});
      } else {
        console.log('Touch was not found!');
      }
    }
  }

  printTouches(){
    let tempArray = this.state.currentTouches;
    tempArray = tempArray.map((obj) =>{
      return("[" + obj.id.toString() + "] " + (parseInt(obj.pageX.toString())) + " : " + (parseInt(obj.pageY.toString())));
    })
    return (
      <code>Touches: {tempArray.toString()}</code>
    )
  }

  render(){
    return (
      <div id="test" className="content" >
      <div>
      <canvas
      className="canvas"
      ref="canvas"
      onTouchStart={(event)=>this.touchStart(event)}
      onTouchMove={(event)=>this.touchMove(event)}
      onTouchEnd={(event)=>this.touchEnd(event)}
      onTouchCancel={(event)=>this.touchCancel(event)}
      >
      This Browser does not support html canvas.
      </canvas>
      </div>
      <div id="log" style={{flex:1, flexDirection:'column', float:'left', paddingLeft: '20px'}}>
      <div  style={{display: 'flex', flex:"1 1 100%", flexDirection:'row'}}>
      <code>Log: {this.state.log} </code>
      </div>
      <div style={{display: 'flex', flex:"1 1 100%", flexDirection:'row'}}>
      {this.printTouches()}
      </div>
      </div>
      </div>
    );
  }
}

export default HomePage;



/*

_onTouchStart(e) {
e.stopPropagation();
this.setState({log : "touchStart"});
const touch = e.touches[0];
this._swipe = { x: touch.clientX };
this.setState({ swiped: false });
}

_onTouchMove(e){
e.stopPropagation();
this.setState({log : "touchMove"});
if (e.changedTouches && e.changedTouches.length) {
const touch = e.changedTouches[0];
this._swipe.swiping = true;
}
}

_onTouchEnd(e) {
e.stopPropagation();
this.setState({log : "touchEnd"});
const touch = e.changedTouches[0];
const absX = Math.abs(touch.clientX - this._swipe.x);
if (this._swipe.swiping && absX > this.minDistance ) {
this.props.onSwiped && this.props.onSwiped();
this.setState({ swiped: true });
}
this._swipe = {};
}








*/
