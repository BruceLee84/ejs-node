const router = require('express').Router();
const bcrypt = require('bcrypt');

const userSchema = require('../model/user_schema');
const {joiSchema} = require('../middleware/validation');

router.post('/register', async (req, res)=>{
    try {
       const user = new userSchema(req.body)
       const data = await user.save()
       return res.json({status:'success', result:data})
    } catch (error) {
        return res.json({'status':'error found', 'message':error.message})
    }
})

router.get('/get', async (req, res)=>{
    try {
       const data = await userSchema.find()
       return res.json({status:'success', result:data})
    } catch (error) {
        return res.json({'status':'error found', 'message':error.message})
    }
})



router.get('/getAllpage', async(req, res)=>{
    try{

        const page = req.query.page;
        const size = req.query.size;

        // if(!page){

        // }

        let limits = parseInt(size);
        let skips = (page-1) * size

        const data = await userSchema.find().limit(limits).skip(skips);
         if(data.length){
            let total = await userSchema.countDocuments()
            return res.json({status:'success', page, size, total:total, result:data})
         }else{
            return res.json({status:'failed'})
         }
    }catch(error){
        return res.json({'status':'error found', 'message': error.message})
    }
})




























router.get('/getpage', (req, res)=>{
    try {
       userSchema.paginate({},{page:req.query.page, limit:req.query.limit}).then(data=>{
        console.log('data', data)
        return res.json({status:'success', result:data})
       }).catch(err=>{
        return res.send({err:err.message})
       })
    } catch (error) {
        return res.json({'status':'error found', 'message':error.message})
    }
})

module.exports = router;