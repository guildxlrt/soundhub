import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import { ApiRequest } from "./params"
import { ErrorMsg, apiErrorMsg } from "Shared"

const privateKey = fs.readFileSync("private.pem", "utf8")

export class Token {
	generate(userId: number | undefined, expires: string | number | undefined) {
		if (!userId) throw new ErrorMsg(500, apiErrorMsg.e500)

		return jwt.sign(
			{
				userId: userId,
			},
			privateKey,
			{ expiresIn: expires, algorithm: "RS256" }
		)
	}

	decode(req: ApiRequest) {
		const token = req.cookies.jwt
		const decoded = jwt.verify(token, privateKey) as {
			userId: number
		}

		req.auth = {
			userId: decoded.userId,
		}
	}
}
