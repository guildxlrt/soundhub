import { ApiReply } from "../../../shared-utils/src/express-js/params"

export const ctrlrErrHandler = (error: any, res: ApiReply) => {
	if (error.status) {
		return res.status(error.status).send(error.message)
	}
	return res.status(500).send(error)
}
