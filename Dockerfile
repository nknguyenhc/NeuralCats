FROM python:3.8.18

WORKDIR /code

COPY ./backend/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir -r /code/requirements.txt

COPY ./backend /code/app

EXPOSE 80

CMD ["uvicorn", "app.index:app", "--host", "0.0.0.0", "--port", "8000"]
