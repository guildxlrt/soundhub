import { UserTokenData } from "Shared"
import { NextFunction, Request, Response } from "express"

export interface ApiRequest extends Request {
	auth?: UserTokenData
}

export type ApiReply = Response
export type ApiNext = NextFunction
