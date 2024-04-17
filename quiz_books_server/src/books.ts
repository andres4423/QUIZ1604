import booksController from "./controller/booksController"
import bookExpress from "./express/express"
import booksModel from "./model/booksModel"
import booksView from "./view/booksView"


const server= new bookExpress(
    new booksView( 
        new booksController(
            new booksModel()
        )
        ),
    )
    
server.start()