const { request, response } = require('express')
const express=require('express')
const mongoose=require('mongoose')
const schema=require('./schema')
const cors=require('cors')
const bodyParser = require('body-parser')


const app=express()
app.use(express.static(__dirname+'/public'))
//app.get('/',(req,res)=>{
  //  res.sendFile(__dirname+'/public/index.html')
//})
 mongoose.connect('mongodb+srv://root:123@cluster0.9k1g5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
useUnifiedTopology:true,useNewUrlParser:true
 })
 const connection=mongoose.connection
 connection.once('open',()=>{
     console.log("connected")
 })
app.use(bodyParser.json())
app.use(cors())

app.get('/api',(request,response)=>{
    schema.find({},(error,result)=>{
        if(error){
            throw error
        }
        else{
           response.send(result) 
        }
    })
})

app.delete('/api/:id',(request,response)=>{
    schema.deleteMany({_id:request.params.id},(error,result)=>{
        if(error){
            throw error
        }
        else{
            response.status(201).send()
        }
    })
})
app.post('/api/update',(request,response)=>{
    schema.updateMany({_id:request.body.id},{task:request.body.data},(error,result)=>{
        if(error)throw error
        response.send(result)
    })
})
app.post('/api',(request,response)=>{
    var model={
        task:request.body.task
    
    }
    schema.insertMany(model,(error,result)=>{
        if(error){
            throw error
        }
        else{
            response.status(201).send()
        }
    })
})

//1 199 - responses 
//200 399 - success
//400 600 - errors
//404 405 500
const port = process.env.PORT
app.listen(port,()=>{
    console.log('running')
})