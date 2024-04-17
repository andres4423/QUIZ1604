import { Request, Response } from "express"
import booksModel from "../model/booksModel"


export default class PapersController {
    constructor(private readonly booksModel: booksModel) { }
    getBooks = (req: Request, res: Response): void => {
      const { paginaActual } = req.query
      let indexPage = 1
      if(paginaActual) {
          const pag = paginaActual.toString()
          indexPage = parseInt(pag)
      }

      const books = this.booksModel.getbooks(indexPage)

      books.then((books) => { 

          res.status(200).json({books: books})
      }).catch((e) => {
          res.status(500).json({error: e})
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
