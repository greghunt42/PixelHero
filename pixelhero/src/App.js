import React, { Component } from 'react';
import './App.css';
import Phaser from 'phaser';
import Synth from "./Synth/Synth"

class App extends Component {
  config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload: this.preload,
		create: this.create,
		update: this.update
	}
  };

  game;

  init() {
  	this.game = new Phaser.Game(this.config);
  }

  preload() {
  	this.load.image('sky', 'assets/sky.png');
  	this.load.image('ground', 'assets/platform.png');
  	this.load.image('star', 'assets/star.png');
  	this.load.image('bomb', 'assets/bomb.png');
  	this.load.spritesheet('dude', 
  		'assets/dude.png',
  		{ frameWidth: 32, frameHeight: 48 }
  	);
  }

  create() {
  	this.add.image(400, 300, 'sky');
  	this.add.image(400, 300, 'star');
  }

  update() {

  }

  renderSynth() {

  }

  render() {
  	return (
  		<div className="App">
  			<Synth/>
  		</div>
  	);
  }
}

export default App;
