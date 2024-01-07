import { Request, Response, NextFunction } from "express"
import { Token } from "Shared-utils"
import { errHandler } from "../assets"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		new Token().decode(req)

		next()
	} catch (error) {
		errHandler(error, res)
	}
}
