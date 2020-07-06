import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";
import {gameRoundSchema} from "./GameRound.js";

const gameRoomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        name: String,
        players: Array,
        rounds: [gameRoundSchema]
    },
    {
        timestamps: true
    }
)

/**
 *
 * @param {String} name
 */
gameRoomSchema.statics.createRoom = async function (name) {
    try {
        const gameRoom = await this.create({name})
        return gameRoom;
    } catch (error) {
        throw error;
    }
}

gameRoomSchema.statics.getAllRooms = async function () {
    try {
        const gameRooms = await this.find();
        return gameRooms;
    } catch (error) {
        throw error;
    }
}

gameRoomSchema.statics.joinRoom = async function (roomId, userId) {
    try {
        const gameRoom = await this.findOneAndUpdate(
            {_id: roomId},
            {$addToSet: {players: userId}}
        )
        return gameRoom;
    } catch (error) {
        throw error;
    }
}

gameRoomSchema.statics.getRounds = async function (roomId, userId) {
    try {
        const rounds = await this.aggregate([
            {$match: {_id: roomId}},
            {
                $project: {
                    rounds: {
                        $filter: {input: "$rounds", as: "round", cond: true}
                    }
                }
            },
        ]);
        return rounds;
    } catch (error) {
        throw error;
    }
}

gameRoomSchema.statics.startNewRound = async function (roomId, userId, gameRound) {
    try {
        const {status, lengthInMins, actualLocation} = gameRound;
        const update = {
            $addToSet: {rounds: {status, lengthInMins, actualLocation}}
        }
        return await this.findOneAndUpdate({_id: roomId}, update);
    } catch (error) {
        throw error;
    }
}

gameRoomSchema.statics.terminateRound = async function (roomId, userId, roundIndex) {
    try {
        const roundSelector = `rounds.${roundIndex}.status`;
        return await this.findOneAndUpdate(
            {_id: roomId, [`rounds.${roundIndex}.status`]: {$exists: true}},
            {
                $set:
                    {[`rounds.${roundIndex}.status`]: "terminated"}
            },
            {new: true});
    } catch (error) {
        throw error;
    }
}

export const GameRoomModel = mongoose.model("GameRoom", gameRoomSchema);