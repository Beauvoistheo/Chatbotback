const dialogs= require("../../dialog.json")
const Chat = require("../../Chat")

const dialogcontroller ={
    home :  (req, res) => {
        res.send('Hello World !')
    },

    test :  (req, res) => {
        res.send('Hello Test !')
    },

    findAllQuestion: async (req, res)=>
    {
        const allchats = await Chat.findAll();
        res.status(200).json({
            data: allchats
        })
    },
    createchat : async (req, res)=>
    {
        const chat = Chat.build({ question: req.body.question, answer: req.body.answer});
        (async function save(){
            await chat.save();
            console.log(chat);
            console.log('Chat was saved to the database!');
        })()
        res.status(200).json({
            message: "created"
        })
    },

    updatechat: async(req,res)=>
    {
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
    },

    deletechat : async(req, res) => {
        const deletechat = await Chat.destroy({
            where: {
                id: req.body.id
            }
            
        });
        console.log('Chat was deleted to the database!');
        res.status(200).json({
            message: "deleted"
        })
    },
    answer: (req, res)=>{
        const dialog = dialogs.find(dialog => dialog.id === parseInt(req.params.id))
        console.log(req.params.id)
        if(!dialog) return res.status(404).send()
        res.json(dialog)
    }

}

module.exports=dialogcontroller