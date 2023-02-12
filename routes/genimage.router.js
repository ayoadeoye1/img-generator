import  express from "express";
import { OpenAIApi, Configuration } from "openai";

const router = express.Router();

router.post('/genimage', async(req, res) =>{
    try {
        const body  = req.body;
        const text = Object.keys(body)[0];
        
        const configuration = new Configuration({apiKey: process.env.APIKEY});
        const openai = new OpenAIApi(configuration)
        const imgData = await openai.createImage({
            prompt: text,
            n: 1,
            size: '512x512',
        });

        const imgurl = imgData.data.data[0].url;
        return res.status(200).json(imgurl);
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message);
    }
})

export default router;