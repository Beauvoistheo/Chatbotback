const dialogs= require("../../dialog.json")

const dialogcontroller ={
    home :  (req, res) => {
        res.send('Hello World !')
    },

    test :  (req, res) => {
        res.send('Hello Test !')
    },

    findAllQuestion: (req, res)=>
    {
        const questions = dialogs.map(({id, question}) => ({id, question}))
        res.json(questions)
    },

    answer: (req, res)=>{
        const dialog = dialogs.find(dialog => dialog.id === parseInt(req.params.id))
        console.log(req.params.id)
        if(!dialog) return res.status(404).send()
        res.json(dialog)
    }

}

module.exports=dialogcontroller