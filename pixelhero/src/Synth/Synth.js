import React, {
	Component
} from 'react';
import './App.css';
import Phaser from 'phaser';

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
		oscillator = myAudioContext.createOscillator();
		gainNode = myAudioContext.createGainNode();

		oscillator.type = 'triangle';

		gainNode.connect(myAudioContext.destination);
		oscillator.connect(gainNode);

		SynthPad.updateFrequency(event);

		oscillator.start(0);
	};


	// Stop the audio.
	stopSound = function (event) {
		oscillator.stop(0);
	};


	// Calculate the note frequency.
	calculateNote = function (posX) {
		var noteDifference = highNote - lowNote;
		var noteOffset = (noteDifference / myCanvas.offsetWidth) * (posX - myCanvas.offsetLeft);
		return lowNote + noteOffset;
	};


	// Calculate the volume.
	calculateVolume = function (posY) {
		var volumeLevel = 1 - (((100 / myCanvas.offsetHeight) * (posY - myCanvas.offsetTop)) / 100);
		return volumeLevel;
	};


	// Fetch the new frequency and volume.
	calculateFrequency = function (x, y) {
		var noteValue = SynthPad.calculateNote(x);
		var volumeValue = SynthPad.calculateVolume(y);

		oscillator.frequency.value = noteValue;
		gainNode.gain.value = volumeValue;

		frequencyLabel.innerHTML = Math.floor(noteValue) + ' Hz';
		volumeLabel.innerHTML = Math.floor(volumeValue * 100) + '%';
	};


	// Update the note frequency.
	updateFrequency = function (event) {
		if (event.type == 'mousedown' || event.type == 'mousemove') {
			SynthPad.calculateFrequency(event.x, event.y);
		} else if (event.type == 'touchstart' || event.type == 'touchmove') {
			var touch = event.touches[0];
			SynthPad.calculateFrequency(touch.pageX, touch.pageY);
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



var SynthPad = (function () {


	// Constructor
	var SynthPad = function () {
		myCanvas = document.getElementById('synth-pad');
		frequencyLabel = document.getElementById('frequency');
		volumeLabel = document.getElementById('volume');

		// Create an audio context.
		myAudioContext = new webkitAudioContext();

		SynthPad.setupEventListeners();
	};


	// Event Listeners
	SynthPad.setupEventListeners = function () {

		// Disables scrolling on touch devices.
		document.body.addEventListener('touchmove', function (event) {
			event.preventDefault();
		}, false);

		myCanvas.addEventListener('mousedown', SynthPad.playSound);
		myCanvas.addEventListener('touchstart', SynthPad.playSound);

		myCanvas.addEventListener('mouseup', SynthPad.stopSound);
		document.addEventListener('mouseleave', SynthPad.stopSound);
		myCanvas.addEventListener('touchend', SynthPad.stopSound);
	};


	// Play a note.
	


	// Export SynthPad.
	return SynthPad;
})();
