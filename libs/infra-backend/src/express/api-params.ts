import { File } from "Domain"
import { NextFunction, Request, Response } from "express"
import { UserTokenData } from "Shared"

export interface ApiRequest extends Request {
	auth?: UserTokenData
	image?: File
	songs?: File[]
}

export type ApiRes = Response
export type ApiNext = NextFunction
