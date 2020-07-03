import express from 'express';
// controllers
import { gameRoomController as gameRoom } from '../controllers/gameRoom.js';

const gameRoomRouter = express.Router();

gameRoomRouter
  .get('/', gameRoom.getAllRooms)
  .post('/', gameRoom.createRoom)
  .post('/join', gameRoom.joinRoom)

export { gameRoomRouter };
