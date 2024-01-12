import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import { ApiRequest } from "./params"
import { ErrorMsg, UserCookie, apiErrorMsg } from "Shared"

const privateKey = fs.readFileSync("private.pem", "utf8")

export class Token {
	generate(userId: UserCookie | undefined, expires: string | number | undefined) {
		if (!userId || !userId.id || !userId.profileId) throw new ErrorMsg(500, apiErrorMsg.e500)

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
		const decoded = jwt.verify(token, privateKey) as UserCookie

		req.auth = {
			id: decoded.id,
			profileId: decoded.profileId,
			profileType: decoded.profileType,
		}
	}
}
