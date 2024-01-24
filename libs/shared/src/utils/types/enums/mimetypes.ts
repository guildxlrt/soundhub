export interface IMimetypes {
	[key: string]: string
}

export const AUDIO_MIME_TYPES = {
	"audio/mpeg": "mp3",
	"audio/ogg": "ogg",
	"audio/wav": "wav",
	"audio/webm": "webm",
	"audio/flac": "flac",
} as IMimetypes

export const IMAGE_MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/gif": "gif",
	"image/webp": "webp",
} as IMimetypes
