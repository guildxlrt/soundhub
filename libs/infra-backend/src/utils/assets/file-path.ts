export const filePath = {
	origin: {
		image: "tmp/image/",
		audio: "tmp/audio/",
	} as const,
	store: {
		announce: "store/images/announces/",
		event: "store/images/events/",
		artist: "store/images/avatars/",
		release: "store/releases/",
		song: "store/releases/",
	} as const,
} as const

export type StoreFilePath = (typeof filePath.store)[keyof typeof filePath.store]
