npm init -y
npm i
npm install typescript

mkdir -p src docs build test config
touch src/index.ts
touch .gitignore
echo 'node_modules' >> .gitignore

mkdir -p src/controller src/model src/view src/types
touch src/controller/indexController.ts
touch src/model/indexModel.ts
touch src/view/indexView.ts
touch src/types/indexInterface.ts

npx tsc --init
