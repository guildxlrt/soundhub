import { NextFunction, Request, Response } from "express"

export interface ApiRequest extends Request {
	auth?: { userId: number }
}

export type ApiReply = Response
export type ApiNext = NextFunction
