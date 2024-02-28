import { Schema, model } from "mongoose"

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    version: {
        type: Number,
        min: [1, 'Project version must be positive.']
    }
})

export const Project = model('Project', projectSchema)