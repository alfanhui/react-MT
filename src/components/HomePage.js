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
    this.state = {

    };
  }

  componentWillMount(){

  }

  componentDidUpdate(){

  }

  componentWillUnmount(){

  }

  render(){
    return (
      <div className="content">
              MAIN
      </div>
    );
  }
}

export default HomePage;
