const express = require('express');
const bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const app = express();
const user = require('./models/user');
const client = require('./models/client')
const opponent = require('./models/opponent')
const stages = require('./models/stage')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./config/keys')
var http = require('http');
const requireToken = require('./middleware/requireToken')

// Database
const db = require('./config/database');
const stage = require('./models/stage');
app.use(bodyParser.json())
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))
 


// Index route
app.get('/',requireToken,(req,res)=>{
  res.send({fname:req.us.fname,id:req.us.id})
})


// app.get('/allclients',async (req,res)=>{
//     // const {cname} = req.body
//     // if(!use){
//     //   return res.status(422).send({error :"must provide username or password2"})
//     // }
//     try{
//       const use = await client.findAll()
//       res.send(use)
//       console.log(use)
//     }catch(err){
//         return res.send(err)
//     }
// })


app.post('/allstagescount',async (req, res) => 
{
  const {matter_type} = req.body
   let a = await stages.count({ where: { matter_type:matter_type } });
   res.status(200).send(a.toString());
});


app.post('/allnotice',async (req, res) => 
{
  const {matter_type,user_id} = req.body
   let a = await stages.count({ where: { matter_type,user_id } });
   res.status(200).send(a.toString());
});


app.post('/allcases',async (req, res) => 
{
  const {user_id} = req.body
   let a = await stages.count({ where: { user_id:user_id } });
   res.status(200).send(a.toString());
});


app.post('/signup',async (req, res) => {
        let { fname,lname,email,phone,address,qualification,username,password } = req.body;
        try{
            const hash = await bcrypt.hash(password, 10);
              // bcrypt.genSalt(10, function(err, salt) {
              //   bcrypt.hash(password, salt, async(err, hash)=> {
                    // Store hash in your password DB.
                    const use = new user({fname,lname,email,phone,address,qualification,username,password:hash});
                await  use.save();
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
            //     });
            // });
          
    
        }catch(err){
          return res.status(422).send(err.message)
        }
});

app.post('/signin',async (req,res)=>{
  const {username,password} = req.body
  if(!username || !password){
      return res.status(422).send({error :"must provide username or password"})
  }
  const use = await user.findOne({ where: { username } })
  // res.send(use)
  if(!use){
      return res.status(422).send({error :"must provide username or password2"})
  }
  try{
    console.log(username)
    // await user.comparePassword(password);
    const validPass = await bcrypt.compare(password, use.password);
            if(validPass) {
                const token = jwt.sign({userId:use.id},jwtkey)
                res.send({token})
              // res.status(200).json('Valid Email and pass!');
            } else {
                res.status(400).json('Wrong password!');
            }    
    
  }catch(err){
      return res.status(422).send({error :"must provide username or password3"})
  }
})


// app.get('/allclients',async (req,res)=>{
//   // const {cname} = req.body
//   const use = await client.findAll()
//   res.send(use)
//   if(!use){
//       return res.status(422).send({error :"must provide username or password2"})
//   }
//   try{
//     console.log(use)
//   }catch(err){
//       return res.status(422).send({error :"must provide username or password3"})
//   }
// })


app.post('/addclient', async (req, res) => {
  let { user_id, date, name, mobile, email, age, address, occupation, payment, fees, token, balance } = req.body;
  try{
    const con = new client({ user_id, date, name, mobile, email, age, address, occupation, payment, fees, token, balance });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
});


app.post('/addopponent', async (req, res) => {
  let { client_name,date, name, mobile, email, age, address, occupation, case_brif} = req.body;
  try{
    const con = new opponent({ client_name,date, name, mobile, email, age, address, occupation, case_brif});
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
}); 


app.post('/addstage', async (req, res) => {
  let { user_id, matter_type , prev_date, court_name, case_no, name_party, stage, next_date, next_stage, case_brif} = req.body;
  try{
    const con = new stages({ user_id, matter_type , prev_date, court_name, case_no, name_party, stage, next_date, next_stage, case_brif });
    await  con.save();
    res.send("Success")
  }catch(err){
    return res.status(422).send(err.message)
  }
});


app.put('/updatestage', async (req, res) => {
  let { user_id, matter_type , prev_date, court_name, case_no, name_party, stage, next_date, next_stage, case_brif } = req.body;
  stages.update(
    {user_id, matter_type , prev_date, court_name, case_no, name_party, stage, next_date, next_stage, case_brif},
    {where: {case_no:case_no}}
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated)
  })
  .catch()
});  


app.put('/updateclient', async (req, res) => {
  let { id,user_id, case_no, date, name, mobile, email, age, address, occupation, case_brif, payment, fees, token, balance } = req.body;
  client.update(
    {user_id, case_no, date, name, mobile, email, age, address, occupation, case_brif, payment, fees, token, balance},
    {where: {id:id}}
  )
  .then(function(rowsUpdated) {
    res.json(rowsUpdated)
  })
  .catch()
});  





app.post('/allclients',async (req,res)=>{
    const {user_id} = req.body
    // const use=[];
    // console.log(category)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await client.findAll({ where: { user_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.status(422).send({error :"Error"})
    }
    // res.send(use)
  })


app.post('/allcasess',async (req,res)=>{
    const {user_id} = req.body
    // const use=[];
    // console.log(category)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await stages.findAll({ where: { user_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.status(422).send({error :"Error"})
    }
    // res.send(use)
  })


app.post('/allcase',async (req,res)=>{
    const {name_party} = req.body
    // const use=[];
    // console.log(category)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await stages.findAll({ where: { name_party } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.status(422).send({error :"Error"})
    }
    // res.send(use)
  })


app.post('/allopponent',async (req,res)=>{
    const {client_name} = req.body
    // const use=[];
    // console.log(category)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await opponent.findAll({ where: { client_name } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        return res.status(422).send({error :"Error"})
    }
    // res.send(use)
  })


app.post('/oneclients',async (req,res)=>{
    const {name} = req.body
    // const use=[];
    console.log(name)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await client.findAll({ where: { name:name } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        res.send(err)
    }
    // res.send(use)
  })


app.post('/onestage',async (req,res)=>{
    const {case_no} = req.body
    // const use=[];
    console.log(case_no)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await stage.findAll({ where: { case_no:case_no } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        res.send(err)
    }
    // res.send(use)
  })


app.post('/findstages',async (req,res)=>{
    const {user_id} = req.body
    // const use=[];
    console.log(user_id)
    // if(!use){
      //   return res.status(422).send({error :"must provide useruser_id or password2"})
      // }
      try{
        const use = await stages.findAll({ where: { user_id:user_id } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        res.send(err)
    }
    // res.send(use)
  })


app.post('/findclient',async (req,res)=>{
    const {name} = req.body
    // const use=[];
    console.log(name)
    // if(!use){
      //   return res.status(422).send({error :"must provide username or password2"})
      // }
      try{
        const use = await client.findAll({ where: { name:name } })
        // use.push(one)
        res.send(use)
        console.log(use)
        // return use
      }catch(err){
        res.send(err)
    }
    // res.send(use)
  })

// const port = process.env.PORT;

app.listen(process.env.PORT || 3000, console.log(`Server started on port ${process.env.PORT || 3000}`));