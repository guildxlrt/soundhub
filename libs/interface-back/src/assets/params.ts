import { UserCookie } from "Shared"
import { NextFunction, Request, Response } from "express"

export interface ApiRequest extends Request {
	auth?: UserCookie
}

export type ApiReply = Response
export type ApiNext = NextFunction
