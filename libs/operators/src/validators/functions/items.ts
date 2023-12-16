import { IMedia } from "Shared-utils"

// MEDIA
export const mediaValidator = (data?: IMedia): void => {
	const type = data?.type
	const file = data?.file

	console.log(type)
	console.log(file)

	return
}

// SONG
export const songValidator = (file?: File): void => {
	console.log(file)

	return
}
