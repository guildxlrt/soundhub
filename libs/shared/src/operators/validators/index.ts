import { ChangeEmailValidator } from "./change-email.val"
import { ChangePassValidator } from "./change-pass.val"
import { SignupAuthsValidator } from "./signup-auths.val"
import { ImageValidator } from "./image.val"
import { AudioValidator } from "./song.val"

export class Validators {
	static signupAuths(email: string, password: string, confirmEmail: string, confirmPass: string) {
		return new SignupAuthsValidator().validate(email, password, confirmEmail, confirmPass)
	}
	static changeEmail(actual: string, newEmail: string, confirm: string) {
		return new ChangeEmailValidator().validate(actual, newEmail, confirm)
	}
	static changePass(actual: string, newPass: string, confirm: string) {
		return new ChangePassValidator().validate(actual, newPass, confirm)
	}
	static image(file?: File) {
		return new ImageValidator().validate(file)
	}
	static audio(file?: File) {
		return new AudioValidator().validate(file)
	}
}
