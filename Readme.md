# TDC React Template

React on Vite with Node.js, Express and MongoDB. With a command line creation script.

## Development

Program Located in frontend and backend

Using Nx,React18, Vite, React-Redux, MUI JoyUI, TailwindCSS, React Router 6

To Install Dependencies

```
npm install
```

Run

```
npm run dev
```

## Run the Command

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

This made for firstly served in Thai, If you want to implement this into another language, feel free to fork and modify it!

It will generate all the files that you want. 😲😳 For Example
The Model File, the controller file, Create\_\_\_\_.jsx File and also import them to correct directory.

## Deployment

To use the deployment can create docker image or using this docker image in this GitHub Package Registry

---

Create With 🩷 From Theethawat & [TheDuckCreator](https://theduckcreator.in.th)
