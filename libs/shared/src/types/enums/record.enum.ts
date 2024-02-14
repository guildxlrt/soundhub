export const RecordEnum = {
	album: "album",
	ep: "ep",
	single: "single",
	split: "split",
	live: "live",
} as const

export type RecordType = (typeof RecordEnum)[keyof typeof RecordEnum]
