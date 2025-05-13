import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizGenerator = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = ''; // Add your Gemini API key

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    loadCourses();
  }, []);

  const generateQuiz = async () => {
    if (!selectedCourse) {
      setError('Please select a course.');
      return;
    }

    setLoading(true);
    setError(null);
    setSubmitted(false);
    setQuizQuestions([]);
    setUserAnswers({});
    setScore(0);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `Generate 5 multiple-choice quiz questions about "${selectedCourse}". 
Respond in the following JSON format:

[
  {
    "question": "Question text",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct Option"
  }
]`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      const jsonStart = responseText.indexOf('[');
      const jsonEnd = responseText.lastIndexOf(']') + 1;
      const jsonString = responseText.substring(jsonStart, jsonEnd);
      const questions = JSON.parse(jsonString);

      setQuizQuestions(questions);
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (qIndex, option) => {
    setUserAnswers({ ...userAnswers, [qIndex]: option });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) correctCount++;
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  return (
    <div className="container mt-5 mb-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">🎓 AI-Powered Quiz Generator</h2>

          <div className="mb-3">
            <label className="form-label">Select Course</label>
            <select
              className="form-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Select a course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary mb-3"
            onClick={generateQuiz}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>

          {error && <div className="alert alert-danger">{error}</div>}

          {quizQuestions.length > 0 && (
            <div className="mt-4">
              <h4>Quiz Questions</h4>

              <div className="mt-4">
                {quizQuestions.map((q, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <p className="card-title fw-bold mb-2">
                        {index + 1}. {q.question}
                      </p>
                      <div>
                        {q.options.map((option, idx) => (
                          <div className="form-check" key={idx}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`question-${index}`}
                              id={`q${index}opt${idx}`}
                              value={option}
                              checked={userAnswers[index] === option}
                              onChange={() => handleOptionSelect(index, option)}
                              disabled={submitted}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`q${index}opt${idx}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>

                      {submitted && (
                        <div className="mt-2">
                          <span
                            className={`fw-bold ${userAnswers[index] === q.answer
                              ? 'text-success'
                              : 'text-danger'
                              }`}
                          >
                            {userAnswers[index] === q.answer ? 'Correct!' : 'Incorrect.'}
                          </span>
                          <div>
                            <small>
                              Correct Answer: <strong>{q.answer}</strong><br />
                              Your Answer: <strong>{userAnswers[index] || 'Not answered'}</strong>
                            </small>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!submitted && (
                <div className="text-end">
                  <button className="btn btn-success mt-3" onClick={handleSubmitQuiz}>
                    Submit Quiz
                  </button>
                </div>
              )}
              {submitted && (
                <div className="alert alert-info mt-3">
                  <h5>Your Score: {score} / {quizQuestions.length}</h5>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGenerator;
