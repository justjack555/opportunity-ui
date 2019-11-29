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

    fetch('http://localhost:8080/', {
      method: 'GET'
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            oppsLoaded: true,
            opportunities: result.opportunities
          });
        },
        (errorResp) => {
          console.log("Error retrieving opportunities: ", errorResp);
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
        { _.map(this.state.opportunities, (opportunity) => {
          return <div key={ opportunity.id } className="opportunity">{ opportunity.title } </div>
        }) }
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Opportunities />,
  document.getElementById('root')
);
