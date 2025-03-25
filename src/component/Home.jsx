import React, { useState, useEffect } from "react";
import { Button, Typography, Box, Radio, RadioGroup, FormControlLabel, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // For responsive confetti

const generateQuestion = (level) => {
  console.log("level = ", level);
  // Determine number ranges based on level
  const min = 10 ** (level - 1);  // Minimum value for the level
  const max = 10 ** level - 1;    // Maximum value for the level
  // Generate random numbers within the range
  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  // Define operators
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  // Create the question
  const question = `${num1} ${operator} ${num2}`;
  let answer = eval(question);  // Calculate answer
  answer = Math.round(answer * 100) / 100; // Round for precision
  // Generate random incorrect options
  const wrongAnswers = new Set();
  while (wrongAnswers.size < 3) {
    let incorrect = Math.round((answer + (Math.random() * 10 - 5)) * 100) / 100;
    if (incorrect !== answer) {
      wrongAnswers.add(incorrect);
    }
  }
  const options = [...wrongAnswers, answer].sort(() => Math.random() - 0.5); // Shuffle options
  return {
    question,
    answer,
    options,
  };
};

const Home = () => {
  const { width, height } = useWindowSize(); // Get window size for confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [timeLeft, setTimeLeft] = useState(level * 60); // 1-minute timer
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setMessage("⏳ Time's up! Try again!");
      setSeverity("error");
      setStarted(false);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const startGame = () => {
    setStarted(true);
    setScore(0);
    setCurrentIndex(0);
    setQuestions(Array.from({ length: 10 }, () => generateQuestion(level)));
    setMessage("");
    setTimeLeft(level * 60);
  };
  

  const checkAnswer = () => {
    if (parseFloat(selectedAnswer) === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
      setMessage("✅ Correct!");
      setSeverity("success");
    } else {
      setMessage(`❌ Wrong! The correct answer is ${questions[currentIndex].answer}`);
      setSeverity("error");
    }
    setSelectedAnswer("");

    if (currentIndex < 9) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (score >= 9) {  // Score is checked before last update
        let currentLevel = level+1;
        setMessage(`🎉 Congratulations! You've completed Level ${level} in ${level*60-timeLeft} seconds`);
        setSeverity("success"); 
        setTimeLeft(currentLevel * 60);
        setLevel((prev) => prev + 1);
        setStarted(false);
        setShowConfetti(true);
        setFadeOut(false); // Reset fade-out state
        setTimeout(() => setFadeOut(true), 7000); // Start fading after 7 sec
        setTimeout(() => setShowConfetti(false), 10000); // Stop confetti after 10 sec
      } else {
        setMessage("❌ You failed to complete this level. Try again!");
        setSeverity("error");
        setStarted(false);
        setScore(0);
      }
    }
  };

  const roundBoxStyle = {
    position: "fixed",
    top: "55%",
    transform: "translateY(-50%)",
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5, position: "relative" }}>
        {showConfetti && (
          <div
            style={{
              opacity: fadeOut ? 0 : 1,
              transition: "opacity 3s ease-out",
            }}
          >
            <Confetti width={width} height={height} />
          </div>
        )}
      <Typography variant="h5">Level {level}</Typography>
      {message && <Alert severity={severity}>{message}</Alert>}
      {started && (
        <>
          <Box sx={{ ...roundBoxStyle, left: "10px", backgroundColor: "#FF5555",}}>Q: {currentIndex + 1}/10</Box>
          <Box sx={{ ...roundBoxStyle, right: "10px", backgroundColor: "palegreen",}}>S: {score}/10</Box>
        </>
      )}

      {/* Timer */}
      <Typography variant="h6" sx={{ mt: 2, color: "red" }}>
        ⏳ Time Left: {timeLeft}s
      </Typography>

      {!started ? (
        <Button variant="contained" color="primary" onClick={startGame} sx={{ mt: 3 }}>
          Start Game
        </Button>
      ) : (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h2" sx={{ my: 2 , backgroundColor:"lightblue", padding:"15px;"}}>{questions[currentIndex].question}</Typography>
          
          {/* Options with Radio Buttons */}
          <RadioGroup value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}>
            {questions[currentIndex].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 1,
                  fontSize: "20px",
                }}
              />
            ))}
          </RadioGroup>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <IconButton
              color="success"
              onClick={checkAnswer}
              disabled={!selectedAnswer} // Disable if no answer is selected
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            > Send 
              <SendIcon sx={{ fontSize: 40}} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
