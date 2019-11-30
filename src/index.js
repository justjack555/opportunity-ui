import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from 'underscore';

import NewOpportunityModal from './components/new-opportunity-modal';

class Opportunities extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      oppsLoaded: false,
      opportunities: [],
      showNewOppModal: false
    };
  }

  componentDidMount(){
    if(this.state.oppsLoaded) return <NewOpportunityModal />;

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
    if(this.state.showNewOppModal){
      return (
        <NewOpportunityModal 
          closeModal={ this.closeModal }
        />
      );
    } 
    return (
      <div className="opportunities">
        <h1>Opportunities</h1>
        { this.renderOpportunities() }
        { this.renderAddOpportunityButton() }
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

  renderAddOpportunityButton = () => {
    return (
      <div className="opportunity-button">
        <button onClick={ this.openNewOppModal }>Add Opportunity</button>
      </div>
    );
  }

  openNewOppModal = () => {
    this.setState({
      showNewOppModal: true      
    });
  }

  closeModal = () => {
    this.setState({ showNewOppModal: false });
  }
}

// ========================================

ReactDOM.render(
  <Opportunities />,
  document.getElementById('root')
);
