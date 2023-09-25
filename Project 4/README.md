# Project 4: Evaluate a News Article with Natural Language Processing

## 1. Project Description

We will build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites.

Following are the project prerequisites:

-   Webserver - Node
-   Web application framework for routing - Express
-   Build tool - Webpack. Using webpack, we will set up the app to have dev and prod environments, each with their own set of tools and commands.
-   External script - Service Worker
-   External API - MeaningCloud

## 2. Setups

### Please install Node version 14 to run this project

-   After cloning this project, you will need to install everything

```
cd <project directory>
npm install
```

-   Create a `.env` file in root directory and fill out the API key get from [MeaningCloud](https://www.meaningcloud.com/developer/sentiment-analysis)

```
API_KEY=<Your API Key>
```

-   To build at development mode

```
npm run build-dev
```

-   To build at production mode

```
npm run build-prod
```

-   To start the server

```
npm run start
```

-   To run unit test

```
npm run test
```

## 3. Dependencies

You can find all the dependencies in file `package.json`.
