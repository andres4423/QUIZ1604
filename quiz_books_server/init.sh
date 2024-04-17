npm init -y
npm install express
npm install typescript ts-node-dev ts-node @types/node @types/express -D

mkdir -p src docs build test config
touch src/books.ts
touch .gitignore
touch ./config/.development.env
echo 'node_modules' >> .gitignore
echo 'PORT=3000' >> ./config/.development.env
echo 'HOST=localhost' >> ./config/.development.env

mkdir -p src/controller src/model src/view
touch src/controller/booksController.ts
touch src/model/booksModel.ts
touch src/view/booksView.ts

npx tsc --init

## "dev": "ts-node-dev --env-file=config/.development.env src/books.ts"
##habilitar el json si es necesario.
