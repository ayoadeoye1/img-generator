import  express from "express";
import { OpenAIApi, Configuration } from "openai";

// import { traffic } from "../models/traffic.js";

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

router.post('/gentext', async(req, res) =>{
    try {
        const body = req.body;
        const text = Object.keys(body)[0];

        const configuration = new Configuration({apiKey: process.env.APIKEY});
        const openai = new OpenAIApi(configuration)
        const resText = await openai.createCompletion({
            model: "text-davinci-003", //text-davinci-003  gpt-3.5-turbo
            prompt: text,
            max_tokens: 3000,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const textResp = resText.data.choices[0].text;

        return res.status(200).json({
            data: textResp,
            txt: text
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
})

// router.get('/traffic', async(req, res) =>{
//     await res.json(traffic);
// })

export default router;