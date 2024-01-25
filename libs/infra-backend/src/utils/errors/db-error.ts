import { Prisma } from "@prisma/client"
import { ErrorMsg, apiError } from "Shared"
import { Reply } from "../assets"

export class DbErrHandler {
	static uniqueEmail(error: unknown, res: unknown): ErrorMsg | void {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002" &&
			res instanceof Reply &&
			res.error instanceof ErrorMsg
		) {
			return (res.error = ErrorMsg.apiError(apiError[409]))
		}
		return
	}
}
