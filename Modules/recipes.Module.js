import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Recipe name is required"], // better error message
            trim: true
        },
        desc: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0
        },
        category: {
            type: String,
            trim: true,
            default: "general"
        },
        image: {
            type: String,
        }
    },
    { timestamps: true }
)

export const recipeModel = mongoose.model("Recipe", recipeSchema)
