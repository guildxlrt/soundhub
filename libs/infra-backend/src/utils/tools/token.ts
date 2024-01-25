import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import { ErrorMsg, UserTokenData, htmlError } from "Shared"
import { ApiRequest } from "../assets"

const privateKey = fs.readFileSync("private.pem", "utf8")

export class Token {
	static generate(userCookie: UserTokenData | undefined, expires: string | number | undefined) {
		try {
			if (!userCookie) throw ErrorMsg.htmlError(htmlError[400])

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
			return ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}

	static decode(req: ApiRequest) {
		try {
			const token = req.cookies.jwt
			if (!token) ErrorMsg.htmlError(htmlError[400])

			const decoded = jwt.verify(token, privateKey) as UserTokenData

			req.auth = {
				id: decoded.id,
				profileID: decoded.profileID,
				profileType: decoded.profileType,
			}

			return
		} catch (error) {
			return ErrorMsg.htmlError(htmlError[500]).treatError(error)
		}
	}
}