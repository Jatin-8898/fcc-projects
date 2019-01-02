// QUESTION ARRAYS 
const questions = [{
        question: 'Please Type Your Name'
    },
    {
        question: 'Kindly Enter Your Email',
        pattern: /\S+@\S+\.\S+/
    },
    {
        question: 'Your Age, Please?'
    },
    {
        question: 'Whats Your Current Position',
    },
    {
        question: 'Whats Are Your Interests ?',
    },
    {
        question: 'Anything else worth sharing',
       
    },
    {
        question: 'Have You read the TOS ?',
    }
];


// TRANSITIONS TIME 
const shakeTime = 100; //On Error
const switchTime = 200; //transition between Questions


// INIT POS AT FIRST QUESTION
let position = 0;

// INIT DOM ELEMENTS
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');


// GET QUESTION ON DOM LOAD SO ADDING EVENT OF DOMContentloaded
document.addEventListener('DOMContentLoaded', getQuestion);

// NEXT BUTTON CLICK WE WANT TO VALIDATE THE INPUT
nextBtn.addEventListener('click', validate);

// WHEN ENTER IS CLICKED WE WANT TO CALL THE SAME FUNC VALIDATE
inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        validate();
    }
});

// GET QUESTION FROM ARRAY & ADD TO THE UI
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;

    // Get Current Type if the type is not passowrd its text by default
    inputField.type = questions[position].type || 'text';

    // Get Current Answer
    inputField.value = questions[position].answer || '';

    // Focus On Element
    inputField.focus();

    // Set Progress Bar Width - Variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';

    // If the position is 0 then put user icon
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

// DISPLAY QUESTION TO USER
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}



// HIDE QUESTION FROM USER
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// TRANSFORM TO CREATE SHAKE MOTION
function transform(x, y) {
    //SINCE WE ARE USING ES6 WE ARE JUST PASSING THE X AND Y CORDINATES
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// VALIDATE FIELD
function validate() {

    // Make Sure Pattern Matches If There Is One
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// FIELD INPUT FAIL
function inputFail() {
    formBox.className = 'error';
    
    // Repeat Shake Motion -  Set i to number of shakes
    for (let i = 0; i < 2; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 2, 0, 0);
        inputField.focus();
    }
}

// FIELD INPUT PASSED
function inputPass() {
    formBox.className = '';
    //SETTIMEOUT TAKE 4 ARGU, (FUNC-NAME, TIMEOUT-IN-SECONDS, PARAM-1, PARAM-2) OF THE FUNC-NAME
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store Answer In Array
    questions[position].answer = inputField.value;

    // Increment Position
    position++;

    // If New Question, Hide Current and Get Next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove If No More Questions
        hideQuestion();
        
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form Complete
        formComplete();
    }
}

// ALL FIELDS COMPLETE - SHOW H1 END
function formComplete() {
    //CREATE A H1 TAG
    const h1 = document.createElement('h1');

    //ADD THE END CLASS IN THE CLASSLIST OF H1
    h1.classList.add('end');

    h1.appendChild(
        document.createTextNode(
            `Thanks ${
                questions[0].answer
            } You are registered, We will get in touch with you shortly!!`
        )
    );
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    
    }, 1000);
}