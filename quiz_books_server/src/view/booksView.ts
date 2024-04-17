import { Router } from 'express'
import booksController from '../controller/booksController'
export default class booksView {
    router: Router
    constructor(private readonly booksController: booksController) {
        this.router = Router()
        this.routes()

    }

    routes = (): void => {
        this.router.get('/books', this.booksController.getBooks.bind(this.booksController))
         this.router.get('/books/:author', this.booksController.getAuthors.bind(this.booksController))
    }
  }
