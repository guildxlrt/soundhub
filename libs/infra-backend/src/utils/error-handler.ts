import { ErrorHandler, ErrorMsg } from "Shared"
import { PrismaErrorHandler } from "../prisma"

export class DatabaseErrorHandler {
	static handle(error: unknown): ErrorMsg {
		const dbError = PrismaErrorHandler.handle(error)
		if (dbError) return dbError
		else return ErrorHandler.handle(error)
	}
}
