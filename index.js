const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
app.use(cors());
app.use(express.json());

// connect database
//-------------------------
const uri =
  "mongodb+srv://dbuserjuel:Iiply5I7uHFZ7HtH@cluster0.o2iwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insert data to database
//------------------------
const run = async () => {
    try {

        await client.connect();
        const fruit = client.db("eFruits-Management").collection('fruits');

        app.get('/fruits', async (req, res) => {
            const query = {};
            const cursor = fruit.find(query);
            const fruits = await cursor.toArray();
            res.send(fruits);
        })

        app.post('/fruits', async (req, res) => {
            const newFruit = req.body;
            const result = await fruit.insertOne(newFruit);
            res.send(result);
            console.log(newFruit, 'added successfully');
        });
        //delete a fruitk
        app.delete('/fruits/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id) };
            const result = await fruit.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        console.log('Everythin is fine add an item.');
    }
}
run().catch(console.log)

// running the server 
//-------------------------------------
app.get('/', (req, res) => {
    res.send(" Server is running");
});

app.listen(port, () => {
    console.log('server is running on', port)
});

