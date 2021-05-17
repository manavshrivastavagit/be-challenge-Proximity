# Proximity Backend Engineering Challenge

## Problem Statement:

- You need to build a Rest API where an instructor and student manage their Webinars & Courses. A Creator can create course, subjects, tags and they can upload videos and webinars to the system. Lessons & webinars can be present in multiple courses and subjects. A Student can then search for webinars and/or videos using webinar title, video title, course name and subject name, and can filter using course, subjects and tags. Build the application keeping in mind that data duplicacy and time complexity should be minimized..

## User Stories
- As an instructor, I can upload a webinar.
- As an instructor, I can create, edit, delete course.
- As an instructor, I can create, edit, delete subjects.
- As an instructor, I can create, edit, delete tags.
- As an instructor, I can upload a video.
- As an instructor, I can add new tag while uploading video or webinar.
- As an instructor, I can see the most viewed videos, courses and webinars.
- As a student, I can see list of webinars & videos.
- As a student, I can search webinars & videos by title.
- As a student, I can filter webinars & videos by course, subjects, tags.
- As a student, when I am playing a video or a webinar, I can get personalized suggestions of courses/webinars.

## Software Requirements

- Node.js **8+**
- MongoDB **3.6+** (Recommended **4+**)

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "be-challenge-manav" to your project name.

```bash
git clone https://github.com/manavshrivastavagit/be-challenge.git ./be-challenge-manav
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## Project structure

```sh
.
├── app.js
├── package.json
├── .env
├── bin
│   └── www
├── controllers
├── models
├── services
├── routes
├── middlewares
├── test
└── public
    ├── index.html
    └── stylesheets
        └── style.css
```

## How to run

### Running API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```

**Note:** `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/` and add it in `/routes/api.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.

## Tests

### Running Test Cases

```bash
npm test
```

You can set custom command for test at `package.json` file inside `scripts` property. You can also change timeout for each assertion with `--timeout` parameter of mocha command.

### Creating new tests

If you need to add more test cases to the project just create a new file in `/test/` and run the command.

## ESLint

### Running Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.


