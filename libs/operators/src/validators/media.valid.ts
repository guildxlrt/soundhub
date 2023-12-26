import { IMedia } from "Shared-utils"

// MEDIA
export const mediaValidator = (data?: IMedia): void => {
	// ...some logic

	const type = data?.type
	const file = data?.file

	console.log(type)
	console.log(file)

	return
}
