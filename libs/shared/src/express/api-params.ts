import { NextFunction, Request, Response } from "express"
import { FilesArray, IFile, UserTokenData } from "Shared"

export interface ApiRequest extends Request {
	auth?: UserTokenData
	image?: IFile
	songs?: FilesArray
}

export type ApiRes = Response
export type ApiNext = NextFunction
