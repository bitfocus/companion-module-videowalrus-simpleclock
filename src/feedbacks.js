const { combineRgb } = require('@companion-module/base')

function getFeedbacks(self) {
	return {
		'is-running': {
			type: 'boolean',
			name: 'Timer Running',
			description: 'Change button style when the timer is running',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.isRunning === true
			},
		},
		'is-expired': {
			type: 'boolean',
			name: 'Timer Expired',
			description: 'Change button style when the timer has expired',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.isExpired === true
			},
		},
		'is-warning': {
			type: 'boolean',
			name: 'Timer Warning',
			description: 'Change button style when less than 60 seconds remain',
			defaultStyle: {
				bgcolor: combineRgb(255, 150, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.isWarning === true
			},
		},
		'mode-is': {
			type: 'boolean',
			name: 'Mode Is',
			description: 'Change button style when the timer is in a specific mode',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					default: 'countdown',
					choices: [
						{ id: 'clock', label: 'Clock' },
						{ id: 'countdown', label: 'Countdown' },
						{ id: 'finishTime', label: 'Finish Time' },
					],
				},
			],
			callback: (feedback) => {
				return self.state.mode === feedback.options.mode
			},
		},
		'status-is': {
			type: 'boolean',
			name: 'Timer Status Is',
			description: 'Change button style when the timer has a specific status',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					id: 'status',
					label: 'Status',
					default: 'running',
					choices: [
						{ id: 'running', label: 'Running' },
						{ id: 'paused', label: 'Paused' },
						{ id: 'stopped', label: 'Stopped' },
						{ id: 'clock', label: 'Clock' },
					],
				},
			],
			callback: (feedback) => {
				return self.state.status === feedback.options.status
			},
		},
		'message-active': {
			type: 'boolean',
			name: 'Message Active',
			description: 'Change button style when a message is being displayed',
			defaultStyle: {
				bgcolor: combineRgb(180, 0, 180),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.message != null && self.state.message !== ''
			},
		},
	}
}

module.exports = { getFeedbacks }
