import { Request, Response } from "express"
import booksModel from "../model/booksModel"


export default class PapersController {
    constructor(private readonly booksModel: booksModel) { }
    getReferences = (_req: Request, res: Response): void => {
        const references = this.booksModel.getbooks()
        references.then((books) => {
            res.status(200).json({ books })
        }).catch (() => {
            res.status(500).json({ message: 'error' })
        })
    }

    getAuthors = (req:Request, res: Response): void =>{
        const {author} = req.params
        if(author === undefined){
            res.status(400).json({message: 'author is required'})
            return
        }
        const reference = this.booksModel.getAuthors(author)

        reference.then((book)=>{
            res.status(200).json({book})
        }).catch(()=>{
            res.status(500).json({message: 'error'})
        })
    }
}
