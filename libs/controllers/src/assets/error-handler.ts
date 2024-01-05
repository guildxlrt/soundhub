import { errorMsg } from "Shared-utils"
import { ApiReply } from "../../../shared-utils/src/express-js/params"

export const ctrlrErrHandler = (error: any, res: ApiReply) => {
	try {
		console.error(error)

		if (error.status) {
			return res.status(error.status).send(error.message)
		}

		return res.status(500).send(error)
	} catch (error) {
		return res.status(500).send(errorMsg.e500)
	}
}
