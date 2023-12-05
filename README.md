# NeuralCats

Working prototype: [https://neuralcats.azurewebsites.net/](https://neuralcats.azurewebsites.net/)

Have you ever felt like you are unsure of your understanding of a module's content? And you wished that you could have a quiz to check your understanding? We are here to help you! With pre-built module content from various courses, our website can quickly generate a quiz for you!

This is a project submission for Microsoft AI Classroom Hackathon. More info on the hackathon can be found [here](https://microsoftaiclassroom.devpost.com/)

## Inspiration

As NUS students, we all feel that NUS sometimes does not provide enough practices for us for exams. Often times, we only have 1-2 past year papers that barely help us assess whether we are ready for the exams. What's worse, some of us find ourselves unable to grasp the concepts that the modules are teaching.

Some of us do try to use ChatGPT to consolidate our understanding. However, it does only provide explanation to our question, but does not provide further questions to check our understanding if we do not know how to craft our prompts.

That is why we developed NeuralCats! Using the power of OpenAI, we hope to systematically generate quizzes that check our understanding of the content taught in our modules. With a simple click, we can easily generate a quiz at our desired difficulty level and assess our understanding by checking our answers against the given answers.

## Features

### Generate module-specific quiz

Simply select the module of your choice, and the difficulty level, and click to get quiz! Our website would generate a quiz to test your understanding across all topics of a module!

What's more, you can save the PDF files of the quiz questions and answers, so that you may attempt the quiz at a later time.

### Save quizzes you created

Create an account on our website, and you can easily save quizzes you created and attempt them at a later time. In our dashboard, you can view all quizzes created by you, with their hyperlinks directly linked to the page with the quiz.

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
* Quizzes generated.

3. [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/)

The storage is used to store any user-uploaded files and app-generated files, to complement the database.

4. [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry)

Our app is deployed using Docker. The Docker container image is stored using this service.

5. [Azure App Service](https://azure.microsoft.com/en-us/products/app-service)

This service is used to serve our app. The server takes the Docker image from Azure Container Registry.

### Other techstacks

1. [FastAPI](https://fastapi.tiangolo.com/)

We use FastAPI to develop our backend, for its ease of user-input checking and auto-generated Swagger UI documentation and playground.

2. [React](https://react.dev/)

We use React framework to develop our frontend.

3. [Emotion CSS](https://emotion.sh/)

We use Emotion CSS to style our components, and create reusable style sheets.

4. [Redux](https://redux.js.org/)

We use Redux to store states that are shared across many sub-pages of our website.

5. [Docker](https://www.docker.com/)

We use Docker to deploy our app, due to its ability to separate the app's operation from an operating system, and as a result, we could test out locally whether our app works once deployed.

6. [wkhtmltopdf](https://wkhtmltopdf.org/)

This was used by [pdfkit](https://pypi.org/project/pdfkit/), a Python library converting HTML to PDF.

## Challenges and what we learned

### Azure services

For all of us, this is our first time using most of the Azure services. Due to lack of online examples on the usage, we had to continually look up for the documentation of the services.

### AI services

This is our first time integrating OpenAI into our project. We learned to use the API properly, and learned to craft our prompt in the exact way that give us the response that we want, with the right content and in the right format.

We considered alternative services offered by Azure:

* Azure Text Analytics: This was considered to be used to extract key phrases to form questions. However, we realised that the key phrases were not useful in crafting questions, and the extracted key phrases were not necessarily accurate.
* Azure Question Answering: This was considered for getting answer from a knowledge base. However, the service was unable to craft multiple-choice questions, as it was a service only to get an answer to a question. Furthermore, the limitation on the amount of knowledge we can store was not sufficient for us to put up a prototype.
* Azure Search Service: We considered using this to generate incorrect answers to a question. However, it was barely suitable.

In the end, we decided to use OpenAI, because it was capable of responding to almost any prompt. Hence, it was used to generate questions, generate incorrect choices to questions, and give the correct answers to the questions.

### Generate PDF

One of our app feature requires us to convert the generated questions and answers into PDF files. We decided to use Markdown language to format the response, and then convert it to PDF.

We struggled to find the appropriate library for conversion from Markdown language to PDF. In the end, we decided to use two separate libraries, to first convert Markdown to HTML, and then convert HTML to PDF.

### Docker and deployment

All of us had very little experience with deployment with Docker. However, thanks to the comprehensive instruction on deployment from [FastAPI official documentation](https://fastapi.tiangolo.com/deployment/docker/) and [Azure official instruction for deploying FastAPI application](https://learn.microsoft.com/en-us/azure/developer/python/tutorial-containerize-simple-web-app-for-app-service?tabs=web-app-fastapi), we were able to craft the proper Dockerfile to generate the Docker image.

Furthermore, our application requires wkhtmltopdf, which caused us huge issues when deploying with Docker. We managed to change our code so that it does not need to know where the binary file is located, and craft the installation instruction of the software in Dockerfile.

## What's next

### Better user dashboard

Our user dashboard currently consolidates the quizzes generated by a user. However, it does not store anything else about the quizzes other than the basic information of the quiz.

We plan to add user progress to each of the quizzes that a user has generated and attempted, including questions attempted and whether the user has checked answers. In this way, it provides a better dashboard for users to track their progress on their quizzes and thereby part of their learning progress.

Furthermore, we also plan to allow users to untrack quizzes, so that users can discard quizzes of the modules they have already finished.

### Better question generation

As of now, some of the questions generated might not necessarily be useful in assessing one's understanding of the module. This is because OpenAI tends to stick to the examples given in the lecture notes if no further prompting is made.

We plan to enhance our prompt to OpenAI, so that it can craft better questions.

### Automatic request processing

Currently, our app allows users to request for new modules to be included. Admins can review the modules and the associated files uploaded by the users, but there is no easy way to approve those request. Admins would have to download those files, manually extract texts from those files, and then consolidate and upload the texts to our database.

We plan to automate the approval process, by automatic conversion of files to text content, and automatic upload of the text content onto our database, once an admin has approved a request.

Furthermore, we plan to use better PDF readers, such as those that can perform OCR, so that a wider variety of materials can be accepted.

### User credentials

Similar to any other apps that have user handling, we plan to allow users to change username or password.

## Testing instructions

Head over to our working prototype located at [https://neuralcats.azurewebsites.net/](https://neuralcats.azurewebsites.net/) .

### Generate a new quiz

1. In the landing page, select the module dropdown. Select a module of your choice.
1. Adjust other settings to suit your preferences.
1. Click "Get quiz". Note that it might take up to 1 minute to generate a quiz.

The page should generate a quiz, and links to two PDF files, one with the questions and one with the answer. You may proceed to attempt the quiz on our website and check your answer on the spot, or save the questions and answers and attempt it at a later time.

### User dashboard

1. On the navbar on the left, click "Login".
1. Create a new account if you have not, or log in with your account credentials.
1. On the navbar on the left, click "Dashboard".

You should be able to view the quizzes that you generated, provided that the quizzes were generated when you were logged in. Clicking on the hyperlinks directs you to the page with the quiz itself where you can attempt the quiz.

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
