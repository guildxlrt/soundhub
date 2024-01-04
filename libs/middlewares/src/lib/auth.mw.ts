import { Request, Response, NextFunction } from "express"
import { Token } from "Shared-utils"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		new Token().decode(req)

		next()
	} catch (error) {
		res.status(401).json({ error })
	}
}
