const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    
    // to get the whole info like chat app
    userID:String,
    username:String
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",noteSchema)
module.exports={
    NoteModel 
}