import * as dotenv from 'dotenv';
import { injectable } from 'tsyringe'

/**
 * Classe de api do Spotify
 */
@injectable()
class Spotify {
    static config = {
        headers: { 
            Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}` 
        }
    };
    
    // Id das playlists.
    static PLAYLIST_FESTA    = '0G3T5qvE8WknO2hlCNxXey?si=8f32de51bcc24364';
    static PLAYLIST_POP      = '37i9dQZF1DX1ngEVM0lKrb?si=f274805d2e024eb4';
    static PLAYLIST_ROCK     = '6jmDxyne7FJ3fVA9CkGYpd?si=50d518fb48004bea';
    static PLAYLIST_CLASSICA = '7DV0Aj6AN1vPVePAjaqhiJ?si=3b3b237de87d4440';

    url = '';

    constructor(params: any) {
        this.montaURL(params);       
    }

    /**
     * Monta a url com base nos parâmetros informados
     * 
     * @param params 
     */
    public montaURL(params: any) {
        if (params.playlist !== 'undefined')  {
            this.url = `https://api.spotify.com/v1/playlists/${params.playlist}`
        }
    }
}

export default Spotify
