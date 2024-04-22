import indexController from "../controller/indexController";
import { bookInterface } from "../types/bookInterface";

export default class indexView {
  private readonly contenedor_books: HTMLDivElement;
  private readonly search_bar: HTMLInputElement;
  private readonly form_search: HTMLFormElement;
  private readonly paginacion: HTMLUListElement;
  private controller: indexController | undefined;
  model: any;

  constructor() {
    this.contenedor_books = document.querySelector('#sec') as HTMLDivElement;
    this.search_bar = document.querySelector('#search_input') as HTMLInputElement;
    this.form_search = document.querySelector('#search_form') as HTMLFormElement;
    this.paginacion = document.querySelector('.pagination') as HTMLUListElement;
  }

  public setController = (controller: indexController): void => {
    this.controller = controller;
  }

  public deploy(bookPromise: Promise<bookInterface[]>, currentPage: number): void {
    this.contenedor_books.innerHTML = '';
    this.paginacion.innerHTML = '';

    bookPromise.then((books) => {
      const libros = books.datos;
      libros.forEach((libro: bookInterface) => {
        this.contenedor_books.innerHTML += this.printBooks(libro);
      });

      const totalBooks = books.total_books;
      const totalPages = Math.ceil(totalBooks / 3);
      const maxPagesToShow = 10;

      let startPage = 1;
      let endPage = Math.min(totalPages, maxPagesToShow);

      if (currentPage > Math.floor(maxPagesToShow / 2)) {
        startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      }

      // Anterior  boton
      if (startPage > 1) {
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = '<<';
        prevLink.href = '#';
        prevLink.addEventListener('click', () => {
          this.controller?.sendPage(currentPage - 1);
        });
        prevLi.appendChild(prevLink);
        this.paginacion.appendChild(prevLi);
      }

      // Agregar números
       for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) {
          li.classList.add('active');
        }
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = i.toString();
        a.href = '#';
        a.addEventListener('click', () => {
          this.controller?.sendPage(i);
        });
        li.appendChild(a);
        this.paginacion.appendChild(li);
      }

      // botón siguiente
      if (endPage < totalPages) {
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = '>>';
        nextLink.href = '#';
        nextLink.addEventListener('click', () => {
          this.controller?.sendPage(currentPage + 1);
        });
        nextLi.appendChild(nextLink);
        this.paginacion.appendChild(nextLi);
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  public deployAuthor(bookPromise: Promise<bookInterface[]>, currentPage: number): void {
    this.contenedor_books.innerHTML = '';
    this.paginacion.innerHTML = '';

    bookPromise.then((books) => {

      const libros = books?.books || [];
      libros.forEach((libro: bookInterface) => {
        this.contenedor_books.innerHTML += this.printBooks(libro);
      });

      const totalBooks = books?.total_books || 0;
      const totalPages = Math.max(Math.ceil(totalBooks / 3), 1); 
      const maxPagesToShow = 10;

      let startPage = 1;
      let endPage = Math.min(totalPages, maxPagesToShow);

      if (currentPage > Math.floor(maxPagesToShow / 2)) {
        startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      }

      // Anterior botón
      if (startPage > 1) {
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = '<<';
        prevLink.href = '#';
        prevLink.addEventListener('click', () => {
          this.controller?.sendPage(currentPage - 1);
        });
        prevLi.appendChild(prevLink);
        this.paginacion.appendChild(prevLi);
      }

      // Agregar números de página
      for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) {
          li.classList.add('active');
        }
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = i.toString();
        a.href = '#';
        a.addEventListener('click', () => {
          this.controller?.sendPage(i);
        });
        li.appendChild(a);
        this.paginacion.appendChild(li);
      }

      // Siguiente botón
      if (endPage < totalPages) {
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = '>>';
        nextLink.href = '#';
        nextLink.addEventListener('click', () => {
          this.controller?.sendPage(currentPage + 1);
        });
        nextLi.appendChild(nextLink);
        this.paginacion.appendChild(nextLi);
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  //envia el author
  public searchAuthor(): void {
    this.form_search.addEventListener('submit', (event) => {
      event.preventDefault();
      const valor_busqueda = this.search_bar.value;
      this.controller?.sendData(valor_busqueda);
    });
  }



  printBooks = (book: bookInterface): string => {
     const categoriesListItems = book.categories?.map(category => `<li>${category}</li>`).join('');

    const date = book.publishedDate?.$date ? new Date(book.publishedDate.$date) : new Date();
    const date2 = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
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
                <p><strong>Published Date:</strong> ${date2}</p>
                <p><strong>Page Count:</strong> ${book.pageCount}</p>
                <h4>Short Description:</h4>
                <p>${book.shortDescription}</p>
                <h4>Long Description:</h4>
                <p>${book.longDescription}</p>
                <h4>Categories:</h4>
                <ul>
                  <li>${categoriesListItems}</li>
                </ul>
                <a href="#" class="btn btn-primary mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                  </svg>Comprar
                </a>
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
    `;
  }
}
