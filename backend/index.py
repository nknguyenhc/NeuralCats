from model.qna import get_answer
import sys

if __name__ == '__main__':
    if sys.argv[1] == 'model-test':
        get_answer("How much battery do I have left?")
