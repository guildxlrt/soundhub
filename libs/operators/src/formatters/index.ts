import { userNameFormatter } from "./users-name.format"

// FORMATTERS
export const formatters = {
	userName: userNameFormatter,
}

export type Formatters = typeof formatters
