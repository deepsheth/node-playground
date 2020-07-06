// utils
// models
import {GameRoomModel} from '../models/GameRoom.js';

export const gameRoomController = {
    getAllRooms: async (req, res) => {
        try {
            const gameRooms = await GameRoomModel.getAllRooms();
            return res.status(200).json({success: true, gameRooms});
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },

    createRoom: async (req, res) => {
        try {
            const {name} = req.body;
            const gameRooms = await GameRoomModel.createRoom(name);
            return res.status(200).json({success: true, gameRooms})
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },

    joinRoom: async (req, res) => {
        try {
            const {roomId, userId} = req.body;
            const gameRoom = await GameRoomModel.joinRoom(roomId, userId);
            if (!gameRoom) {
                return res.status(200).json({success: false, error: "Unable to join game room."});
            }
            return res.status(200).json({success: true, gameRoom})
        } catch (error) {
            return res.status(500).json({success: false, error: error})
        }
    },

    getRounds: async (req, res) => {
        try {
            const {roomId, userId} = req.body;
            const gameRoom = await GameRoomModel.getRounds(roomId, userId);

            return res.status(200).json({success: true, gameRoom})
        } catch (error) {
            return res.status(500).json({success: false, error})
        }
    },

    startNewRound: async (req, res) => {
        try {
            const {roomId, userId, gameRound} = req.body;
            const gameRoom = await GameRoomModel.startNewRound(roomId, userId, gameRound);
            if (!gameRoom) {
                return res.status(200).json({success: false, error: "Unable to start round"})
            }
            return res.status(200).json({success: true})
        } catch (error) {
            return res.status(500).json({success: false, error})
        }
    },

    terminateRound: async (req, res) => {
        console.log("termiante controller")
        try {
            const {roomId, userId, roundIndex} = req.body;
            const gameRoom = await GameRoomModel.terminateRound(roomId, userId, roundIndex);
            if (!gameRoom) {
                return res.status(200).json({success: false, error: "Unable to end round"})
            }
            return res.status(200).json({success: true, gameRoom})
        } catch (error) {
            return res.status(500).json({success: false, error})
        }
    }
}