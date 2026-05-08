## Video Walrus SimpleClock

This module connects to the SimpleClock macOS presentation timer to provide
remote control via Bitfocus Companion.

### Configuration

- **Host**: IP address of the Mac running SimpleClock (default: `127.0.0.1`)
- **Port**: WebSocket port (default: `9090`)

### Features

- Start, pause, reset, and toggle countdown playback
- Switch between clock, countdown, and finish-time modes
- Quick-set countdown durations (1m through 60m)
- Adjust time up/down in configurable increments
- Speed control (0.8x to 1.2x)
- Load speakers from the speaker schedule
- Advance to next speaker
- Trigger and dismiss full-screen messages
- Live variables: display time, mode, speed, speaker names, message text
- Status feedbacks: running, expired, warning, message active, mode

### Requirements

SimpleClock must be running with its Companion WebSocket server active
(enabled in the Outputs section of the control panel, default port 9090).
