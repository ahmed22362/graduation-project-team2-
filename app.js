const express = require('express')
var petRoute=require('./routes/animalRouter')
var solidRoute =require('./routes/solidRouter')
var clinicRoute =require('./routes/clinicRouter')
var userRouter =require('./routes/userRouter')
var body_parser =require('body-parser');
const app = express()


// app.use('/',(req,res)=>{
//     res.send('kkkkkkkkkkkkkfffffffffffffk')
// })

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());


app.use('/animal',petRoute);
app.use('/solid',solidRoute);
app.use('/clinic',clinicRoute);
app.use('/user',userRouter)




app.listen(3222,()=>{
    console.log('server working')
})