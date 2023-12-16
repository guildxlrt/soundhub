export const IMediaEnum = {
	image: "image",
	video: "video",
} as const

export type IMediaType = (typeof IMediaEnum)[keyof typeof IMediaEnum]

export interface IMedia {
	type: IMediaType
	file: File
}
