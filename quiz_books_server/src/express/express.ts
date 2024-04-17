import express,{ Application } from "express"
import booksView from "../view/booksView"

export default class bookExpress{
    private readonly app: Application

    constructor(private readonly booksView: booksView){
        this.app = express()
        this.config()
        this.routes()
    }

    config=():void=>{
        this.app.use(express.json())
        this.app.use((req, res, next)=>{
          res.setHeader('Access-Control-Allow-Origin', '*'); 
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          next();
        })
    }

    routes=(): void =>{
         this.app.use('/', this.booksView.router)

        // this.app.use('*', this.errorView.router)
    }

    start= (): void=>{
        const PORT = process.env['PORT'] ?? 3000
        const HOST = process.env['HOST'] ?? 'localhost'
        this.app.listen(PORT, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`)
        })
    }
}
