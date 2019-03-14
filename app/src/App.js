import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contato : ''
    }
  }

  get contatos() {
    return (
      <div>
        <p>CONTATO 01</p>
        <p>CONTATO 01</p>
        <p>CONTATO 01</p>
        <p>CONTATO 01</p>
        <p>CONTATO 01</p>
      </div>
    )
  }

  saveContato() {
    console.log("Salvando contato...")
  }

  handleChange(evt) {
    this.setState({ contato : evt.target.value })
  }

  saveContato = () => {

    const { contato } = this.state;
    console.log({ name : contato })
    axios.post(`http://localhost:8080/contacts`, { name : contato }, { method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin' })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <code> Adicione contatos </code>
          <input type="text" style={{ 
            paddingTop : 10,
            paddingBottom : 10,
            paddingLeft: 30,
            paddingRight: 30,
            marginBottom: 10,
            marginTop: 10
           }}
           value={this.state.contato} onChange={this.handleChange.bind(this)}
           />
          <a
            className="App-link"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => this.saveContato()}            
            target="_blank"
            rel="noopener noreferrer"
          >
            Salvar
          </a>
          {this.contatos}
        </header>
      </div>
    );
  }
}

export default App;
