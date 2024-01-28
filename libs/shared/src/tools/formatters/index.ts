import { GenresFormatter } from "./genres.fmt"
import { ReleaseNameFormatter } from "./release-name"

// VALIDATORS

export const formatters = {
	genres: new GenresFormatter().format,
	releaseName: new ReleaseNameFormatter().format,
}
