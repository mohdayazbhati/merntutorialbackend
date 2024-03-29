import connectToMongo from "./database/db.js";
import  express from "express";

import auth from './routes/auth.js';
import notes from "./routes/notes.js";
import cors from 'cors'

connectToMongo();

const app = express()
const port = 4000

//*moddleware

app.use(express.json());
app.use(
    cors({
        origin: 'https://merntutorialfrontend-sigma.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['content-type']
    })
)

//*route

// app.get('/', (req, res) => {
//     res.send('Mohd Ayaz Bhati')
// })

// app.get('/api/login', (req, res) => {
//     res.send('Hello Login!');
// })

// app.get('/api/signup', (req, res) =>{
//     res.send('Hello SignUp!');
// })


//Available Route
app.get('/', (req, res) => {
    res.json("eNotebook backend Api")
});
app.use('/api/auth', auth);
app.use('/api/notes', notes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
