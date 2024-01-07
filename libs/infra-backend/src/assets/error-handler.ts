import { Prisma } from "@prisma/client"
import { ErrorMsg, apiErrorMsg } from "Shared"
import { Reply } from "./reply"

export const dbErrHandler = {
	uniqueEmail: (error: unknown, res: unknown): ErrorMsg | void => {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002" &&
			res instanceof Reply &&
			res.error instanceof ErrorMsg
		) {
			return (res.error = {
				status: 409,
				message: apiErrorMsg.e409.email,
				name: "Unique constraint failed",
				timestamp: new Date(),
			})
		}
		return
	},
}
