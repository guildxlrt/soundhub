import { UserAuthID } from "../types"

export interface ILoginDbRes {
	encryptedPass: string
	id: number
	profileID: number
}

export type ILoginApiRes = UserAuthID

export type ILoginRes = ILoginDbRes | ILoginApiRes
