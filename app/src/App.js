import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

const api = axios.create({
  baseURL: 'https://us-central1-react-firebase-contatos.cloudfunctions.net/', 
  timeout: 999999999,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});

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
    axios.get('/services-get')
      .then(result => {
        this.setState({ contatos : result.data })
      })
  }

  get contatos() {
    const { contatos } = this.state;
    return (
      <div>
        { contatos.map( contato => (<p>{contato}</p>) ) }
      </div>
    )
  }

  handleChange(evt) {
    this.setState({ contato : evt.target.value })
  }

  saveContato = () => {

    const { contato } = this.state;
    
    api.post(`/services-save`, { name : contato })
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
