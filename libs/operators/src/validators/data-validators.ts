import {
	authsValidator,
	mediaValidator,
	newEmailValidator,
	newPassValidator,
	userImgValidator,
} from "./functions"

// VALIDATORS
export const dataValidators = {
	auths: authsValidator,
	newEmail: newEmailValidator,
	newPass: newPassValidator,
	userImg: userImgValidator,
	media: mediaValidator,
}

export type DataValidators = typeof dataValidators
