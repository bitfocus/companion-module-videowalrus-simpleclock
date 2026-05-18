function getVariables() {
	const vars = [
		{ variableId: 'display_time', name: 'Display Time' },
		{ variableId: 'mode', name: 'Timer Mode' },
		{ variableId: 'remaining', name: 'Remaining Seconds' },
		{ variableId: 'hours', name: 'Hours Remaining' },
		{ variableId: 'minutes', name: 'Minutes Remaining' },
		{ variableId: 'seconds', name: 'Seconds Remaining' },
		{ variableId: 'status', name: 'Timer Status' },
		{ variableId: 'speed', name: 'Speed' },
		{ variableId: 'is_running', name: 'Is Running' },
		{ variableId: 'is_expired', name: 'Is Expired' },
		{ variableId: 'is_warning', name: 'Is Warning' },
		{ variableId: 'active_message', name: 'Active Message Text' },
		{ variableId: 'message_progress', name: 'Message Progress' },
		{ variableId: 'message_throbbing', name: 'Message Throbbing' },
		{ variableId: 'outputs_blanked', name: 'Outputs Blanked' },
		{ variableId: 'active_speaker_index', name: 'Active Speaker Number' },
	]

	for (let i = 1; i <= 8; i++) {
		vars.push({ variableId: `speaker_${i}_name`, name: `Speaker ${i} Name` })
		vars.push({ variableId: `speaker_${i}_duration`, name: `Speaker ${i} Duration` })
	}

	for (let i = 1; i <= 8; i++) {
		vars.push({ variableId: `message_${i}_text`, name: `Message ${i} Text` })
	}

	return vars
}

module.exports = { getVariables }
