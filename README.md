# NeuralCats

Project submission for Microsoft AI Classroom Hackathon. More info on the hackathon can be found [here](https://microsoftaiclassroom.devpost.com/)

## Development

### Backend

1. Install the required Python requirements: `pip install -r requirements.txt`.
2. Ensure that you have created an [Azure Language Resource](https://portal.azure.com/?quickstart=true#create/Microsoft.CognitiveServicesTextAnalytics).
3. Retrieve the endpoint and an API key from your Azure Language Resource. Put them into an `.env` file in the `backend` folder.
4. Ensure that you have created an [Custom Question Answering knowledge base](https://language.azure.com/).
5. Put the knowledge base name into the `.env` file in the `backend` folder.
At this point, your `.env` file should look something like this:
```
ENDPOINT=https://{YOUR SERVICE ENDPOINT}.cognitiveservices.azure.com/
APIKEY={YOUR API KEY}
KNOWLEDGE_BASE={YOUR PROJECT NAME}
```
6. To test out the sample qna, modify the question in `index.py` and run `python index.py model-test`. Note that the answer you receive depends on the knowledge base that you have.

References: 
* [Question answering quickstart](https://learn.microsoft.com/en-us/azure/ai-services/language-service/question-answering/quickstart/sdk?tabs=windows&pivots=programming-language-python)
* [Knowledge base quickstart](https://learn.microsoft.com/en-us/azure/ai-services/language-service/question-answering/how-to/create-test-deploy)
