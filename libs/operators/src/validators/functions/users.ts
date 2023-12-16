import validator from "validator"
import { ErrorMsg } from "Shared-utils"
import { INewAuths, IChangeEmail, IChangePass } from "Dto"

// NEW AUTHS
export const authsValidator = (data: INewAuths): void => {
	const { email, password, confirmEmail, confirmPass } = data

	const validEmail = validator.isEmail(email)
	const validPass = validator.isStrongPassword(password)

	if (!validEmail) throw new ErrorMsg(400, "invalid email format")

	if (email !== confirmEmail) throw new ErrorMsg(400, "emails don't match")

	if (validPass) throw new ErrorMsg(400, "weak Password")
	if (password !== confirmPass) throw new ErrorMsg(400, "passwords don't match")
	else return
}

// CHANGE EMAIL
export const newEmailValidator = (data: IChangeEmail): void => {
	const { actual, confirm, newEmail } = data
	const validEmail = validator.isEmail(newEmail)

	if (!validEmail) throw new ErrorMsg(400, "invalid email format")
	if (newEmail !== confirm)
		throw new ErrorMsg(400, "new and confirmation emails must be the same")
	if (newEmail === actual) throw new ErrorMsg(400, "new and old emails must be different")
	else return
}

// CHANGE PASS
export const newPassValidator = (data: IChangePass): void => {
	const { actual, confirm, newPass } = data

	// NEED A STRENGTH VALIDATION
	//const validPass = (newPass)

	// if (!validPass) throw new ErrorMsg(400, "invalid email format")
	if (newPass !== confirm) throw new ErrorMsg(400, "new and confirmation emails must be the same")
	if (newPass === actual) throw new ErrorMsg(400, "new and old emails must be different")
	else return
}

// USER IMAGE
export const userImgValidator = (file?: File): void => {
	console.log(file)

	return
}
