import { userNameFormatter } from "./functions"

// VALIDATORS
export const dataFormatters = {
	userName: userNameFormatter,
}

export type DataFormatters = typeof dataFormatters
