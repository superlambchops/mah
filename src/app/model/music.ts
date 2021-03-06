const TRACKS = [
	{'id': 'filename', 'name': 'name'},
];

interface Track {
	id: string;
	name: string;
}

interface AudioAdapter {
	play: () => void;
	load: () => void;
	pause: () => void;
	src: string;
}

export class Music {
	// embed: any;

	constructor() {
		// let embed = document.createElement('embed');
		// embed.setAttribute('width', '0');
		// embed.setAttribute('height', '0');
		// document.body.appendChild(embed);
		// this.embed = embed;
		// <embed height="0" width="0"
		// src="http://youtube.googleapis.com/v/VIDEO_ID&autoplay=1&loop=1" />
	}

	public play() {
		// console.log('playmusic');
		// let filename = 'https://youtube.googleapis.com/v/mk2SNcpTNbs&autoplay=1&loop=1';
		// this.embed.setAttribute('src', filename);
		// this.embed.setAttribute('href', filename);
	}

	public next() {
		// console.log('music.next');
	}

	public pause() {
		// console.log('music.pause');
	}

	public stop() {
		// console.log('music.stop');
	}

	public isPaused() {
		return false;
	}

	public current() {
		return 'hi';
	}
}

export class MusicMP3 {
	private _paused = false;
	private _audio: AudioAdapter = null;
	private _played: Array<Track> = [];
	private _tracks: Array<Track> = TRACKS;
	private _current = TRACKS[Math.floor(Math.random() * TRACKS.length)];

	constructor() {
	}

	public play() {
		if (this._paused && this._audio) {
			this._paused = false;
			return this._audio.play();
		}
		if ((this._audio) || (!this._current)) {
			return;
		}
		const audio = new Audio();
		audio.src = 'assets/music/' + this._current.id + '.' + 'mp3';
		audio.load();
		audio.play();
		audio.addEventListener('error', (e: ErrorEvent) => {
			console.error(e);
			this._audio = null;
		}, true);
		audio.addEventListener('ended', this.next);
		this._audio = audio;
	}

	public next() {
		if (this._audio) {
			this._audio.pause();
			this._played.push(this._current);
			this._paused = false;
			this._audio = null;
		}
		let available = this._tracks.filter((track) => {
			return this._played.indexOf(track) < 0;
		});
		if (available.length === 0) {
			this._played = [];
			available = this._tracks;
		}
		this._current = available[Math.floor(Math.random() * available.length)];
		this.play();
	}

	public pause() {
		if (this._audio) {
			this._audio.pause();
			this._paused = true;
		}
	}

	public stop() {
		if (this._audio) {
			this._audio.pause();
		}
		this._audio = null;
	}

	public isPaused() {
		return this._paused;
	}

	public current() {
		return this._current;
	}
}
