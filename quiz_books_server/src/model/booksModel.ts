import books from "../database/amazon_books.json"
import { bookInterface } from "../types/bookInterface";

export default class booksModel{
    getbooks = async (paginaActual: number): Promise<bookInterface[]> =>{
      const startIndex = (paginaActual - 1 ) * 3
      const datos = books.slice(startIndex, startIndex + 3)
      return datos

    }
    getAuthors = async (author: string): Promise<bookInterface[] | undefined> => {
      return (books as bookInterface[]).filter((book) => {
      return book.authors.includes(author)
      });
    };
}
