const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const app=express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`Server is running at port 8080`)
    } catch (error) {
        console.log(err)
    }
    })