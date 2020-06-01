import React, { Component } from 'react'

export default class AudioPlayer extends Component {
  render() {
    return (
      <div id="popup-template" class="audio-popup">
        <h2>{this.props.name}</h2>
        <span>{this.props.description}</span>
        <audio src={this.props.audioUrl} controls ></audio>
      </div>
    )
  }
}