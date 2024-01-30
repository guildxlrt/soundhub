import { Prisma } from "@prisma/client"
import { ErrorMsg, htmlError } from "../errors"

export class DbErrorHandler {
	static check(error: unknown): ErrorMsg | void {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (error.code) {
				case "P2002":
					return ErrorMsg.htmlError(htmlError[409])

				default:
					return ErrorMsg.htmlError(htmlError[500]).setMessage(
						error.code + "\n" + error.message
					)
			}
		} else return
	}
}
