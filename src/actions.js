function getActions(self) {
	const durationChoices = [
		{ id: 60, label: '1 minute' },
		{ id: 120, label: '2 minutes' },
		{ id: 300, label: '5 minutes' },
		{ id: 600, label: '10 minutes' },
		{ id: 900, label: '15 minutes' },
		{ id: 1200, label: '20 minutes' },
		{ id: 1800, label: '30 minutes' },
		{ id: 2700, label: '45 minutes' },
		{ id: 3600, label: '60 minutes' },
	]

	const adjustChoices = [
		{ id: 1, label: '+1 second' },
		{ id: -1, label: '-1 second' },
		{ id: 30, label: '+30 seconds' },
		{ id: -30, label: '-30 seconds' },
		{ id: 60, label: '+1 minute' },
		{ id: -60, label: '-1 minute' },
		{ id: 300, label: '+5 minutes' },
		{ id: -300, label: '-5 minutes' },
		{ id: 600, label: '+10 minutes' },
		{ id: -600, label: '-10 minutes' },
	]

	const speakerChoices = []
	for (let i = 0; i < 8; i++) {
		const sp = (self.state.speakers || [])[i]
		speakerChoices.push({
			id: i,
			label: sp ? `${i + 1}: ${sp.name} (${sp.minutes}m)` : `Speaker ${i + 1}`,
		})
	}

	const messageChoices = []
	for (let i = 0; i < 8; i++) {
		const msg = (self.state.messages || [])[i]
		messageChoices.push({
			id: i,
			label: msg ? `${i + 1}: ${msg}` : `Message ${i + 1}`,
		})
	}

	return {
		start: {
			name: 'Start',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'start' })
			},
		},
		pause: {
			name: 'Pause',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'pause' })
			},
		},
		toggle: {
			name: 'Start/Pause Toggle',
			options: [],
			callback: () => {
				self.sendCommand({
					command: self.state.isRunning ? 'pause' : 'start',
				})
			},
		},
		reset: {
			name: 'Reset',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'reset' })
			},
		},
		'switch-clock': {
			name: 'Switch to Clock',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'switchToClock' })
			},
		},
		'set-duration': {
			name: 'Set Countdown Duration',
			options: [
				{
					type: 'dropdown',
					id: 'duration',
					label: 'Duration',
					default: 300,
					choices: durationChoices,
				},
			],
			callback: (action) => {
				self.sendCommand({
					command: 'setDuration',
					value: Number(action.options.duration),
				})
			},
		},
		'adjust-time': {
			name: 'Adjust Time',
			options: [
				{
					type: 'dropdown',
					id: 'delta',
					label: 'Adjustment',
					default: 60,
					choices: adjustChoices,
				},
			],
			callback: (action) => {
				self.sendCommand({
					command: 'adjustTime',
					delta: Number(action.options.delta),
				})
			},
		},
		'set-speed': {
			name: 'Set Speed',
			options: [
				{
					type: 'number',
					id: 'speed',
					label: 'Speed',
					default: 1.0,
					min: 0.8,
					max: 1.2,
					step: 0.01,
				},
			],
			callback: (action) => {
				self.sendCommand({
					command: 'setSpeed',
					value: Number(action.options.speed),
				})
			},
		},
		'reset-speed': {
			name: 'Reset Speed to 1x',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'resetSpeed' })
			},
		},
		'load-speaker': {
			name: 'Load Speaker',
			options: [
				{
					type: 'dropdown',
					id: 'index',
					label: 'Speaker',
					default: 0,
					choices: speakerChoices,
				},
			],
			callback: (action) => {
				self.sendCommand({
					command: 'loadSpeaker',
					index: Number(action.options.index),
				})
			},
		},
		'next-speaker': {
			name: 'Next Speaker',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'nextSpeaker' })
			},
		},
		'show-message': {
			name: 'Show Message',
			options: [
				{
					type: 'dropdown',
					id: 'index',
					label: 'Message',
					default: 0,
					choices: messageChoices,
				},
			],
			callback: (action) => {
				self.sendCommand({
					command: 'showMessage',
					index: Number(action.options.index),
				})
			},
		},
		'dismiss-message': {
			name: 'Dismiss Message',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'dismissMessage' })
			},
		},
		'blank-outputs': {
			name: 'Blank Outputs (external display, NDI, web)',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'blankOutputs' })
			},
		},
		'show-outputs': {
			name: 'Show Outputs',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'showOutputs' })
			},
		},
		'toggle-blank-outputs': {
			name: 'Toggle Blank Outputs',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'toggleBlankOutputs' })
			},
		},
	}
}

module.exports = { getActions }
