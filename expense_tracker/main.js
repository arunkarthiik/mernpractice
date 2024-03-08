const express = require('express');
const port = 2005;
const bodyParser = require('body-parser');
const app =express();
const mongoose = require('mongoose');
const {Expense} = require('./schema.js')
app.use(bodyParser.json()) 

async function connectTodb() {
   try{
    await mongoose.connect('mongodb+srv://studentarunkarthiik:Arun2005@cluster0.nn5f7ur.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log("db connect success!");

    
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })

    //crud operations
    //post
    // app.get('/expenses',async(req,res)=>{
    //     console.log("inside post function");
    //     const data = await Expense.find()
    //     res.status().json(data)
    //         // amount:req.body.amount,
    //         // category: req.body.category,
    //         // date: req.body.date
        
    //     // const val =await data.save();
    //     // res.json(val);
    // })
    // get all expenses
    app.post('/get-expenses',async (request,res)=>{
       // console.log("getting all the records")
       try{
        await Expense.create({
            "amount" : request.body.amount,
            "category" : request.body.category,
            "date" : request.body.date
        })
        res.status(201).json({
            "status" : "success",
            "message" : "entry created"
        })

       }catch(error) {
        res.status(500).json({
            "status" : "failure",
            "message" : "entry not created"
        })
    }
   })
   
}catch(error) {console.log("Error in connecting to the database")
console.log(error);
}

}
connectTodb()

app.get('/get-expenses-result',async (req,res)=>{
    try{
        const expensedata = await Expense.find()
        res.status(200).json(expensedata)
    }catch(err){
    express.response.status(500).json({
        "status":"failure",
        "error":"error"
    })
}

})

app.delete('/delete-expense/:id',async (req,res)=>{
    try{

        const expenseEntry = await Expense.findById(req.params.id)
        if(expenseEntry){
            await Expense.findByIdAndDelete(req.params.id)
            res.status(200).json({
                "sts":"success",
                "msg":"entry found and deleted"
            })
        }
        else{
    
            res.status(404).json({
                "sts":"failure",
                "msg":"entry not found"
            })
        }
        
    } catch(err){
        console.log(err)
        res.status(500).json({
            "sts":'server error',
            'error':err
        })
    
    }
   
console.log(req.params);
})

app.patch('/update-expense/:id',async (req,res)=>{
   try{
    const expenseEntry = await Expense.findById(req.params.id)
    if(expenseEntry){
       await expenseEntry.updateOne({
       "amount":req.body.amount,
       "categoty":req.body.category,
       "date":req.body.date
        })
        res.status(200).json({
            "status" : "success",
            "message" : "successfully updated the entry"
    })
}
    else{

        res.status(404).json({
            "sts":"failure",
            "msg":"entry not found"
        })
    }
   }catch(error) {
    res.status(500).json({
        "status" : "failure",
        "message" : "could not update entry",
        "error" : error
    })
}
// console.log(req.params);
})





