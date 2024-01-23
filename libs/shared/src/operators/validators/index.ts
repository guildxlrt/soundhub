import { ChangeEmailValidator } from "./change-email.val"
import { ChangePassValidator } from "./change-pass.val"
import { ImageValidator } from "./image.val"
import { SignupAuthsValidator } from "./signup-auths.val"
import { AudioValidator } from "./song.val"

export const validators = {
	signupAuths: new SignupAuthsValidator().validate,
	changeEmail: new ChangeEmailValidator().validate,
	changePass: new ChangePassValidator().validate,
	image: new ImageValidator().validate,
	audio: new AudioValidator().validate,
}
