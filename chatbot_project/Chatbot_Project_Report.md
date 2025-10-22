                  Accessible Math Voice Assistant Project Report


1. Project Overview

This project implements a web-based Accessible Math Voice Assistant. It allows users to interact with the assistant using their voice to perform basic arithmetic operations. The application is designed to be user-friendly and accessible, providing spoken feedback for calculations.

2. Technologies Used

The project utilizes a combination of frontend and backend technologies:

Frontend:
    *  HTML5: For structuring the web page content.
    *  CSS3 (Bootstrap 5.3.3): For styling and responsive design.
    *  JavaScript: Handles client-side logic, including Web Speech API for speech recognition and SpeechSynthesis API for text-to-speech. It also manages communication with the backend.

*   Backend:
    *   Python (Flask): A micro web framework used to serve the frontend files and process mathematical requests received from the client-side JavaScript.

3. Features

*  Voice Activation: The assistant activates upon hearing the wake word "hello".
*  Speech Recognition: Converts user's spoken math questions into text.
*  Speech Synthesis: Provides spoken responses for calculations and interactions.
*  Basic Arithmetic Operations: Supports addition, subtraction, multiplication, and division.
*  Spelled-out Number Recognition: Can interpret numbers spoken as words (e.g., "two", "three") and convert them to digits for calculation.

4. How to Run the Project

To set up and run the Accessible Math Voice Assistant on your local machine, follow these steps:

4.1. Prerequisites

*   Python 3.x installed.
*   `pip` (Python package installer) available in your environment.

4.2. Setup Instructions

1.  Navigate to the project directory:
    Open your terminal or command prompt and change the directory to where the `chatbot_project` folder is located:

    cd C:\Users\sheki\chatbot_project

2.  Install Python Dependencies:
    Install the required Python packages (Flask) using `pip`. If `pip` is not directly recognized, try `python -m pip`:
    pip install -r requirements.txt
or if pip is not in PATH:
python -m pip install -r requirements.txt


3.  Run the Flask Application:
    Start the Flask development server:
    python app.py
    You should see output indicating that the Flask server is running, typically on `http://127.0.0.1:5000/`.

4.  Access the Application:
    Open your web browser and navigate to the address provided by the Flask server (e.g., `http://127.0.0.1:5000/`).

4.3. Interaction

*   Click the microphone button.
*   Say "hello" to activate the assistant.
*   Once activated, ask a math question (e.g., "add two and three", "multiply five by six").
*   The assistant will speak the answer and display it in the conversation log.

5. Current Limitations

*   Limited Number Word Recognition: The current implementation only recognizes number words up to twenty. More complex number phrases (e.g., "twenty-one", "one hundred") are not yet supported.
*   Basic Operations Only: The assistant is limited to simple addition, subtraction, multiplication, and division. It does not support more advanced mathematical functions or complex equations.
*   Error Handling: While basic error handling for division by zero and microphone access is present, more robust error management could be implemented.
*   User Interface: The UI is functional but basic. Further enhancements could improve the visual appeal and user experience.
