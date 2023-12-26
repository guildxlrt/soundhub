import { changeEmailValidator } from "./change-email.valid"
import { changePassValidator } from "./change-pass.valid"
import { mediaValidator } from "./media.valid"
import { signupAuthsValidator } from "./signup-auths.valid"
import { songValidator } from "./song.valid"
import { userImageValidator } from "./users-image.valid"

// VALIDATORS
export const validators = {
	newAuths: signupAuthsValidator,
	changeEmail: changeEmailValidator,
	changePass: changePassValidator,
	userImg: userImageValidator,
	media: mediaValidator,
	song: songValidator,
}

export type Validators = typeof validators
