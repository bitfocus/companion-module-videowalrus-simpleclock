const { combineRgb } = require('@companion-module/base')

function getPresets() {
	const presets = {}
	const WHITE = combineRgb(255, 255, 255)
	const BLACK = combineRgb(0, 0, 0)
	const GREEN = combineRgb(0, 180, 0)
	const RED = combineRgb(255, 0, 0)
	const ORANGE = combineRgb(255, 150, 0)
	const BLUE = combineRgb(0, 100, 255)
	const PURPLE = combineRgb(180, 0, 180)
	const DARK_GRAY = combineRgb(40, 40, 40)

	// ── Transport ──

	presets['start-pause'] = {
		type: 'button',
		category: 'Transport',
		name: 'Start/Pause Toggle',
		style: {
			text: '$(videowalrus-simpleclock:display_time)',
			size: '18',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [{ actionId: 'toggle' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'is-running',
				style: { bgcolor: GREEN, color: WHITE },
			},
			{
				feedbackId: 'is-expired',
				style: { bgcolor: RED, color: WHITE },
			},
			{
				feedbackId: 'is-warning',
				style: { bgcolor: ORANGE, color: WHITE },
			},
		],
	}

	presets['reset'] = {
		type: 'button',
		category: 'Transport',
		name: 'Reset',
		style: {
			text: 'RESET',
			size: '18',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [{ actionId: 'reset' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['clock-mode'] = {
		type: 'button',
		category: 'Transport',
		name: 'Clock Mode',
		style: {
			text: 'CLOCK',
			size: '18',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [{ actionId: 'switch-clock' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mode-is',
				options: { mode: 'clock' },
				style: { bgcolor: BLUE, color: WHITE },
			},
		],
	}

	// ── Status ──

	presets['display-time'] = {
		type: 'button',
		category: 'Status',
		name: 'Display Time',
		style: {
			text: '$(videowalrus-simpleclock:display_time)',
			size: '18',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [{ down: [], up: [] }],
		feedbacks: [
			{
				feedbackId: 'is-expired',
				style: { bgcolor: RED, color: WHITE },
			},
			{
				feedbackId: 'is-warning',
				style: { bgcolor: ORANGE, color: WHITE },
			},
		],
	}

	// ── Quick Durations ──

	const durations = [
		['1m', 60],
		['2m', 120],
		['5m', 300],
		['10m', 600],
		['15m', 900],
		['30m', 1800],
		['60m', 3600],
	]

	for (const [label, seconds] of durations) {
		presets[`duration-${label}`] = {
			type: 'button',
			category: 'Quick Countdown',
			name: `${label} Countdown`,
			style: {
				text: label,
				size: '18',
				color: WHITE,
				bgcolor: DARK_GRAY,
			},
			steps: [
				{
					down: [{ actionId: 'set-duration', options: { duration: seconds } }],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// ── Speed ──

	presets['reset-speed'] = {
		type: 'button',
		category: 'Speed',
		name: 'Reset Speed',
		style: {
			text: 'SPD\\n$(videowalrus-simpleclock:speed)',
			size: '14',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [{ actionId: 'reset-speed' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ── Speakers ──

	for (let i = 0; i < 8; i++) {
		const n = i + 1
		presets[`speaker-${n}`] = {
			type: 'button',
			category: 'Speakers',
			name: `Speaker ${n}`,
			style: {
				text: `$(videowalrus-simpleclock:speaker_${n}_name)\\n$(videowalrus-simpleclock:speaker_${n}_duration)`,
				size: 'auto',
				color: WHITE,
				bgcolor: BLACK,
			},
			steps: [
				{
					down: [{ actionId: 'load-speaker', options: { index: i } }],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	presets['next-speaker'] = {
		type: 'button',
		category: 'Speakers',
		name: 'Next Speaker',
		style: {
			text: 'NEXT\\nSPEAKER',
			size: '14',
			color: WHITE,
			bgcolor: DARK_GRAY,
		},
		steps: [
			{
				down: [{ actionId: 'next-speaker' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ── Messages ──

	for (let i = 0; i < 4; i++) {
		const n = i + 1
		presets[`message-${n}`] = {
			type: 'button',
			category: 'Messages',
			name: `Message ${n}`,
			style: {
				text: `$(videowalrus-simpleclock:message_${n}_text)`,
				size: 'auto',
				color: WHITE,
				bgcolor: combineRgb(60, 0, 60),
			},
			steps: [
				{
					down: [{ actionId: 'show-message', options: { index: i } }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'message-active',
					style: { bgcolor: PURPLE, color: WHITE },
				},
			],
		}
	}

	presets['dismiss-message'] = {
		type: 'button',
		category: 'Messages',
		name: 'Dismiss Message',
		style: {
			text: 'DISMISS\\nMSG',
			size: '14',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [{ actionId: 'dismiss-message' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ── Outputs ──

	presets['blank-outputs'] = {
		type: 'button',
		category: 'Outputs',
		name: 'Blank Outputs (toggle)',
		style: {
			text: 'BLANK\\nOUTPUTS',
			size: '14',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [{ actionId: 'toggle-blank-outputs' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'outputs-blanked',
				style: { text: 'OUTPUTS\\nBLANKED', bgcolor: RED, color: WHITE },
			},
		],
	}

	// ── Adjust Time ──

	const adjustments = [
		['+30s', 30],
		['-30s', -30],
		['+1m', 60],
		['-1m', -60],
		['+5m', 300],
		['-5m', -300],
		['+10m', 600],
		['-10m', -600],
	]

	for (const [label, delta] of adjustments) {
		const sign = delta > 0 ? '+' : '−'
		const magnitude = label.replace(/^[+-]/, '')
		presets[`adjust-${label}`] = {
			type: 'button',
			category: 'Adjust Time',
			name: `${label}`,
			style: {
				text: `${sign}\\n${magnitude}`,
				size: '18',
				color: WHITE,
				bgcolor: delta > 0 ? combineRgb(0, 80, 0) : combineRgb(80, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'adjust-time', options: { delta } }],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	// ── Speed ±5% ──

	presets['speed-plus-5'] = {
		type: 'button',
		category: 'Speed',
		name: 'Speed +5%',
		style: {
			text: 'SPD\\n+5%',
			size: '14',
			color: WHITE,
			bgcolor: combineRgb(0, 60, 100),
		},
		steps: [
			{
				down: [{ actionId: 'set-speed', options: { speed: 1.05 } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['speed-minus-5'] = {
		type: 'button',
		category: 'Speed',
		name: 'Speed -5%',
		style: {
			text: 'SPD\\n-5%',
			size: '14',
			color: WHITE,
			bgcolor: combineRgb(0, 60, 100),
		},
		steps: [
			{
				down: [{ actionId: 'set-speed', options: { speed: 0.95 } }],
				up: [],
			},
		],
		feedbacks: [],
	}

	// ── Transport extras ──

	presets['start'] = {
		type: 'button',
		category: 'Transport',
		name: 'Start',
		style: { text: 'START', size: '18', color: WHITE, bgcolor: BLACK },
		steps: [{ down: [{ actionId: 'start' }], up: [] }],
		feedbacks: [
			{ feedbackId: 'is-running', style: { bgcolor: GREEN, color: WHITE } },
		],
	}

	presets['pause'] = {
		type: 'button',
		category: 'Transport',
		name: 'Pause',
		style: { text: 'PAUSE', size: '18', color: WHITE, bgcolor: BLACK },
		steps: [{ down: [{ actionId: 'pause' }], up: [] }],
		feedbacks: [
			{
				feedbackId: 'status-is',
				options: { status: 'paused' },
				style: { bgcolor: ORANGE, color: WHITE },
			},
		],
	}

	// ── Mode buttons ──

	presets['mode-countdown'] = {
		type: 'button',
		category: 'Transport',
		name: 'Mode: Countdown',
		style: { text: 'COUNT\\nDOWN', size: '14', color: WHITE, bgcolor: BLACK },
		steps: [
			{ down: [{ actionId: 'set-duration', options: { duration: 300 } }], up: [] },
		],
		feedbacks: [
			{
				feedbackId: 'mode-is',
				options: { mode: 'countdown' },
				style: { bgcolor: BLUE, color: WHITE },
			},
		],
	}

	return presets
}

module.exports = { getPresets }
