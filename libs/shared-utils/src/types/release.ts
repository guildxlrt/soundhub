export const ReleasesEnum = {
	album: "album",
	ep: "ep",
	single: "single",
	split: "split",
	live: "live",
} as const

export type ReleaseType = (typeof ReleasesEnum)[keyof typeof ReleasesEnum]
