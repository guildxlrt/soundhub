import * as jwt from "jsonwebtoken"
import { ApiRequest } from "./express-js"
import * as fs from "fs"

const privateKey = fs.readFileSync("private.pem", "utf8")

export class Token {
	generate(userId: number, expires: string | number | undefined) {
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
