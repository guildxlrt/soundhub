import { NextFunction, Request, Response } from "express"

export interface ApiRequest extends Request {
	auth?: { artistId: number; userId: number }
}

export type ApiReply = Response
export type ApiNext = NextFunction
