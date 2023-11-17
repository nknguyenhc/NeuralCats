# NeuralCats

Project submission for Microsoft AI Classroom Hackathon. More info on the hackathon can be found [here](https://microsoftaiclassroom.devpost.com/)

## Development

### Backend

1. Install the required Python requirements: `pip install -r requirements.txt`
1. Ensure that you have created an [Azure Language Resource](https://portal.azure.com/?quickstart=true#create/Microsoft.CognitiveServicesTextAnalytics)
1. Retrieve the endpoint and an API key from your Azure Language Resource. Put them into an `.env` file in the `backend` folder. Your `.env` file should look something like this:
```
ENDPOINT=https://{YOUR SERVICE ENDPOINT}.cognitiveservices.azure.com/
APIKEY={YOUR API KEY}
```
1. To test out the sample qna, modify the question in `index.py` and run `python index.py model-test`. Note that the answer retrieved may not be very good, because it is extracted only from a short paragraph. See `model/qna.py` file for more details.
