# MERN Stack Template

React on Vite with Node.js, Express and MongoDB Template with a command line creation script.

## Inside Stack

- React 18 with Vite 5.2, React Redux, React Hook Form, React Router
- Tailwind CSS, MantineUI, and Tabler Icon
- Nx Monorepo Managment
- Backend with ESModule style with babel
- Express.js, Passport.js with Local Statergy, JWT
- MongoDB, Mongoose, and support MongoDB Aggregation

## Development

Program Located in packages

To Install Dependencies

```
npm install
```

Run

```
npm run dev
```

## Creating Using Just Command

We level 2 level, the model and module

When you want to create new Model and want Model, Controller, Routes, Actions, Views,Reducers .
Want page for Create, Update, and Delete are generated at one time. You can run this command.

```
 npm run init-model modelName -- -m moduleName --thai-name ชื่อในภาษาไทย
```

You need to npm i first

or example

```
 npm run init-model deparment -- -m management --thai-name ชื่อในภาษาไทย
```

- `-m` or `--module` is module name
- `-t` or `--thai-name` is the name of this model in Thai

Normally it will located in subfolder of `common` represent folder for main logic or general logic for all companies.
For a **company** specify logic please located in `specific` subfolder which is you can use

- `-s` or `--specific` argument in a command

This made for firstly served in Thai, If you want to implement this into another language, feel free to fork and modify it!

It will generate all the files that you want. 😲😳 For Example
The Model File, the controller file, Create jsx File and also import them to correct directory.

### What A Command do

If you crate model Product on module Inventory-Management We will Create

#### Backend

- **Product.js** - Model on folder model
- **product.controller.js** - Controller on folder controller
- **product.routes.js** - Router on folder routes
- Import product route in `api/index.js` What ever you are type, we will change to **PascalCase** for a model filename and model calling,
  **camelCase** for controller and router filename and caller inside, and **kebab-case** for routing path

#### Frontend

- **ProductAction.js** - Redux Action and also import and export to `index.js`
- **ProductReducer.js** - Reducer and also import to `reducer/index.js`
- Update data in **type.js** for redux (It will be converted to **CONSTANT_CASE** automatically)
- **ManagementProduct.jsx**, **CreateProduct.jsx**, **EditProduct.jsx**, **DetailProduct.jsx** in /views/moduleName and we also automatically import
- We import view to App.jsx main page and create their routes (we will convert routing to kebab-case automatically)
- **ProductForm.jsx** in `components/common/form` or it will be on `components/specific/form` if you pass `-s`

### Argument Option

- `-nm` or `--no-model` For Not create Model and so on with `-nc` or `--no-controller`, `-nr` or `--no-router`, `-na` or `--no-action`, `-nre` or `--no-reducer`, `-nv` or `--no-view`, `-nf` or `--no-form`
- If you use `--no` or `-n` argument above, Maybe after create a file when you run it can have some errors about file not found.

## Deployment

To use the deployment can create docker image or using this docker image in this GitHub Package Registry

---

Create With 🩷 From Theethawat & [TheDuckCreator](https://theduckcreator.in.th)
