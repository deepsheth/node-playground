import mongoose from "mongoose";
import {userSchema} from "./User.js";

export const STATUS_TYPES = {
    STARTED: "started",
    PAUSED: "paused",
    FINISHED: "finished",
    TERMINATED_EARLY: "terminated",
}

export const gameRoundSchema = new mongoose.Schema(
    {
        _id: false,
        status: {
            type: String,
            default: STATUS_TYPES.STARTED,
        },
        lengthInMins: {
            type: Number,
            default: 8,
        },
        actualLocation: {
            type: String,
        },
        spy: userSchema,
        endResult: {
            guessedLocation: String,
            votes: Object
        },
        startedAt: {
            type: Date,
            default: Date.now()
        },
    }
)

export const GameRoundModel = mongoose.model("GameRound", gameRoundSchema);