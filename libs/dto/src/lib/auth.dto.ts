import { IChangeEmail, IChangePass, ILogin } from "Shared-utils"
import { InputDTO, ReplyDTO } from "../assets"

// LOGIN
export class LoginInputDTO extends InputDTO<ILogin> {}
export class LoginReplyDTO extends ReplyDTO<Credential> {}

// LOGOUT
export class LogoutReplyDTO extends ReplyDTO<void> {}

// EMAIL
export class ChangeEmailInputDTO extends InputDTO<IChangeEmail> {}
export class ChangeEmailReplyDTO extends ReplyDTO<boolean> {}

// PASSWORD
export class ChangePassInputDTO extends InputDTO<IChangePass> {}
export class ChangePassReplyDTO extends ReplyDTO<boolean> {}
