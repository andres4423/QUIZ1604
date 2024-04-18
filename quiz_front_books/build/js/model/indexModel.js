var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class indexModel {
    constructor() {
    }
    getBook(currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const response = fetch(`http://localhost:3000/books?currentPage=${currentPage}`, {
                    method: 'GET',
                    headers: {
                        "Content-type": 'application/json'
                    }
                });
                response.then((data) => __awaiter(this, void 0, void 0, function* () {
                    resolve(data.json());
                    console.log(data);
                })).catch((error) => {
                    reject(error);
                });
            });
        });
    }
    ;
    searchAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log(author);
                const formattedAuthor = author.replace(/\s/g, "%20");
                console.log(formattedAuthor);
                const response = fetch(`http://localhost:3000/books/${formattedAuthor}`, {
                    method: 'GET',
                    headers: {
                        "Content-type": 'application/json'
                    }
                });
                response.then((data) => __awaiter(this, void 0, void 0, function* () {
                    resolve(data.json());
                    console.log(data);
                })).catch((error) => {
                    reject(error);
                });
            });
        });
    }
}
