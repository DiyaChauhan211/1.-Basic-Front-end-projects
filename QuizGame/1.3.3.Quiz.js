//This is a variable that contains test questions, options and correct answer
const questions = {
            Maths: [
              {q: "45 × 5 =", options: ["235", "230", "225", "245"], answer: "225" },
              {q: "2250 ÷ 2", options: ["1135", "1115", "1235", "1125"], answer: "1125"},
              {q: "1297 + 4536", options: ["5833", "5723", "5823", "5643"], answer:"5833"},
              {q: "2345 - 453", options: ["1892", "1732", "1882", "1982"], answer: "1892"},
              {q: "2 × (23 + 42+ 19)" , options: ["148", "168", "158", "164"], answer:"168" },
              {q: "4 ÷ (56 + (123-56))" , options: ["0.0325", "0.3252", "0.325", "0.03252"], answer: "0.03252" },
              {q: "23432 × (90 - 55)" , options: ["820,120", "830123", "821,020", "821,020" ], answer: "820,120" },
              {q: "125 + (90 × 5)" , options: ["565", "575", "585", "570"], answer: "575" },
              {q: "985 - (34 × 4)" , options: [ "839", "889","849", "848"], answer: "849" },
              {q: " (9656 - 23) ÷ 3" , options: ["3222", "3221","3211", "3233"], answer: "3211" }
            ],
            Science: [
              {q: "The chemical symbol for gold?", options:["Ag", "Au", "Gu", "Go"], answer:"Au" },
              {q: "The powerhouse of the cell?", options:["Nucleus", "Ribosome" ,"Mitochondria" ,"Chloroplast"], answer:"Mitochondria" },
              {q: "Gas essential for human respiration?", options:["Nitrogen", "Oxygen", "Carbon dioxide", "Helium"], answer:"Oxygen" },
              {q: "The force that attracts objects toward Earth?", options:["Friction", "Magnetism", "Gravity", "Tension"], answer:"Gravity" },
              {q: "The planet known as the Red Planet?", options:["Pluto", "Venus", "Saturn", "Mars"], answer:"Mars" },
              {q: "The largest organ in the human body?", options:["Liver", "Brain", "Skin", "Heart"], answer:"Skin" },
              {q: "The process by which plants make food?", options:["Digestion", "Photosynthesis", "Transpiration", "Respiration"], answer:"Photosynthesis" },
              {q: "The SI unit of electric current?", options:["Watt", "Ampere", "Ohm", "Volt"], answer:"Ampere" },
              {q: "The natural satellite of Earth?", options:["Moon","Sun", "Mars", "Venus"], answer:"Moon" },
              {q: "The hardest natural substance on Earth?", options:["Ruby", "Graphite","Diamond","Quartz"], answer:"Diamond" }

            ],
            Programming: [
              {q: "Which keyword is used to define a function in JavaScript?", options:["fun", "function", "define", "none"], answer:"function" },
              {q: "Which language is primarily used for styling web pages?", options:["JavaScript", "Python", "HTML","CSS"], answer:"CSS" },
              {q: "Which method is used to add an element at the end of an array in JavaScript?", options:["pop", "shift", "push", "unshift"], answer:"push" },
              {q: "Which keyword is used to declare a constant in JavaScript?", options:["const", "static", "let", "var"], answer:"const" },
              {q: "Which operator is used for strict equality in JavaScript?", options:["=", "==", "===", "!=="], answer:"===" },
              {q: "Which HTML tag is used to include JavaScript code?", options:["<script>", "<js>", "<javascript>", "<code>"], answer:"<script>" },
              {q: "Which loop executes at least once regardless of condition?", options:["for", "while", "do-while", "foreach"], answer:"do-while" },
              {q: "Which method converts a JSON string into a JavaScript object?", options:["JSON.stringify()","JSON.parse()", "JSON.object()", "JSON.convert()"], answer:"JSON.parse()" },
              {q: "Which symbol is used for single-line comments in JavaScript?", options:["//", "#", "<!-- -->", "<* *>"], answer:"//" },
              {q: "Which HTML attribute specifies an external CSS file?", options:["src", "href", "link", "rel"], answer:"href" },
            ]

          }

          //questions is an object with topics as keys, each key contains an array of question objects, 
          // and each question object has a string q, an array options, and a string answer.

          let currentTopic = "";
          let currentQuestions = [];
          let currentQuestionIndex = 0;
          let score= 0;

          function StartQuiz(){
            const topicSelect =document.getElementById("topic");
            currentTopic = topicSelect.value;
            if(!currentTopic){
                alert("Please select a topic!");
                return;
            }

            currentQuestions = questions[currentTopic];
            currentQuestionIndex = 0;
            score = 0;

            document.getElementById("topic-selection").classList.add("hidden");
            document.getElementById("quiz-area").classList.remove("hidden");

            ShowQuestion();
          }

          function ShowQuestion(){

            const questionObj = currentQuestions[currentQuestionIndex];
            const questionEl = document.getElementById("question");
            const optionsEl = document.getElementById("options");
            const nextBtn = document.getElementById("next-btn");
            const resultEl = document.getElementById("result");

            questionEl.textContent = questionObj.q;
            optionsEl.innerHTML = ""; 
            resultEl.textContent = "";
            nextBtn.classList.add("hidden");

            questionObj.options.forEach(option =>{
                const btn = document.createElement("button");
                btn.textContent = option;
                btn.classList.add("option-btn");
                btn.onclick = () => CheckAnswer(option);
                optionsEl.appendChild(btn);
            });
          }

          function CheckAnswer(selectedOption){
            const questionObj = currentQuestions[currentQuestionIndex];
            const resultEl = document.getElementById("result");
            const nextBtn = document.getElementById("next-btn");

            if(selectedOption === questionObj.answer){
              resultEl.textContent = "✅ Correct!";
              score++;
            }
            else{
              resultEl.textContent = `❌ Wrong! Correct Answer: ${questionObj.answer} `;
            }

            // Disable all options buttons after answering 

            document.querySelectorAll(".option-btn").forEach(btn => btn.disabled =true);
            nextBtn.classList.remove("hidden");
          }

          function NextQuestion(){
             currentQuestionIndex++;
             if(currentQuestionIndex < currentQuestions.length){
              ShowQuestion();
             }
             else{
              ShowResult();
             }

          }

          function ShowResult(){
            const quizArea = document.getElementById("quiz-area");
            quizArea.innerHTML = `
            <h2>Quiz Completed</h2>
            <p>Your Score: ${score} / ${currentQuestions.length}</p>
            <button onclick = "RestartQuiz()">Restart Quiz </button>
            `;
            //Using .innerHTML we can manipualate or modify HTML elements
          }

          function RestartQuiz(){
            currentTopic = "";
            currentQuestions = [];
            currentQuestionIndex = 0;
            score = 0;


            //show topic selection and hide quiz area 
            document.getElementById("topic-selection").classList.remove("hidden");
            document.getElementById("quiz-area").classList.add("hidden");

            //Reset Quiz area content

            document.getElementById("quiz-area").innerHTML = `
            <h2 id="question"></h2>
            <div id="options"></div>
            <button id="next-btn" onclick="NextQuestion()" class="hidden">Next</button>
            <p id="result"></p>
            `;
              
          }


        