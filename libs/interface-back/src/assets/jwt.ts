import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import { ApiRequest } from "./params"
import { ErrorMsg, UserCookie, apiErrorMsg } from "Shared"

const privateKey = fs.readFileSync("private.pem", "utf8")

export class Token {
	generate(userCookie: UserCookie | undefined, expires: string | number | undefined) {
		try {
			if (!userCookie) throw new ErrorMsg(500, apiErrorMsg.e500)

			const { id, profileID, profileType } = userCookie

			return jwt.sign(
				{
					id: id,
					profileID: profileID,
					profileType: profileType,
				},
				privateKey,
				{ expiresIn: expires, algorithm: "RS256" }
			)
		} catch (error) {
			return new ErrorMsg(500, apiErrorMsg.e500)
		}
	}

	decode(req: ApiRequest) {
		try {
			const token = req.cookies.jwt
			const decoded = jwt.verify(token, privateKey) as UserCookie

			req.auth = {
				id: decoded.id,
				profileID: decoded.profileID,
				profileType: decoded.profileType,
			}

			return
		} catch (error) {
			return new ErrorMsg(401, apiErrorMsg.e401)
		}
	}
}
