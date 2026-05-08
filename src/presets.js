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

	return presets
}

module.exports = { getPresets }
