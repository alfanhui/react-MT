import React from 'react';
import {Link} from 'react-router-dom'
//import {Head} from 'react-materialize';


class React_Header extends React.Component{
  render(){
    return (
    <header className="head">
      <div className="head1"/>
      <div className="head3">
        <img src="../react_favicon.png" alt="Powered by React" height="50" width="50" style={{paddingRight:'20px'}}/>
        <span className={"h2"}> React MT </span>
      </div>
      <div className="head1"/>
    </header>
);
 }
}
export default React_Header;
