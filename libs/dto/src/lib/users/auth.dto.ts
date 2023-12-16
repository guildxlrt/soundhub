import { BasicDTO, IChangeEmailData, IChangePassData, ILogin } from "../../assets"

export class LoginDTO extends BasicDTO<ILogin, Credential> {}

export class LogoutDTO extends BasicDTO<void, void> {}

// EMAIL
export class ChangeEmailDTO extends BasicDTO<IChangeEmailData, boolean> {}

// PASSWORD
export class ChangePassDTO extends BasicDTO<IChangePassData, boolean> {}
