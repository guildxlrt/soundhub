import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import { ExpressRequest, ErrorHandler, ErrorMsg, UserToken, htmlError } from "Shared"

export class JwtService {
	static async generate(userToken: UserToken | undefined, expires: string | number | undefined) {
		try {
			if (!userToken) throw ErrorMsg.htmlError(htmlError[400])

			const { id, profileID, profileType } = userToken

			const privateKey = fs.promises
				.readFile("private.pem", "utf8")
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error("Error:", error.message)
				})

			return jwt.sign(
				{
					id: id,
					profileID: profileID,
					profileType: profileType,
				},
				(await privateKey) as string,
				{ expiresIn: expires, algorithm: "RS256" }
			)
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}

	static async decode(req: ExpressRequest) {
		try {
			const token = req.cookies.jwt
			if (!token) ErrorMsg.htmlError(htmlError[400])

			const privateKey = fs.promises
				.readFile("private.pem", "utf8")
				.then((data) => {
					return data
				})
				.catch((error) => {
					console.error("Error:", error.message)
				})

			const decoded = jwt.verify(token, (await privateKey) as string) as UserToken

			req.auth = {
				id: decoded.id,
				profileID: decoded.profileID,
				profileType: decoded.profileType,
			}

			return
		} catch (error) {
			throw ErrorHandler.handle(error)
		}
	}
}
