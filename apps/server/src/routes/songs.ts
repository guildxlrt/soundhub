import { Router } from "express"
const router = Router()

router.get("/", (req, res) => {
	res.send({ message: "All Songs" })
})

export default router