import indexController from "../controller/indexController";
import { bookInterface } from "../types/bookInterface";

export default class indexView{
private readonly contenedor_books: HTMLDivElement
private readonly search_bar: HTMLInputElement
private readonly form_search: HTMLFormElement
private controller: indexController | undefined
private readonly paginacion: HTMLUListElement

constructor(){
  console.log("Indexview")
this.contenedor_books = document.querySelector('#sec') as HTMLDivElement
this.search_bar = document.querySelector('#search_input') as HTMLInputElement
this.form_search = document.querySelector('#search_form') as HTMLFormElement
this.paginacion = document.querySelector('.pagination justify-content-center') as HTMLUListElement
}

public setController = (controller: indexController):void =>{
  this.controller = controller
}


public deploy(bookPromise: (Promise<bookInterface[]>)):void{

this.contenedor_books.innerHTML = ''
bookPromise.then((books)=>{
console.log(books);
const libros = books.books
libros.forEach((libro: bookInterface)=>{

this.contenedor_books.innerHTML += this.printBooks(libro)
})
}).catch((err)=>{
  console.error(err)
})
}

searchAuthor():void{
  this.form_search.addEventListener('submit',(event)=>{
  event.preventDefault()
    const valor_busqueda = this.search_bar.value
    console.log(valor_busqueda)
    this.controller?.sendData(valor_busqueda)
    });

}

printBooks = (book: bookInterface):string=>{
  const categoriesListItems = book.categories.map(category => `<li>${category.trim()}</li>`);
  const categorias =categoriesListItems.join("")
  return `
  <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="book-container">
          <div class="row">
            <div class="col-md-4">
              <img src="${book.thumbnailUrl}" class="img-fluid" alt="Portada del Libro">
            </div>
            <div class="col-md-8">
              <h2>${book.title}</h2>
              <p><strong>ISBN:</strong> ${book.isbn}</p>
              <p><strong>Authors:</strong> &nbsp${book.authors}</p>
              <p><strong>Published Date:</strong> ${book.publishedDate?.$date}</p>
              <p><strong>Page Count:</strong> ${book.pageCount}</p>
              <h4>Short Description:</h4>
              <p>${book.shortDescription}</p>
              <h4>Long Description:</h4>
              <p>${book.longDescription}</p>
              <h4>Categories:</h4>
              <ul>
                <li>${categorias}</li>
              </ul>
              <a href="#" class="btn btn-primary mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg>Comprar</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Formulario de preguntas -->
      <div class="col-md-4">
        <div class="question-form">
          <h3>Formulario de Preguntas</h3>
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" class="form-control" id="email" placeholder="Tu correo electrónico">
            </div>
            <div class="mb-3">
              <label for="contenido" class="form-label">Contenido:</label>
              <textarea class="form-control" id="contenido" rows="3" placeholder="Escribe tu pregunta aquí"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>
    </div>

  `
}
}
