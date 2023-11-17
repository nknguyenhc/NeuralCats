from azure.core.credentials import AzureKeyCredential
from azure.ai.language.questionanswering import QuestionAnsweringClient
import os
from dotenv import load_dotenv

load_dotenv()

def get_answer(question):
    with QuestionAnsweringClient(os.environ.get("ENDPOINT"), AzureKeyCredential(os.environ.get("APIKEY"))) as client:
        output = client.get_answers(
            question = question,
            project_name=os.environ.get("KNOWLEDGE_BASE"),
            deployment_name="production"
        )
    print("Q: {}".format(question))
    print("A: {}".format(output.answers[0].answer))
    print("Confidence Score: {}".format(output.answers[0].confidence))
