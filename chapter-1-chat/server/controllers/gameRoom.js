// utils
import makeValidation from '@withvoid/make-validation';
// models
import { GameRoomModel } from '../models/GameRoom.js';

export const gameRoomController = {
    getAllRooms: async (req, res) => {
        try {
            const gameRooms = await GameRoomModel.getAllRooms();
            return res.status(200).json({ success: true, gameRooms });
          } catch (error) {
            return res.status(500).json({ success: false, error: error })
          }
    },

    createRoom: async (req, res) => {
        try {
            const { name } = req.body;
            const gameRooms = await GameRoomModel.createRoom(name);
            return res.status(200).json({success: true, gameRooms})
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },

    joinRoom: async (req, res) => {
        try {
            const { roomId, userId } = req.body;
            console.log(roomId, userId)
            const gameRoom = await GameRoomModel.joinRoom(roomId, userId);
            return res.status(200).json({success: true, gameRoom})
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    }
}