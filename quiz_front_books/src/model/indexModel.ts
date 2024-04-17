import { bookInterface } from "../types/bookInterface";

export default class indexModel{
  constructor(){
  }

  public async getBook(): Promise<bookInterface[]>{
  return new Promise((resolve, reject) =>{
  const response = fetch("http://localhost:3000/books", {
    method: 'GET',
    headers: {
      "Content-type": 'application/json'
    }
  })
  response.then(async(data)=>{
   let books =  await data.json();
    let books2 = books.books;
    resolve(books2)
    }).catch((error)=>{
    reject(error)
  })
  })
  }

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
}
