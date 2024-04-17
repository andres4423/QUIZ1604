import { Router } from 'express'
import booksController from '../controller/booksController'
export default class booksView {
    router: Router
    constructor(private readonly booksController: booksController) {
        this.router = Router()
        this.routes()

    }

    routes = (): void => {
        this.router.get('/books', this.booksController.getReferences.bind(this.booksController))
         this.router.get('/books/:author', this.booksController.getAuthors.bind(this.booksController))
    }

//     printBooks = (book: bookInterface) =>{
//         return`
//         <div class="book-container">
//         <div class="row">
//           <div class="col-md-4">
//             <img src="https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg" class="img-fluid" alt="Portada del Libro">
//           </div>
//           <div class="col-md-8">
//             <h2>${book.title}</h2>
//             <p><strong>ISBN:</strong> ${book.isbn}</p>
//             <p><strong>Authors:</strong> ${book.authors}</p>
//             <p><strong>Published Date:</strong> ${book.publishedDate}</p>
//             <p><strong>Page Count:</strong> ${book.pageCount}</p>
//             <h4>Short Description:</h4>
//             <p>${book.shortDescription}</p>
//             <h4>Long Description:</h4>
//             <p>${book.longDescription}</p>
//             <h4>Categories:</h4>
//             <ul>
//               <li>Open Source</li>
//               <li>Mobile</li>
//             </ul>
//             <a href="#" class="btn btn-primary mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
// <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
// </svg>Comprar</a>
//           </div>
//         </div>
//       </div>`
//     }
}
