import { QuizQuestion } from '../types';

export const PUZZLE_QUESTIONS: QuizQuestion[] = [
  {
    id: "system_design-uselayouteffect-runs-before-the-browser-paints",
    title: "useLayoutEffect runs before the browser paints.",
    prompt: "useLayoutEffect runs before the browser paints. \u2014 explain the behavior and mechanism.",
    level: "senior",
    type: "puzzle",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeSnippet: "useLayoutEffect(() => {\n  console.log(\"runs before paint\");\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "So React updates the DOM, then your effect runs, and only after that does the browser show anything.",
        isCorrect: true,
        explanation: "Correct: aligns with standard React, JavaScript, and algorithm principles."
      },
      {
        id: "B",
        text: "It is deprecated in modern React 18+ and should be replaced with direct imperative DOM manipulation.",
        isCorrect: false,
        explanation: "Incorrect: violates React declarative state paradigm."
      },
      {
        id: "C",
        text: "It executes strictly on background Web Worker threads outside of the main browser event loop.",
        isCorrect: false,
        explanation: "Incorrect: runs inside the standard main execution thread / reconciliation cycle."
      },
      {
        id: "D",
        text: "It is an exclusive feature of React Native for mobile and is unsupported in web browsers.",
        isCorrect: false,
        explanation: "Incorrect: fundamental to standard web development."
      }
    ],
    correctAnswer: "A",
    explanation: "So React updates the DOM, then your effect runs, and only after that does the browser show anything. Like this: Because of this, it is synchronous and blocks the UI until it finishes. So, how do they come in use? Imagine that you need to measure an element\ufffd\ufffd\ufffds size or adjust its position, If you use useEffect, the browser will first show the UI, and then your adjustment happens. Also, remember that this can cause a visible flicker. With useLayoutEffect, the adjustment happens before anything is shown, so the user never sees that intermediate state. Now, which one is best to use when? useEffect, in most cases! useLayouteffect, only when you need to make visual changes before the screen updates Here\ufffd\ufffd\ufffds what they can ask as a follow-up in interviews: Q. When can useLayoutEffect hurt performance? Your ans: Since it blocks painting, heavy or slow logic inside it can delay rendering and make the UI feel laggy. React MCQ Questions ______ is a necessary API for every React.js component. renderComponent render SetinitialComponent All of the above 2. React is mainly used for developing ______. Connectivity Database User interface Design platform 3. The Keys given to a list of elements in React should be ______. Not necessarily unique Unique among the siblings only Unique in the DOM (Document Object Model) None of the above 4. The number of elements that can be returned by a valid React component is ______. 5 1 3 2 5. What are the ReactJS limitations? React will use inline templating and JSX which might seem awkward to a few developers ReactJS is only for the view layer of the application, which means we will make use of other technologies as well for getting complete tooling set for the application development The React library is too large All of these 6. What function will permit for rendering the React content in an HTML page? React.render() ReactDOM.start() React.mount() ReactDOM.render() 7. What is meant by the state in React? Internal storage of component External storage of component Permanent storage None of the above 8. What is React or ReactJS? Component-based Javascript library Javascript framework Javascript file None of the above 9. What is the declarative approach for rendering a dynamic list of components depending on array values? Using <Each/> component Using reduce array method Using Array.map() method Using for or while loop 10. What is the usage of setState? Replacing the state fully instead of the default merge action Accessing the earlier state before the setState operation Invoking the code after the setState operation is performed None of these 11. What is used for passing the data to a component from outside? Render with arguments setState PropTypes props 12. Which command can be used for the creation of React app? npm install create-react-app install -g create-react-app npm install -g create-react-app None of the above 13. Which of the following comes under the advantages of React? Integration with other frameworks (like BackboneJS, Angular, etc.) becomes easier because it is only a view library Increases the performance of an application using Virtual DOM Can render both on server and client side All of the above 14. Which of the following statements related to the \ufffd\ufffd\ufffdwebpack\ufffd\ufffd\ufffd command is true? It runs React local development server It is used to transpile all the JavaScript into a single file It is a module bundler None of the above 15. ______ will help to keep the data unidirectional in React. Dom Props JSX Flux Excel at your interview with Masterclasses Know More Certificate included What will you Learn? I wish to receive further updates and confirmation via whatsapp Register Now For FREE! Powered By You Have Successfully registered! Join our WhatsApp group for free learning material and session link. Download the AppGet access to free exclusive resources under one roof!Get Access to 250+ Guides with Scaler Mobile App!Experience free learning content on the Scaler Mobile AppVideo CoursesExclusive EventsInterview GuidesFree Lectures4.5Rating100K+DownloadsDownload App Blog Community About Us FAQ Contact Us Terms Privacy Policy Practice Questions Programming Scripting System Design Databases Puzzle Fast Track Courses Python Java C++ Javascript Online Interviewbit Compilers Online C Compiler Online C++ Compiler Online Java Compiler Online Javascript Compiler Online Python Compiler Interview Preparation Top Interview Questions Language, Tools & Technologies Java Interview Questions Sql Interview Questions Python Interview Questions Javascript Interview Questions Angular Interview Questions Networking Interview Questions Selenium Interview Questions Data Structure Interview Questions Data Science Interview Questions System Design Interview Questions Hr Interview Questions Html Interview Questions C Interview Questions View All Companies Amazon Interview Questions Facebook Interview Questions Google Interview Questions Tcs Interview Questions Accenture Interview Questions Infosys Interview Questions Capgemini Interview Questions Wipro Interview Questions Cognizant Interview Questions Deloitte Interview Questions Zoho Interview Questions Hcl Interview Questions View All Top Articles Highest Paying Jobs In India Exciting C Projects Ideas With Source Code Top Java 8 Features Angular Vs React 10 Best Data Structures And Algorithms Books Exciting C Projects Ideas With Source Code Best Full Stack Developer Courses Best Data Science Courses Python Commands List Data Scientist Salary Maximum Subarray Sum Kadane\ufffd\ufffd\ufffds Algorithm View All Top Cheat Sheet Python Cheat Sheet C++ Cheat Sheet Javascript Cheat Sheet Git Cheat Sheet Java Cheat Sheet View All Top MCQ Java Mcq Data Structure Mcq Dbms Mcq C Programming Mcq C++ Mcq Python Mcq Javascript Mcq View All Unlock the complete InterviewBit experience for free Sign Up Using Or use email 1 Million + Strong Tech Community 500 + Questions to Practice 100 +",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useLayoutEffect runs before the browser paints..",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useLayoutEffect runs before the browser paints..",
    hints: [
      "Consider the core principles and trade-offs of useLayoutEffect runs before the browser paints.."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 4
  }
];
