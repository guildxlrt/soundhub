import * as jwt from "jsonwebtoken"
import { authExpires } from "./expires"
import { ApiRequest } from "../express-js"

export class Token {
	generate(userId: number) {
		return jwt.sign(
			{
				userId: userId,
			},
			"not-so-secret=key",
			{ expiresIn: authExpires.none, algorithm: "RS256" }
		)
	}

	decode(req: ApiRequest) {
		const token = req.cookies.jwt
		const decoded = jwt.verify(token, "not-so-secret=key") as {
			userId: number
		}

		req.auth = {
			userId: decoded.userId,
		}
	}
}
