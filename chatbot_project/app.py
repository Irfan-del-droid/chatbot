from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    text = data.get('text', '').lower()
    response = ''

    number_words = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
        'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
        'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17,
        'eighteen': 18, 'nineteen': 19, 'twenty': 20
    }

    # Replace number words with digits
    for word, digit in number_words.items():
        text = text.replace(word, str(digit))

    numbers = [float(s) for s in text.split() if s.replace('.', '', 1).isdigit()]

    if not numbers or len(numbers) < 2:
        response = 'Please provide two numbers.'
    else:
        a = numbers[0]
        b = numbers[1]

        if 'add' in text or 'plus' in text:
            response = f'{a} plus {b} is {a + b}'
        elif 'subtract' in text or 'minus' in text:
            response = f'{a} minus {b} is {a - b}'
        elif 'multiply' in text or 'times' in text:
            response = f'{a} multiplied by {b} is {a * b}'
        elif 'divide' in text or 'divided by' in text:
            if b != 0:
                response = f'{a} divided by {b} is {a / b:.2f}'
            else:
                response = f'{a} divided by {b} is undefined because division by zero.'
        else:
            response = 'Sorry, I can only help with add, subtract, multiply, or divide.'
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)