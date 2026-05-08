# companion-module-videowalrus-simpleclock

A [Bitfocus Companion](https://bitfocus.io/companion) module for controlling [SimpleClock](https://github.com/videojedi/SimpleClock), a macOS presentation countdown timer.

## Features

- Start, pause, reset, and toggle countdown playback
- Switch between clock, countdown, and finish-time modes
- Quick-set countdown durations (1m through 60m)
- Adjust time up/down in configurable increments
- Speed control (0.8x to 1.2x)
- Load speakers from the speaker schedule and advance to next speaker
- Trigger and dismiss full-screen messages
- Live variables: display time, mode, speed, speaker names, message text
- Status feedbacks: running, expired, warning, message active, mode

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Host | `127.0.0.1` | IP address of the Mac running SimpleClock |
| Port | `9090` | WebSocket port |

SimpleClock must be running with its Companion WebSocket server active (enabled in the Outputs section of the control panel).

## Development

Requires Node.js 18+ or 22+.

```sh
npm install
```

To build the installable package:

```sh
npm run package
```

This produces a `.tgz` file you can install in Companion via **Connections > Install module from file**.

For live development, add the module folder path in Companion's **Developer Modules** section for hot-reload on save.

## License

MIT
