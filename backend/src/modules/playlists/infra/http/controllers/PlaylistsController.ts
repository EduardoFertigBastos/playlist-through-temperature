import { Request, Response } from 'express';

import PlaylistsService from '@modules/playlists/services/PlaylistsService';
import TemperaturesService from '@modules/temperatures/services/TemperaturesService';
import AppError from '@shared/errors/AppError';

export default class PlaylistsController {

    /**
     * Método para procurar a playlist solicitada.
     * @param req
     * @param res 
     * @returns 
     */
    public async find(req: Request, res: Response): Promise<Response> {
        try {        
            const playlistsService = new PlaylistsService();
            const temperaturesService = new TemperaturesService();

            const temperature = await temperaturesService.getTemperature(req);

            if (temperature instanceof AppError) {
                return res.json({ success:false, ...temperature });
            } 

            const playlist = await playlistsService.getPlaylistByTemperature(temperature);
            const tracks = playlistsService.getTracksOfPlaylist(playlist);
            
            return res.json({ success:true, tracks });
        } catch (error) {
            return res.json({ success:false, ...(new AppError('Ops! Aconteceu um erro!')), error});
        }
  }

}
