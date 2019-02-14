import React, {
	Component
} from 'react';
// import Phaser from 'phaser';

class Synth extends Component {
	myAudioContext;
	oscillator;
	gainNode;

	lowNote = 261.63; // C4
	highNote = 493.88; // B4

	init() {
		this.myAudioContext = new (window.AudioContext || window.webkitAudioContext);
		this.lowNote = 261.63; // C4
		this.highNote = 493.88; // B4
	}

	playSound = function (event) {
		this.oscillator = this.myAudioContext.createOscillator();
		this.gainNode = this.myAudioContext.createGainNode();

		this.oscillator.type = 'triangle';

		this.gainNode.connect(this.myAudioContext.destination);
		this.oscillator.connect(this.gainNode);

		this.updateFrequency(event);

		this.oscillator.start(0);
	};


	// Stop the audio.
	stopSound = function (event) {
		this.oscillator.stop(0);
	};


	// Calculate the note frequency.
	calculateNote = function (posX) {
		var noteDifference = this.highNote - this.lowNote;
		var noteOffset = (noteDifference / this.myCanvas.offsetWidth) * (posX - this.myCanvas.offsetLeft);
		return this.lowNote + noteOffset;
	};


	// Calculate the volume.
	calculateVolume = function (posY) {
		var volumeLevel = 1 - (((100 / this.myCanvas.offsetHeight) * (posY - this.myCanvas.offsetTop)) / 100);
		return volumeLevel;
	};


	// Fetch the new frequency and volume.
	calculateFrequency = function (x, y) {
		var noteValue = this.calculateNote(x);
		var volumeValue = this.calculateVolume(y);

		this.oscillator.frequency.value = noteValue;
		this.gainNode.gain.value = volumeValue;

		this.frequencyLabel.innerHTML = Math.floor(noteValue) + ' Hz';
		this.volumeLabel.innerHTML = Math.floor(volumeValue * 100) + '%';
	};


	// Update the note frequency.
	updateFrequency = function (event) {
		if (event.type == 'mousedown' || event.type == 'mousemove') {
			this.calculateFrequency(event.x, event.y);
		} else if (event.type == 'touchstart' || event.type == 'touchmove') {
			var touch = event.touches[0];
			this.calculateFrequency(touch.pageX, touch.pageY);
		}
	};

	renderSynth() {

	}

	render() {
		return ( 
			<div className = "Synth" > 
				{this.init()}
				<button onMouseDown={this.playSound} onMouseUp={this.stopSound} />
			</div>
		);
	}
}

export default Synth;
