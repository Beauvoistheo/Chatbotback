const express = require('express')
const {Sequelize} = require("sequelize")
const Chat = require("./Chat")
const app = express()
const port = 3000
// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')
const { updatechat } = require('./controller/v1')

app.use(cors())

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Dialog API',
            description: 'Dialog API Information',
            contact: {
                name: 'Developer Name',
            },
            servers: ['http://localhost:3000'],
        },
    },
    apis: ['./routes/v1/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1', require('./routes/v1'))

app.get('*', (req, res) => {
    // res.status(404).json({message: 'Not found'}) bonne pratique
    res.sendFile(__dirname + '/view/404.html')
})
app.get('/allchat',(req,res)=>{
    res.status(200).json({
        data: [{question: "Comment ça va ?",anwser : "Bien et toi ?"}]
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})





app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome"
    })
})

app.get('/allchats', async (req, res) => {

    const allchats = await Chat.findAll();

    res.status(200).json({
        data: allchats
    })
})

app.post('/createchat', (req, res) => {
    const chat = Chat.build({ question: req.body.question, answer: req.body.answer});
    (async function save(){
        await chat.save();
        console.log(chat);
        console.log('Chat was saved to the database!');
    })()
    res.status(200).json({
        message: "created"
    })
}),

app.put('/updatechat', (req, res) => {
    const updatechat = Chat.update({ question: req.body.question, answer: req.body.answer}, {
        where: {
            id: req.body.id
        }
        (async function save(){
            await chat.save();
            console.log(chat);
            console.log('Chat was modified to the database!');
        })()
    });
    res.status(200).json({
        message: "updated"
    })
})



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
});

(async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

