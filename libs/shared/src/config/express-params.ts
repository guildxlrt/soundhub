import { NextFunction, Request, Response } from "express"
import { Readable } from "stream"

export interface ExpressRequest extends Request {
	auth?: {
		id: number
		ArtistProfileID: number
		profileType?: "artist" | "fan" | "admin"
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
	songs?: {
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
	}[]
}

export interface ExpressResponse extends Response {}

export interface NextResponse extends NextFunction {}
