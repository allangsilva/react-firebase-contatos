import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contato : '',
      contatos: []
    }
  }

  componentWillMount(){
    
    this.getContatos();
  }

  getContatos() {
    axios.get('https://us-central1-react-firebase-contatos.cloudfunctions.net/services-get')
      .then(result => {
        this.setState({ contatos : result.data })
      })
  }

  get contatos() {
    const { contatos } = this.state;
    return (
      <div>
        { contatos.map( contato => (<p key={Math.random()}>{contato.name}</p>) ) }
      </div>
    )
  }

  handleChange(evt) {
    this.setState({ contato : evt.target.value })
  }

  saveContato = () => {
    const { contato } = this.state;
    axios.post(`https://us-central1-react-firebase-contatos.cloudfunctions.net/services-save`, { name : contato })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getContatos();
      })
      .catch(err => {
        alert('Erro ao salvar contato')
        console.log(err)
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
          <button
            className="App-link"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => this.saveContato()}            
            target="_blank"
            rel="noopener noreferrer"
          >
            Salvar
          </button>
          {this.contatos}
        </header>
      </div>
    );
  }
}

export default App;
