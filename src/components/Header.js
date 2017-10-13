import React from 'react';
import {Link} from 'react-router-dom'
//import {Head} from 'react-materialize';


class React_Header extends React.Component{
  render(){
    return (
    <header className="head" id="head">
      <div className="head1"/>
      <div className="head3">
        <img src="../react_favicon.png" alt="Powered by React" height="50" width="50" style={{paddingRight:'20px'}}/>
        <span className={"h2"}> React MT </span>
        <span className={"h2"} style={{color:'#DE1A1A', fontWeight:500, paddingLeft: '20px'}}>p</span>
        <span className={"h2"} style={{color:'#CB1ADE', fontWeight:500}}>a</span>
        <span className={"h2"} style={{color:'#681ADE', fontWeight:500}}>i</span>
        <span className={"h2"} style={{color:'#1A38DE', fontWeight:500}}>n</span>
        <span className={"h2"} style={{color:'#1A6CDE', fontWeight:500}}>t</span>
      </div>
      <div className="head1"/>
    </header>
);
 }
}
export default React_Header;
