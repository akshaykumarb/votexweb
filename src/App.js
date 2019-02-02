import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import VoxeetConference from './VoxeetConference'

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isSubmit: false,
        users: [
          {id: "111", name: "Benoit", photoURL: "https://cdn.voxeet.com/images/team-benoit-senard.png"},
          {id: "222", name: "Stephane", photoURL: "https://cdn.voxeet.com/images/team-stephane-giraudie.png"},
          {id: "333", name: "Thomas", photoURL: "https://cdn.voxeet.com/images/team-thomas.png"},
          {id: "444", name: "Raphael", photoURL: "https://cdn.voxeet.com/images/team-raphael.png"},
          {id: "555", name: "Julie", photoURL: "https://cdn.voxeet.com/images/team-julie-egglington.png"},
          {id: "666", name: "Alexis", photoURL: "https://cdn.voxeet.com/images/team-alexis.png"},
          {id: "777", name: "Barnabé", photoURL: "https://cdn.voxeet.com/images/team-barnabe.png"},
          {id: "888", name: "Corentin", photoURL: "https://cdn.voxeet.com/images/team-corentin.png"},
          {id: "999", name: "Romain", photoURL: "https://cdn.voxeet.com/images/team-romain.png"}
        ],
        form : {
          conferenceName: "conference_name",
          userName: "Benoit",
          photoURL: "https://cdn.voxeet.com/images/team-benoit-senard.png",
          externalId: "111"
        }
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }

  handleChange(e) {
    const { form } = this.state;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  }

  handleChangeSelect(e) {
    const { form } = this.state;
    form[e.target.name] = e.target.value;
    this.state.users.map((x, i) => {
      if (x.name == e.target.value) {
        form.photoURL = x.photoURL;
        form.externalId = x.id;
      }
    })
    this.setState({ form });
  }

  handleOnLeave() {
    ReactDOM.unmountComponentAtNode(document.getElementById('voxeet-widget'));
    this.setState({ isSubmit: false, form : {conferenceName: "conference_name", userName: "Benoit", photoURL: "https://cdn.voxeet.com/images/team-benoit-senard.png", externalId: "111"}})
    window.location.reload();
  }

  handleClick() {
    this.setState({ isSubmit: true })
  }

  render() {
    if (this.state.isSubmit) {
      return (
        <div>
        <div className="content-sample">
          <div className="logo">
            <img src={logo} className="voxeet-logo" alt="logo" />
          </div>
            <div className="blockInput">
              <div className="block-conference-name">
                <label htmlFor="conferenceName">Conference name</label>
                <input disabled name="conferenceName" value={this.state.form.conferenceName} onChange={this.handleChange} id="conferenceName" />
              </div>
              <div className="block-user-name">
                <label htmlFor="userName">Select a user</label>
                <div className="img-user">
                  <img src={this.state.form.photoURL} />
                </div>
                <select disabled name="userName" onChange={this.handleChangeSelect}>
                  {this.state.users.map((x, i) =>
                    <option key={i} style={{backgroundImage: "url(" + x.photoURL + ")"}}>{x.name}</option>
                  )}
                </select>
              </div>
            </div>
            <div className="blockButton">
              <button className="button-disabled" type="button" disabled onClick={this.handleClick.bind(this)}>
                Start
              </button>
            </div>
        </div>
        <div className="copyright">
          Voxeet © 2018 All rights reserved
        </div>
        <VoxeetConference handleOnLeave={this.handleOnLeave.bind(this)} externalId={this.state.form.externalId} userName={this.state.form.userName} photoURL={this.state.form.photoURL} conferenceName={this.state.form.conferenceName} />
        </div>
      )
    }

    return (
      <div>
      <div className="content-sample">
        <div className="logo">
          <img src={logo} className="voxeet-logo" alt="logo" />
        </div>
          <div className="blockInput">
            <div className="block-conference-name">
              <label htmlFor="conferenceName">Conference name</label>
              <input name="conferenceName" value={this.state.form.conferenceName} onChange={this.handleChange} id="conferenceName" />
            </div>
            <div className="block-user-name">
              <label htmlFor="userName">Select a user</label>
              <div className="img-user">
                <img src={this.state.form.photoURL} />
              </div>
              <select name="userName" onChange={this.handleChangeSelect}>
                {this.state.users.map((x, i) =>
                  <option key={i} style={{backgroundImage: "url(" + x.photoURL + ")"}}>{x.name}</option>
                )}
              </select>
            </div>
          </div>
          <div className="blockButton">
            <button onClick={this.handleClick.bind(this)}>
              Start
            </button>
          </div>
      </div>
      <div className="copyright">
        Voxeet © 2018 All rights reserved
      </div>
      </div>
    );
  }
}

export default App;
