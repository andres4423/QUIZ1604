import books from "../database/amazon_books.json"
import { bookInterface } from "../types/bookInterface";

export default class booksModel{
     getbooks = async (currentPage: number): Promise<{datos:bookInterface[]; total_books:number}> =>{
       const startIndex = (currentPage - 1 ) * 3
       const datos = books.slice(startIndex, startIndex + 3)
       const total_books = books.length;
       console.log(datos)
       return { datos, total_books }
     }

    // getbooks = async (currentPage: number): Promise<bookInterface[]> =>{
    //   const startIndex = (currentPage - 1 ) * 3
    //   const datos = books.slice(startIndex, startIndex + 3)
    //   const total_books = books.length;
    //   console.log(datos)
    //   return datos
    // }

    getAuthors = async (author: string): Promise<bookInterface[] | undefined> => {
      const booksbyauthor = (books as bookInterface[]).filter((book) => {
      return book.authors.includes(author)
      });
      console.log(booksbyauthor);
      return booksbyauthor;
    };
}
