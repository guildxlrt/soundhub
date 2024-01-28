export class ReleaseNameFormatter {
	format(fullString: string): string {
		const firstSplit = fullString.split("storage/releases/")
		const secondSplit = firstSplit[1].split("/")
		const result = secondSplit[0] + "/"
		return result
	}
}
