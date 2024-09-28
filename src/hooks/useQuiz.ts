import { useState, useEffect } from "react";

const useQuiz = (amount = 10, category = 18, difficulty = "") => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchQuizQuestions = async (retryCount = 3) => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    let url = `https://opentdb.com/api.php?amount=${amount}&${category}&type=multiple`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;

    try {
      const res = await fetch(url);

      // Check if the status is 429 (Rate limit exceeded)
      if (res.status === 429) {
        if (retryCount > 0) {
          console.log(
            `Rate limit hit, retrying... (${retryCount} retries left)`
          );
          //   setTimeout(() => fetchQuizQuestions(retryCount - 1), 2000); // Retry after 2 seconds
          return;
        } else {
          throw new Error("Too many requests, please try again later.");
        }
      }

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // Process questions
      const formattedQuestions = data.results.map((q: any) => {
        const incorrect = q.incorrect_answers.map((ans: string) =>
          decodeURIComponent(ans)
        );
        const correct = decodeURIComponent(q.correct_answer);
        const allOptions = [...incorrect];
        const randomIndex = Math.floor(Math.random() * (incorrect.length + 1));
        allOptions.splice(randomIndex, 0, correct);
        return {
          question: decodeURIComponent(q.question),
          options: allOptions,
          correctAnswer: correct,
        };
      });

      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch questions:", err.message);
      setError(true);
      setErrorMessage(err.message || "An error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizQuestions();
  }, [amount, category, difficulty]);

  return { questions, loading, error, errorMessage, fetchQuizQuestions };
};

export default useQuiz;
