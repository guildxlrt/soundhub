import { changeEmailValidator } from "./change-email.val"
import { changePassValidator } from "./change-pass.val"
import { mediaValidator } from "./media.val"
import { signupAuthsValidator } from "./signup-auths.val"
import { songValidator } from "./song.val"
import { userImageValidator } from "./users-image.val"

// VALIDATORS
export const validators = {
	signupAuths: signupAuthsValidator,
	changeEmail: changeEmailValidator,
	changePass: changePassValidator,
	userImg: userImageValidator,
	media: mediaValidator,
	song: songValidator,
}

export type Validators = typeof validators
