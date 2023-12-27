export const ReleaseEnum = {
	album: "album",
	ep: "ep",
	single: "single",
	split: "split",
	live: "live",
} as const

export type ReleaseType = (typeof ReleaseEnum)[keyof typeof ReleaseEnum]
