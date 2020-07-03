import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        name: String,
    }
)

/**
 * 
 * @param {String} name 
 */
userSchema.statics.createRoom = async function(name) {
    try {
        const gameRoom = await this.create({ name })
        return gameRoom;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.getAllRooms = async function () {
    try {
        const gameRooms = await this.find();
        return gameRooms;
    } catch (error) {
        throw error;
    }
}

export const GameRoomModel = mongoose.model("GameRoom", userSchema);