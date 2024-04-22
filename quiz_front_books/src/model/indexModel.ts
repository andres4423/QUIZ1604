import { bookInterface } from "../types/bookInterface";

export default class indexModel{
  private cantidadLibros:number = 0;
  constructor(){
  }

  public async getBook(currentPage: number): Promise<bookInterface[]>{
  return new Promise((resolve, reject) =>{
  const response = fetch(`http://localhost:3000/books?currentPage=${currentPage}`, {
    method: 'GET',
    headers: {
      "Content-type": 'application/json'
    }
  })
  response.then(async(data)=>{
    let libros = await data.json()
    this.cantidadLibros = libros.total_books
    let books1 = libros.books
    resolve(books1)
    console.log(data)
   }).catch((error)=>{
     reject(error)
   })
 })
  };


   public async searchAuthor(author: string): Promise<bookInterface[]>{
     return new Promise((resolve, reject)=>{
      console.log(author);
      const formattedAuthor = author.replace(/\s/g, "%20");
        console.log(formattedAuthor);
       const response = fetch(`http://localhost:3000/books/${formattedAuthor}`, {
         method: 'GET',
         headers: {
           "Content-type": 'application/json'
         }
       })
       response.then(async(data)=>{
        resolve(data.json())
         console.log(data)
       }).catch((error)=>{
         reject(error)
       })
     })
   }

   public getTotal():number{
  return this.cantidadLibros;
   }
}
