const bodyParser = require("body-parser")
const express =require("express")
const router=express.Router()
const dialogcontroller= require('../../controller/v1/index')

const jsonParser = bodyParser.json()
/**
 * @swagger
 * /api/v1/:
 *  get:
 *    description: Home route
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/', dialogcontroller.home)
/**
 * @swagger
 * /api/v1/test:
 *  get:
 *    description: Test route
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/test",dialogcontroller.test)
/**
 * @swagger
 * /api/v1/dialog/questions:
 *  get:
 *    description: Use to request all questions
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/dialog",dialogcontroller.findAllQuestion)
router.post("/dialog", jsonParser, dialogcontroller.createchat)
router.put("/dialog", jsonParser, dialogcontroller.updatechat)
router.delete("/dialog", jsonParser, dialogcontroller.deletechat)
/**
 * @swagger
 * /api/v1/dialog/answer/{id}:
 *  get:
 *    description: Use to find dialog by id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the dialog
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Dialog not found
 */
router.get("/dialog/answer/:id",dialogcontroller.answer)

module.exports = router



