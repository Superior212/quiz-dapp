import { useState, useEffect } from "react";

const useQuiz = (amount = 10, category = 18, difficulty = "") => {
  // State variables to manage questions, loading state, and errors
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch quiz questions from the API
  const fetchQuizQuestions = async (retryCount = 3) => {
    // Reset states before fetching
    setLoading(true);
    setError(false);
    setErrorMessage("");

    // Construct the API URL based on parameters
    let url = `https://opentdb.com/api.php?amount=${amount}&${category}&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    try {
      const res = await fetch(url);

      // Handle rate limiting (status 429)
      if (res.status === 429) {
        if (retryCount > 0) {
          console.log(
            `Rate limit hit, retrying... (${retryCount} retries left)`
          );
          // Commented out retry logic
          // setTimeout(() => fetchQuizQuestions(retryCount - 1), 2000);
          return;
        } else {
          throw new Error("Too many requests, please try again later.");
        }
      }

      // Check for other HTTP errors
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // Process and format the questions
      const formattedQuestions = data.results.map((q: any) => {
        // Decode and process incorrect answers
        const incorrect = q.incorrect_answers.map((ans: string) =>
          decodeURIComponent(ans)
        );
        // Decode correct answer
        const correct = decodeURIComponent(q.correct_answer);
        // Combine all options and randomize correct answer position
        const allOptions = [...incorrect];
        const randomIndex = Math.floor(Math.random() * (incorrect.length + 1));
        allOptions.splice(randomIndex, 0, correct);

        // Return formatted question object
        return {
          question: decodeURIComponent(q.question),
          options: allOptions,
          correctAnswer: correct,
        };
      });

      // Update state with formatted questions
      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (err: any) {
      // Handle and log any errors
      console.error("Failed to fetch questions:", err.message);
      setError(true);
      setErrorMessage(err.message || "An error occurred.");
      setLoading(false);
    }
  };

  // Effect hook to fetch questions when parameters change
  useEffect(() => {
    fetchQuizQuestions();
  }, [amount, category, difficulty]);

  // Return the state and fetch function for use in components
  return { questions, loading, error, errorMessage, fetchQuizQuestions };
};

export default useQuiz;
