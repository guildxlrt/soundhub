import { BaseReposArtistItem, InputsLayer } from "../../../assets"
import { ArtistId, ReleaseId, Song, SongId } from "../../entities"

export abstract class SongRepository implements Omit<BaseReposArtistItem<Song>, "getAll"> {
	abstract get(inputs: InputsLayer<SongId, Song>): Promise<InputsLayer<SongId, Song>>

	abstract findManyByArtist(
		inputs: InputsLayer<ArtistId, Song[]>
	): Promise<InputsLayer<ArtistId, Song[]>>

	abstract findManyByRelease(
		inputs: InputsLayer<ReleaseId, Song[]>
	): Promise<InputsLayer<ReleaseId, Song[]>>
}
