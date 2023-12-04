def response_to_json(response):
    json = {"questions": [], "answers": []}

    idx = response.find("Answer Key:")
    questions = response[10:idx]
    answers = response[idx+11:]

    questions = [q.strip() for q in questions.split('\n\n') if q.strip()]

    for q in questions:
        q_dict = {"question": q.split('\n', 1)[0].strip(), "options": [opt.strip() for opt in q.split('\n')[1:]]}
        json["questions"].append(q_dict)

    answers = [ans[-1] for ans in answers.split('\n') if ans.strip()]

    json["answers"] = answers
    return json