from model.qna import get_answer
import sys

if __name__ == '__main__':
    if sys.argv[1] == 'model-test':
        get_answer("How do I create a new knowledge base for custom question answering?")
