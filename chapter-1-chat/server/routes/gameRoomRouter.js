import express from 'express';
// controllers
import {gameRoomController as gameRoom} from '../controllers/gameRoom.js';

const gameRoomRouter = express.Router();

gameRoomRouter
    .get('/', gameRoom.getAllRooms)
    .post('/', gameRoom.createRoom)
    .post('/join', gameRoom.joinRoom)
    .get('/rounds', gameRoom.getRounds)
    .post('/rounds', gameRoom.startNewRound)
    .post('/terminate', gameRoom.terminateRound)

export {gameRoomRouter};
