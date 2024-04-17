import books from "../database/amazon_books.json"
import { bookInterface } from "../types/bookInterface";

export default class booksModel{
    getbooks = async (): Promise<bookInterface[]> =>{
        return books.slice(0,3)
    }

    getAuthors = async (author: string): Promise<bookInterface[] | undefined> => {
      return (books as bookInterface[]).filter((book) => {
      return book.authors.includes(author)
      });
    };
}
