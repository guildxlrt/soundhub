import { comparePass, hashPass } from "./pass.encr"

// ENCRYPTORS
export const encryptors = {
	hashPass: hashPass,
	comparePass: comparePass,
}

export type Encryptors = typeof encryptors
