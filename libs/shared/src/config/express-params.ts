import { NextFunction, Request, Response } from "express"
import { Readable } from "stream"
import { UserProfileType } from "../types"

export interface ExpressRequest extends Request {
	auth?: {
		authID: number
		profileID: number
		profileType: UserProfileType
	}
	image?: {
		fieldname: string
		originalname: string
		encoding: string
		mimetype: string
		size: number
		stream: Readable
		destination: string
		filename: string
		path: string
		buffer: Buffer
	}
	audio?: {
		fieldname: string
		originalname: string
		encoding: string
		mimetype: string
		size: number
		stream: Readable
		destination: string
		filename: string
		path: string
		buffer: Buffer
	}
}

export interface ExpressResponse extends Response {}

export interface NextResponse extends NextFunction {}
