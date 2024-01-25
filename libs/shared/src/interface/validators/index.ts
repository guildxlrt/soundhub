import { ChangeEmailValidator } from "./change-email.val"
import { ChangePassValidator } from "./change-pass.val"
import { SignupAuthsValidator } from "./signup-auths.val"
import { FileValidator } from "./file.val"

export const validators = {
	signupAuths: new SignupAuthsValidator().validate,
	changeEmail: new ChangeEmailValidator().validate,
	changePass: new ChangePassValidator().validate,
	file: new FileValidator().validate,
}
