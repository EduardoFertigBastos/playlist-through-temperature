import { Router } from 'express';

import PlaylistsController from '../controllers/PlaylistsController';

const playlistRouter = Router();
const playlistController = new PlaylistsController();


playlistRouter.get('/temperatura',   playlistController.find);

export default playlistRouter;
