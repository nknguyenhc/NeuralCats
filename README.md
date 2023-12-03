# NeuralCats

Working prototype: [https://neuralcats.azurewebsites.net/](https://neuralcats.azurewebsites.net/)

Have you ever felt like you are unsure of your understanding of a module's content? And you wished that you could have a quiz to check your understanding? We are here to help you! With pre-built module content from various courses, our website can quickly generate a quiz for you!

This is a project submission for Microsoft AI Classroom Hackathon. More info on the hackathon can be found [here](https://microsoftaiclassroom.devpost.com/)

## Features

### Generate module-specific quiz

Simply select the module of your choice, and various other settings, and click to get quiz! Our website would generate a quiz to test your understanding across all topics of a module!

What's more, you can save the PDF files of the quiz questions and answers, so that you may attempt the quiz at a later time.

### Save quizzes you attempted

Create an account on our website, and you can easily save quizzes you created and attempt them at a later time. {To be added later ...}

### Request new modules

Of course, we ourselves cannot cover all modules available. We allow users to request for new modules, and admins can review them and add the content where appropriate.

## Techstacks

### Azure services

Below are the Azure services we have integrated into our app.

1. [OpenAI](https://platform.openai.com/docs/api-reference)

We use OpenAI API to send our module content, together with our crafted prompt, to generate a quiz for the module content.

2. [Azure Cosmos DB (NoSQL)](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/)

This is used as our database, to store user-uploaded data. Data stored includes:

* Modules and their content.
* User information, including username, hashed password and hashed user session.
* Module requests.

3. [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/)

The storage is used to store any user-uploaded files to complement the database.

4. [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry)

Our app is deployed using Docker. The docker container image is stored using this service.

5. [Azure App Service](https://azure.microsoft.com/en-us/products/app-service)

This service is used to serve our app. The server takes the Docker image from Azure Container Registry.

### Other techstacks

1. [FastAPI](https://fastapi.tiangolo.com/)
1. [React](https://react.dev/)
1. [Emotion CSS](https://emotion.sh/)
1. [Redux](https://redux.js.org/)

## Testing instructions

Head over to our working prototype located at [https://neuralcats.azurewebsites.net/](https://neuralcats.azurewebsites.net/) .

### Generate a new quiz

1. In the landing page, select the module dropdown. Select a module of your choice.
1. Adjust other settings to suit your preferences.
1. Click "Get quiz".

The page should generate a quiz, links to two PDF files, one with the questions and one with the answer. You may proceed to attempt the quiz on our website and check your answer on the spot, or save the questions and answers and attempt it at a later time.

### User dashboard

1. On the navbar on the left, click "Login".
1. Create a new account if you have not, or log in with your account credentials.

{To be added later ...}

### Upload a new module request

1. On the navbar on the left, click "Upload".
1. Fill in the module code or the fullname of the module.
1. Choose files and select the module materials from your file system.
1. Click submit.

A success message will popup, meaning that the request has been sent, and an admin will review your request.

### Review requests (admin)

Public admin account:
* Username: admin
* Password: admin123

1. Login with the admin credentials. Note that admin accounts cannot be created from our website interface.
1. On the navbar on the left, click "Requests".
1. Here, you can view the module requests from users and download the files to review.

## Development

### Backend

Notes:

* You should be in the `backend` folder to execute the following steps.
* If you have already had the `.env` file, you can skip steps 1-4.

1. Ensure that you have an OpenAI API key. You can obtain one [here](https://platform.openai.com/docs/api-reference). Note that if you want a free trial, you need a new OpenAI account created less than 3 months ago. Add the API key to your `.env` file with key `OPEN_API_KEY`.
1. Create a new Cosmos DB resource (NoSQL). Retrieve the cosmos host endpoint and the API key. Put, into the `.env` file, Cosmos host endpoint with key `COSMOS_HOST`, Cosmos API key with key `COSMOS_KEY`, Cosmos DB name with `COSMOS_DB_ID`.
1. Create a new Azure Blob Storage resource. Obtain the host endpoint and the API key. Put, into the `.env` file, host endpoint with key `STORAGE_NAME` and API key with key `STORAGE_CORR`.
1. Add key `ENV` with value `development` to your `.env` file.
1. Download `wkhtmltopdf` from its [official page](https://wkhtmltopdf.org/downloads.html), and ensure that it is in your `PATH`. You can test by opening your terminal, and key in command `wkhtmltopdf --version`.
1. Activate a new virtual environment for python.
1. Install the required python libraries with `pip install -r requirements.txt`.
1. Run command `uvicorn index:app --reload` to start the development server. Open `localhost:8000` in browser to confirm that the server is running.
1. To get currently available APIs, head to `localhost:8000/docs` (auto-generated by FastAPI)

Your `.env` file should look something like this:

```
ENV=development
OPENAI_API_KEY={YOUR OPENAI API KEY}
COSMOS_HOST=https://{YOUR COSMOS HOST ENDPOINT}.documents.azure.com:443/
COSMOS_KEY={YOUR COSMOS API KEY}
COSMOS_DB_ID={YOUR COSMOS DB NAME}
STORAGE_NAME=https://{YOUR STORAGE HOST ENDPOINT}.blob.core.windows.net
STORAGE_CORR={YOUR STORAGE API KEY}
```

**Folder structure**

* `model`: processes the query with the AI model, doing API call to OpenAI.
* `static`: static files, such as `.js` and `.css` files.
* `templates`: HTML files
* Other folders: each is responsible for a part of the backend.
  * `qna`: handles API calls related to QnA service.
  * `upload`: handles API calls related to module requests.
  * `users`: handles user authentication.

### Frontend

1. Install libraries with `npm i`.
1. Start the frontend react server with `npm start`.

**Folder structure**

In `src`:
* `fetch`: dealing with API call. Currrently, this only deals with POST http calls.
* `router`: React router.
* `components`: store reusable components.
* `redux`: Redux states. Currently, Redux states contain the available NUS modules fetched from backend, and user login states.

Remember to add the following line to the start of every `.tsx` file for EmotionCSS styling: 

```javascript
/** @jsxImportSource @emotion/react */
```

## Contributors

* [Nguyen Khoi Nguyen](https://github.com/nknguyenhc)
* [Kai Ting Ho](https://github.com/kaitinghh)
