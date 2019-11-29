import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from 'underscore';

class Opportunities extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      oppsLoaded: false,
      opportunities: []
    };
  }

  componentDidMount(){
    if(this.state.oppsLoaded) return;

    console.log("fetching opps...");
    fetch('http://localhost:8080/', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'localhost',
      }
    })
      .then(res => {
        res.json()
      })
      .then(
        (result) => {
          console.log("Result: ", result);
          this.setState({
            oppsLoaded: true,
            opportunities: result
          });
        },
        (errorResp) => {
          console.log("Error retrieving opportunities: ", errorResp.err);
        }
      )
  }

  render() {
    return (
      <div className="opportunities">
        <h1>Opportunities</h1>
        { this.renderOpportunities() }
      </div>
    );
  }

  renderOpportunities = () => {
    return (
      <div className="opportunities-wrapper">
        { _.each(this.state.opportunities, (opportunity) => {
          return <div className="opportunity">{ opportunity.title } </div>
        })}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Opportunities />,
  document.getElementById('root')
);
