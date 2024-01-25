import { Prisma } from "@prisma/client"
import { ErrorMsg, htmlError } from "Shared"
import { Reply } from "../assets"

export class DbErrHandler {
	static uniqueEmail(error: unknown, res: unknown): ErrorMsg | void {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002" &&
			res instanceof Reply &&
			res.error instanceof ErrorMsg
		) {
			return (res.error = ErrorMsg.htmlError(htmlError[409]))
		}
		return
	}
}
