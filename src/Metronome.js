import React, { Component } from 'react';
import logo from './logo.svg';
import './Metronome.css';

class Metronome extends Component {
  render() {
    return (
      <div className="Metronome">
        <header className="Metronome-header">
          <img src={logo} className="Metronome-logo" alt="logo" />
          <p>
            Edit <code>src/Metronome.js</code> and save to reload.
          </p>
          <a
            className="Metronome-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Metronome;
