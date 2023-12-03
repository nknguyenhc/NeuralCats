from markdown2 import markdown
import pdfkit
import os
from uuid import uuid4

def content_to_pdf(content, module, header, container):
    """Convert a content to a pdf file, upload it to azure blob service, and return the id of the pdf file.
    The input `content` (str) is part of the response obtained directly from openAI.
    The input `module` (str) indicates which module this content is for.
    The input `header` (str) is to indicate what part of the response it is (i.e. "Questions" or "Answer").
    The input `container` is the Azure container to upload to.
    Output: string, the id of the pdf file in Azure.
    """
    def html_to_pdf(html_content):
        pdfkit.from_string(html_content, "temp.pdf")
        file_id = str(uuid4())
        blob_client = container.get_blob_client(blob=f"{file_id}.pdf")
        with open("temp.pdf", "rb") as file:
            blob_client.upload_blob(file)
        return file_id
    
    content = f"""
# Module: {module}

Created by NeuralCats

## {header}

{content}
    """
    html_content = """<style>
        * {
            font-family: Georgia, serif;
        }

        div {
            font-size: 20px;
        }

        code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        }
    </style>""" + markdown(content)
    return html_to_pdf(html_content)
