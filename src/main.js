const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const WebSocket = require('ws')
const { getActions } = require('./actions')
const { getFeedbacks } = require('./feedbacks')
const { getPresets } = require('./presets')
const { getVariables } = require('./variables')
const { UpgradeScripts } = require('./upgrades')

class SimpleClockInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.ws = null
		this.reconnectTimer = null
		this.state = {
			mode: 'clock',
			display: '--:--:--',
			remaining: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			status: 'clock',
			isRunning: false,
			speed: 1.0,
			isExpired: false,
			isWarning: false,
			message: null,
			messageProgress: 0,
			messageThrob: false,
			blanked: false,
			speakers: [],
			messages: [],
			activeSpeakerIndex: -1,
		}
	}

	async init(config) {
		this.config = config
		this.setActionDefinitions(getActions(this))
		this.setFeedbackDefinitions(getFeedbacks(this))
		this.setPresetDefinitions(getPresets())
		this.setVariableDefinitions(getVariables())
		this.updateVariables()
		this.initWebSocket()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Host',
				default: '127.0.0.1',
				width: 8,
			},
			{
				type: 'number',
				id: 'port',
				label: 'Port',
				default: 9090,
				min: 1,
				max: 65535,
				width: 4,
			},
		]
	}

	async configUpdated(config) {
		this.config = config
		this.initWebSocket()
	}

	initWebSocket() {
		this.closeWebSocket()

		if (!this.config.host || !this.config.port) {
			this.updateStatus(InstanceStatus.BadConfig)
			return
		}

		this.updateStatus(InstanceStatus.Connecting)

		const url = `ws://${this.config.host}:${this.config.port}`
		this.ws = new WebSocket(url)

		this.ws.on('open', () => {
			this.updateStatus(InstanceStatus.Ok)
			this.log('debug', `Connected to SimpleClock at ${url}`)
		})

		this.ws.on('message', (raw) => {
			try {
				const msg = JSON.parse(raw.toString())
				if (msg.state) {
					this.state = { ...this.state, ...msg.state }
					this.checkFeedbacks('is-running', 'is-expired', 'is-warning', 'mode-is', 'status-is', 'message-active', 'message-throbbing', 'outputs-blanked')
					this.updateVariables()
					// Refresh action definitions so speaker/message dropdowns update
					this.setActionDefinitions(getActions(this))
				}
			} catch (e) {
				this.log('warn', `Failed to parse message: ${e.message}`)
			}
		})

		this.ws.on('close', () => {
			this.updateStatus(InstanceStatus.Disconnected)
			this.scheduleReconnect()
		})

		this.ws.on('error', (err) => {
			this.log('error', `WebSocket error: ${err.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure)
			this.ws.close()
		})
	}

	scheduleReconnect() {
		if (this.reconnectTimer) return
		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null
			this.initWebSocket()
		}, 5000)
	}

	closeWebSocket() {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}
		if (this.ws) {
			this.ws.removeAllListeners()
			this.ws.close()
			this.ws = null
		}
	}

	sendCommand(cmd) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(cmd))
		} else {
			this.log('warn', 'Cannot send command — not connected')
		}
	}

	updateVariables() {
		const s = this.state
		const values = {
			display_time: s.display || '--:--:--',
			mode: s.mode || 'clock',
			remaining: s.remaining != null ? String(Math.floor(s.remaining)) : '0',
			hours: s.hours != null ? String(s.hours) : '0',
			minutes: s.minutes != null ? String(s.minutes) : '0',
			seconds: s.seconds != null ? String(s.seconds) : '0',
			status: s.status || 'clock',
			speed: s.speed != null ? s.speed.toFixed(2) : '1.00',
			is_running: s.isRunning ? 'Yes' : 'No',
			is_expired: s.isExpired ? 'Yes' : 'No',
			is_warning: s.isWarning ? 'Yes' : 'No',
			active_message: s.message || '',
			message_progress: s.messageProgress != null ? Math.round(s.messageProgress * 100) + '%' : '0%',
			message_throbbing: s.messageThrob ? 'Yes' : 'No',
			outputs_blanked: s.blanked ? 'Yes' : 'No',
			active_speaker_index: s.activeSpeakerIndex >= 0 ? String(s.activeSpeakerIndex + 1) : 'None',
		}

		const speakers = s.speakers || []
		for (let i = 0; i < 8; i++) {
			const sp = speakers[i]
			values[`speaker_${i + 1}_name`] = sp ? sp.name : ''
			values[`speaker_${i + 1}_duration`] = sp ? `${sp.minutes}m` : ''
		}

		const messages = s.messages || []
		for (let i = 0; i < 8; i++) {
			values[`message_${i + 1}_text`] = messages[i] || ''
		}

		this.setVariableValues(values)
	}

	async destroy() {
		this.closeWebSocket()
	}
}

runEntrypoint(SimpleClockInstance, UpgradeScripts)
