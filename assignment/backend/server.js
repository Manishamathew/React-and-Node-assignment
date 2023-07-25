import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());
main();

async function main() {
  await mongoose.connect(
    'mongodb+srv://manisha:N8SiAVOzr9EL4UQT@test.pldosjn.mongodb.net/?retryWrites=true&w=majority'
  );

  const ProductSchema = new mongoose.Schema({
    pid: Number,
    name: String,
    price:Number,
    image:String,
    description:String
})
const Product = mongoose.model('Product', ProductSchema);
    const allProducts = await Product.find()
    .then(console.log('Success'))
    .catch(error => console.log(error));

    app.get('/api/products' , (req,res) => {


        res.send(allProducts);
        
    })

  const UserSchema = new mongoose.Schema({
    name: {
      type:String
    } ,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token:{
      type:String,
    },
    image: {
      type:String
    }
  });
  const User = mongoose.model('User', UserSchema);
app.post('/login', async (req, res) => {
  const {email,password} = req.body
        try {
            const userFind = await User.findOne({email:email})
            console.log(userFind)
            const isMatch = await bcrypt.compare(password , userFind.password)
            if(userFind.email===email && isMatch) {
              console.log("from userFind" , userFind)
                res.send(["exist" , userFind])
            }
            else if(userFind.email!==email || !isMatch){
                res.json("Invalid Credentials")
            }
        }
        catch(e){
            res.json("Not exist")
        }
      });

app.post('/register', async (req,res) => {
  const {name,email,password} = req.body
  const token=jwt.sign(
    {
      email:email
    },'secret123',
    {expiresIn:'2hr'}
  ) 
        try {
            const check = await User.findOne({email:email})
            console.log('checkk',check)
            if(check) {
                console.log("from the if block")
                res.json("exist")
            }
            else {
                console.log('Inside else part')
                
                  const data = {
                  name:name,
                  email:email,
                  password:await bcrypt.hash(password , 8),
                  token:token
                  
              }
                await User.create(data)
                console.log(data)
                res.json("Not exist")
            }
        }
        catch(e){
            console.log("errorrrr",e)
            res.json("Not exist")
            
        }
      
      });



app.get('/api/products/:_id', async (req, res) => {
  try {
    const productId = req.params._id;

   
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log(typeof(product))
    res.send(product);
  } catch (error) {
  
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server');
});
}