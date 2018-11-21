import React, { Component } from 'react';
import './Metronome.css';
import {
  ACCENT_SOUND_1,
  ACCENT_SOUND_2,
  ACCENT_SOUND_3,
  BASE_SOUND_1,
  BASE_SOUND_2,
  BASE_SOUND_3
} from '../constants/SoundFileConstants.js';

class Metronome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bpm: 100,
      playing: false,
      beatsPerMeasure: 4,
      baseSound: new Audio(BASE_SOUND_1),
      accentSound: new Audio(ACCENT_SOUND_1),
      timeSignature: '4/4'
    }
  }

  togglePlay = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({playing: false});
    } else {
      // play a click depending on beats per minute
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }
  };

  updateBpm = e => {
    const bpm = e.target.value;
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        bpm,
        count: 0
      });
    } else {
      this.setState({bpm});
    }
  }

  playClick = (first = false) => {
    // play a different sound on beginning of each measure
    if (this.state.count % this.state.beatsPerMeasure === 0) {
      this.state.accentSound.play();
    } else {
      this.state.baseSound.play();
    }
    const updatedCount = (this.state.count + 1) % this.state.beatsPerMeasure;
    this.setState({count: updatedCount});
  }

  changeBaseSound = e => {
    const newSound = e.target.value;
    switch (newSound) {
      case ('wood block 1'): {
        this.setState({
          baseSound: new Audio(BASE_SOUND_1)
        });
        break;
      }
      case ('wood block 2'): {
        this.setState({
          baseSound: new Audio(BASE_SOUND_2)
        });
        break;
      }
      case ('wood block 3'): {
        this.setState({
          baseSound: new Audio(BASE_SOUND_3)
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  changeAccentSound = e => {
    const newSound = e.target.value;
    switch (newSound) {
      case ('accent wood block 1'): {
        this.setState({
          accentSound: new Audio(ACCENT_SOUND_1)
        });
        break;
      }
      case ('accent wood block 2'): {
        this.setState({
          accentSound: new Audio(ACCENT_SOUND_2)
        });
        break;
      }
      case ('accent wood block 3'): {
        this.setState({
          accentSound: new Audio(ACCENT_SOUND_3)
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  setTime = timeSignature => {
    this.setState({
      beatsPerMeasure: timeSignature
    });
    if (timeSignature === 6) {
      this.setState({
        timeSignature: '6/8'
      });
    } else {
      this.setState({
        timeSignature: `${timeSignature} / 4`
      });
    }
  }

  render() {
    return (
      <div className="metronome">
        <h1>Custom Metronome</h1>
        <div className="options">
          <div>Current BPM: {this.state.bpm}</div>
          <div className="bpm-slider">
            <input
              type="range"
              min="40"
              max="208"
              value={this.state.bpm}
              onChange={this.updateBpm} 
              />
          </div>
          <br />
          <div>
            Current Time Signature: {this.state.timeSignature}
          </div>
          <div className="timeSignature">
            <button onClick={e => this.setTime(4)}> 4/4 </button>
            <button onClick={e => this.setTime(2)}> 2/4 </button>
            <button onClick={e => this.setTime(3)}> 3/4 </button>
            <button onClick={e => this.setTime(6)}> 6/8 </button>
          </div>
          <br />
          <div>
            Customize Sounds:
          </div>
          <div className="sounds">
            <span>Base sound:</span>
            <select onChange={e => this.changeBaseSound(e)}>
              <option>wood block 1</option>
              <option>wood block 2</option>
              <option>wood block 3</option>
            </select>
            <span>Accent sound:</span>
            <select onChange={e => this.changeAccentSound(e)}>
              <option>accent wood block 1</option>
              <option>accent wood block 2</option>
              <option>accent wood block 3</option>
            </select>
          </div>
        </div>
        <button onClick={this.togglePlay}>{this.state.playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;
