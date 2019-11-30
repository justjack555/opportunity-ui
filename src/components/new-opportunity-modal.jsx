import React from 'react';
import '../styles/new-opportunity-modal.css';

export default class NewOpportunityModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      newOppName: ''
    };
  }

  render() { 
    return (
      <div className="new-opportunity">
        <h1>Add Opportunity</h1>
        { this.renderOpportunityForm() }
        { this.renderButtons() }
      </div>
    );
  }

  renderOpportunityForm = () => {
    return (
      <div className="new-opportunity-wrapper">
        <form onSubmit={ this.submitNewOpp }>
        <label>
          Opportunity Name:
          <input 
              type="text"
              value={ this.state.newOppName }
              onChange={ this.handleNameChange } />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    );
  }

  handleNameChange = (e) => {
    this.setState({
      newOppName: e.target.value
    });
  }

  submitNewOpp = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        opportunityName: this.state.newOppName
      }) 
    })
      // .then(res => {
      //   return res.json();
      // })
      // .then(
      //   (result) => {
      //     this.setState({
      //       oppsLoaded: true,
      //       opportunities: result.opportunities
      //     });
      //   },
      //   (errorResp) => {
      //     console.log("Error retrieving opportunities: ", errorResp);
      //   }
      // )
  }

  renderButtons = () => {
    return (
      <div className="buttons-wrapper">
        <button onClick={ this.props.closeModal }>Close</button>
      </div>
    );
  }
}