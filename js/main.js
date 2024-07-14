document.addEventListener('DOMContentLoaded', () => {
   const quiz = document.querySelector('.quiz');
   const warning = document.querySelector('.warning');
   const btnNext = document.querySelector('.quiz__next-btn');

   let count = 0;
   let score = 0;

   if (typeof questions !== 'undefined' && questions.length > 0) {
       quiz.classList.remove('hidden');
       showQuestions(count);
   } else {
       warning.classList.remove('hidden');
   }

   btnNext.addEventListener('click', nextQuestion);

   function showQuestions(index) {
       const title = quiz.querySelector('.quiz__title');
       const list = quiz.querySelector('.quiz__list');
       const total = quiz.querySelector('.quiz__total');
       const progressBar = quiz.querySelector('.quiz__progress-inner');

       title.innerHTML = questions[index].question;

       list.innerHTML = '';
       questions[index].options.forEach(item => {
           const text = `<li class="quiz__option">${item}</li>`;
           list.insertAdjacentHTML('beforeend', text);
       });

       const options = quiz.querySelectorAll('.quiz__option');
       options.forEach(item => item.addEventListener('click', function () {
           optionSelected(this, index);
           // console.log(this);
       }));

       total.innerHTML = `${index + 1} из ${questions.length}`;

       progressBar.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`;

   }

   function optionSelected(answer, index) {
        const userAnswer = answer.textContent;
        const correctAnswer = questions[index].answer;
        const options = quiz.querySelectorAll('.quiz__option');
        const iconCorrect = `<span>&#10004;</span>`;
        const iconIncorrect = `<span>&#9940;</span>`;

        if (userAnswer === correctAnswer) {
            score++;
            answer.classList.add('correct');
            answer.insertAdjacentHTML('beforeend', iconCorrect);
        } else {
            answer.classList.add('incorrect');
            answer.insertAdjacentHTML('beforeend', iconIncorrect);

            options.forEach(item => {
                if (item.textContent === correctAnswer) {
                    setTimeout(() => {
                        item.classList.add('correct');
                        item.insertAdjacentHTML('beforeend', iconCorrect);
                    }, 300);
                }
            });
        }
        options.forEach(item => item.classList.add('disabled'));
   }

   function nextQuestion() {
       const result = document.querySelector('.result');
       const resultText = result.querySelector('.result__text');
       const option = quiz.querySelectorAll('.quiz__option');

       const checkOptionDisabled = Array.from(option).some(item => item.classList.contains('disabled'));

       if (checkOptionDisabled && count + 1 === questions.length) {
           quiz.classList.add('hidden');
           result.classList.remove('hidden');
           resultText.innerHTML = `Количество правильных ответов: ${count} из ${questions.length}`;
           return;
       }

       if (checkOptionDisabled) {
           count++;
           showQuestions(count);
       } else {
           alert('Выбери один из вариантов, а после переходи к следующему вопросу');
       }

   }


});


