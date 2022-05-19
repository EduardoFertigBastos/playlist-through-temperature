import { injectable } from 'tsyringe'

import axios, { AxiosResponse } from 'axios'
import Spotify from '@shared/infra/api/Spotify'

interface ITrack {
    track: {
        name: string;
    }
}

interface IPlaylist {
    data: {
        tracks: {
            items: ITrack[];
        }
    }
}

interface ITrackRetorno {
    id: number;
    name: string;
}

@injectable()
class PlaylistsService {

    /**
     * Retorna a playlist baseado na temperatura.
     * 
     * @param temperature 
     * @returns 
     */
    public async getPlaylistByTemperature(temperature: number) {
        let playlist;
        if (temperature > 30) {
            playlist = await this.getPlaylist(Spotify.PLAYLIST_FESTA)
        } else if (temperature >= 15) {
            playlist = await this.getPlaylist(Spotify.PLAYLIST_POP)
        } else if (temperature >= 10) {
            playlist = await this.getPlaylist(Spotify.PLAYLIST_ROCK)
        } else {
            playlist = await this.getPlaylist(Spotify.PLAYLIST_CLASSICA)
        }

        return playlist;
    }

    /**
     * Converte as Tracks do spotify para um formato simplicado que será utilizado no front end.
     * @param playlist 
     * @returns 
     */
    public getTracksOfPlaylist(playlist: IPlaylist): ITrackRetorno[] {
        let codigo = 0;
        return playlist.data.tracks.items.map(element => {
            codigo += 1;
            return { id:codigo, name:element.track.name};
        })
    }

    /**
     * Retorna a playlist do spotify, recebendo o id da playlist como parâmetro.
     * 
     * @param id 
     * @returns 
     */
    public async getPlaylist(id: string): Promise<AxiosResponse<any, any>> {
        return await axios.get(new Spotify({playlist:id}).url, Spotify.config)
    }
}

export default PlaylistsService
