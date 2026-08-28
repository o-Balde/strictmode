import { QuizQuestion } from '../types';

export const FIX_THE_BUG_QUESTIONS: QuizQuestion[] = [
  {
    id: "react-what-are-linters",
    title: "What are linters?",
    prompt: "What are linters?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "system-architecture",
    tags: [
      "react",
      "system-architecture",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Linters are tools used to check source code for potential errors, bugs, stylistic inconsistencies, and maintainability issues.",
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
    explanation: "Linters are tools used to check source code for potential errors, bugs, stylistic inconsistencies, and maintainability issues. They help enforce coding standards and ensure code quality and consistency across a codebase. Linters work by scanning the source code and comparing it against a set of predefined rules or guidelines. These rules can include syntax and formatting conventions, best practices, potential bugs, and code smells. When a linter identifies a violation of a rule, it generates a warning or an error, highlighting the specific line or lines of code that need attention. Using a linter can provide several benefits: Code Quality: Linters help identify and prevent potential bugs, code smells, and anti-patterns, leading to better code quality. Consistency: Linters enforce coding conventions and style guidelines, ensuring consistent formatting and code structure across the codebase, even when multiple developers are working on the same project. Maintainability: By catching issues early and promoting good coding practices, linters contribute to code maintainability, making it easier to understand, modify, and extend the codebase. Efficiency: Linters can save developers time by automating code review processes and catching common mistakes before they can cause issues during development or in production. Some popular linters are ESLint for JavaScript and Stylelint for CSS and Sass. Learn more",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are linters?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are linters?.",
    hints: [
      "Start from the constraint: how much data, how often it changes, and who reads it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://web.dev/articles/vitals"
  },
  {
    id: "system_design-what-architectural-solutions-for-react-do-you-know",
    title: "What architectural solutions for React do you know?",
    prompt: "What architectural solutions for React do you know?",
    level: "junior",
    type: "fix",
    category: "system_design",
    subject: "rendering-keys",
    tags: [
      "system_design",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "There are several architectural solutions and patterns for building React projects.",
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
    explanation: "There are several architectural solutions and patterns for building React projects. Some popular ones include: MVC (Model-View-Controller): MVC is a traditional architectural pattern that separates an application into three main components - Model, View, and Controller. React can be used in the View layer to render the UI, while other libraries or frameworks can be used for the Model and Controller layers. Flux: Flux is an application architecture introduced by Facebook specifically for React applications. It follows a unidirectional data flow, where data flows in a single direction, making it easier to understand and debug the application's state changes. Atomic Design: Atomic Design is not specific to React but is a design methodology that divides the UI into smaller, reusable components. It encourages building components that are small, self-contained, and can be composed to create more complex UIs. Container and Component Pattern: This pattern separates the presentation (Component) from the logic and state management (Container). Components are responsible for rendering the UI, while Containers handle the business logic and state management. Feature-Sliced Design: It is a modern architectural approach used to organize and structure React applications. It aims to address the challenges of scalability, maintainability, and reusability by dividing the application codebase based on features or modules.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What architectural solutions for React do you know?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What architectural solutions for React do you know?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "44-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "nextjs-what-is-feature-sliced-design",
    title: "What is Feature-Sliced Design?",
    prompt: "What is Feature-Sliced Design?",
    level: "intermediate",
    type: "fix",
    category: "nextjs",
    subject: "hooks",
    tags: [
      "nextjs",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It is a modern architectural approach used to organize and structure React applications.",
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
    explanation: "It is a modern architectural approach used to organize and structure React applications. It aims to address the challenges of scalability, maintainability, and reusability by dividing the application codebase based on features or modules. In Feature-Sliced Design, each feature or module of the application is organized into a separate directory, containing all the necessary components, actions, reducers, and other related files. This helps in keeping the codebase modular and isolated, making it easier to develop, test, and maintain. Feature-Sliced Design promotes a clear separation of concerns and encapsulates the functionality within individual features. This allows different teams or developers to work on different features independently, without worrying about conflicts or dependencies. I highy recommend to click on the Learn more button to learn about Feature-Sliced Design Learn more Learn more I strongly recommend reading the rest of my articles on frontend interview questions, if you haven't already. 52 Frontend Interview Questions - JavaScript Yan Levin, Aug 12 '23 41 Frontend Interview Questions - CSS Yan Levin, Aug 25 '23 15 Popular Common Frontend Interview Questions Yan Levin, Sep 17 '23 Conclusion In conclusion, interviewing for a React Frontend Developer position requires a solid understanding of the framework's core concepts, principles, and related technologies. By preparing for the questions discussed in this article, you can showcase your React knowledge and demonstrate your ability to create efficient and maintainable user interfaces. Remember to not only focus on memorizing answers but also understanding the underlying concepts and being able to explain them clearly. Additionally, keep in mind that interviews are not just about the technical aspects but also about showcasing your problem-solving skills, communication abilities, and how well you can work in a team. By combining technical expertise with a strong overall skill set, you'll be well-equipped to excel in React frontend developer interviews and land your dream job in this exciting and rapidly evolving field. Good luck! Interview Questions (6 Part Series) 1 52 Frontend Interview Questions - JavaScript 2 41 Frontend Interview Questions - CSS. 2 more parts. 3 15 Popular Common Frontend Interview Questions 4 44 React Frontend Interview Questions 5 30 Frontend Interview Questions - TypeScript 6 12 Interview Questions - Git The DEV Team Promoted Dropdown menu What's a billboard? Manage preferences Report billboard Building a viral IMAX ticketing app that never crashes 150,000 tickets to The Odyssey in 70mm IMAX sold out almost instantly, but seats keep opening back up at odd hours. IMAXXING watches every 70mm showing in the US and pings 9,000+ subscribers the moment a good one frees up. Breaking down the architecture: durable execution, the entity workflow pattern, and serverless Temporal workers on Cloud Run. Read more, Read More Top comments (23) Subscribe Personal Trusted User Create template Templates let you quickly answer FAQs or store snippets for re-use. Submit Preview Dismiss Collapse Expand Peter Vivo Peter Vivo Peter Vivo Follow The Vibe Archeologist. Creator of mordorjs. |> and touch bar fanatic from Hungary. God speed you! 1John1 + 5John17 |> 1Moses1 = (1Moses2. 4.22John21); alpha & omega = !![]; Location Pomaz Education streetwise Work full stack developer at TCS Joined Jul 24, 2020, Oct 13 '23 Dropdown menu Hide This list is cover near every area of react/nextjs programing. Expect using of typescript, which is mandatroy some company, but other company is avoide. In my CV, I try to avoide amount of question with start talk about my module for react state handling: react-troll is the old one which is work well on interview, because on every interview is turn to talk about that module ( 1.5 years ago ). Now I switch the solution from JS to TS and this module is much more simple - give answer to type guarded useReducer: react-state-factory. So I think this is will be help me when I will change to new work (already not). Like comment: Like comment: 2 likes Like Comment button Reply Collapse Expand Christian Cho Christian Cho Christian Cho Follow Joined Sep 17, 2023, Oct 13 '23, Edited on Oct 13, Edited Dropdown menu Hide I think this is great for more junior engineers as a way to test their understanding of how to execute a narrowly defined technical problem for a product feature. I would caution, though, on absolutism. For example: Extract reusable logic into the custom hook. Not always. I've seen cases where developers will write a custom hook to encapsulate some business logic, but in doing so will end up obfuscating important binding points to side effects. I prefer more explicit binding until it becomes clear that there's a shared understanding of those custom hooks. Props are read-only and cannot be changed. Not true. Props can be changed and the values in memory can be altered as JavaScript does not have protected values or properties unless using const primitives. Props can be changed directly, but they won't be reflected in the UI because doing so doesn't trigger a render. This can lead to odd behaviors and difficulty with debugging. This approach minimizes the number of actual DOM manipulations and improves the overall performance of the application. Virtual DOM implementations are actually slower than direct DOM manipulation. The virtual DOM exists as a solution for developers to write declarative code. The clear separation of the virtual DOM and the actual DOM is a way to reduce unintended side effects - it's a principle from functional programming. There are other examples, but for the sake of your readers, I'll stop here. Overall, this is a great resource for interviewing prep, but don't take it as an authoritative guide. I've seen too many opinionated junior and mid-level developers make blanket statements and I've rejected people after interviews because of it, especially if they're stubborn after correction. Like comment: Like comment: 4 likes Like Comment button Reply Collapse Expand Risha Risha Risha Follow Joined Sep 1, 2023, Oct 13 '23 Dropdown menu Hide Thank you very much! you've done a great job Like comment: Like comment: 3 likes Like Comment button Reply Collapse Expand Cezary Tomczyk Cezary Tomczyk Cezary Tomczyk Follow Joined Feb 23, 2023, Oct 13 '23 Dropdown menu Hide I think all the questions are too focused on low-level problems. I ask questions that are general challenges and try to make the question reflect the problem rather than a detailed description of how to do it. For example: \"How can individual components loosely communicate with each other?\" Such a question does not impose a solution, but rather motivates and discovers different solutions to the same question. Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Marco Marco Marco Follow Just a developer as you Location Berlin Work Developer Joined Feb 27, 2023, Oct 13 '23 Dropdown menu Hide Thank you very much for this article! It's like a reference for react questions, even if your not in an interview. So for me, learning react currently, it was very interesting and helpful to read and discover new and old thinks of react in a \"nutshell\". Thanks Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Pawe, Ciosek Pawe, Ciosek Pawe, Ciosek Follow software developer Location Warsaw, Poland Work Software developer Joined Jul 8, 2020, Oct 14 '23 Dropdown menu Hide Great Article! Thank you!, Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand Gulshan Negi Gulshan Negi Gulshan Negi Follow Software Developer Joined Sep 14, 2023, Oct 20 '23 Dropdown menu Hide Thanks a lot for sharing fantastic stuff here with us. Very detailed information with superb examples. I have also seen this post where the author listed 50 react interview questions with answers. Now I have found this one. Thanks Like comment: Like comment: Like Comment button Reply Collapse Expand olsard olsard olsard Follow Joined Apr 8, 2019, Oct 19 '23 Dropdown menu Hide Great article! Thank you! Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand emmanuel ikeleji emmanuel ikeleji emmanuel ikeleji Follow Wait for it! I'm coming up with the brightest imagination yet to be unveiled Joined Sep 28, 2023, Oct 15 '23 Dropdown menu Hide Bootstrap fra Like comment: Like comment: 1 like Like Comment button Reply Collapse Expand emmanuel ikeleji emmanuel ikeleji emmanuel ikeleji Follow Wait for it! I'm coming up with the brightest imagination yet to be unveiled Joined Sep 28, 2023, Oct 15 '23 Dropdown menu Hide Bootstrap frameworks with React seems very interesting Like comment: Like comment: 1 like Like Comment button Reply View full discussion (23 comments) Some comments have been hidden by the post's author - find out more Code of Conduct, Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink. Hide child comments as well Confirm For further actions, you may consider blocking this person and/or reporting abuse DEV Community Dropdown menu What's a billboard? Manage preferences Report billboard The data is in: AI is how developers learn now In Major League Hacking's latest Season Census, 75% of verified respondents said they use AI in some form to learn technical skills. That's ahead of YouTube (71%) and online courses (59%). AI is now the single most common way new developers learn. Read more, Yan Levin Follow Frontend Dev | Mentor | Open Source Contributor | 300k+ reads Location Georgia, Tbilisi Pronouns He/Him Joined Jul 18, 2023 More from Yan Levin How SkillHunt Uses Telegram for Faster Job Search From Idea to Alpha in 30 Days, Building SkillHunt as a Solo Founder Meet SkillHunt - a Career Platform for Developers The DEV Team Promoted Dropdown menu What's a billboard? Manage preferences Report billboard Hacktoberfest 2026: AI belongs to everyone We have some news we're excited to share today: Major League Hacking (MLH) and DEV are partnering with DigitalOcean to run Hacktoberfest 2026. This October, we, ll host over 300 in-person events (, Fests, ) plus a global online event, all about building with open source and open-weight AI. Read more, Kindness is contagious Dropdown menu What's a billboard? Manage preferences Report billboard If this **helped, please leave a, or a friendly comment! Okay DEV Community, A space to discuss and keep up software development and manage your software career Home DEV Challenges DEV++ Videos DEV Education Tracks DEV Help Advertise on DEV Organization Accounts DEV Showcase About Contact Free Postgres Database DEV Shop MLH Code of Conduct Privacy Policy Terms of Use Built on Forem, the open source software that powers DEV and other inclusive communities. Made with love and Ruby on Rails. DEV Community, 2016 - 2026. We're a place where coders share, stay up-to-date and grow their careers.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is Feature-Sliced Design?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is Feature-Sliced Design?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "44-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "algorithms-how-to-perform-automatic-redirect-after-login",
    title: "How to perform automatic redirect after login?",
    prompt: "How to perform automatic redirect after login?",
    level: "junior",
    type: "fix",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "junior"
    ],
    codeSnippet: "import React, { Component } from 'react'\nimport { Redirect } from 'react-router'\nexport default class LoginDemoComponent extends Component {\n render() {\n   if (this.state.isLoggedIn === true) {\n     return <Redirect to=\"/your/redirect/page\" />\n   } else {\n     return <div>{'Please complete login'}</div>\n   }\n }\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "The react-router package will provide the component <Redirect> in React Router.",
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
    explanation: "The react-router package will provide the component <Redirect> in React Router. Rendering of a <Redirect> component will navigate to a newer location. In the history stack, the current location will be overridden by the new location just like the server-side redirects. Conclusion React has got more popularity among the top IT companies like Facebook, PayPal, Instagram, Uber, etc., around the world especially in India. Hooks is becoming a trend in the React community as it removes the state management complexities. This article includes the most frequently asked ReactJS and React Hooks interview questions and answers that will help you in interview preparations. Also, remember that your success during the interview is not all about your technical skills, it will also be based on your state of mind and the good impression that you will make at first. All the best!! Useful References and Resources: \"Beginning React with Hooks \" book by Greg Lim, Learn React Hooks, book by Daniel Bugl Node.js vs React.js React Native Interview Questions Angular Interview Questions and Answers",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to perform automatic redirect after login?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to perform automatic redirect after login?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "performance-built-in-hooks-the-built-in-hooks-are-divided-into-2-pa",
    title: "Built-in Hooks: The built-in Hooks are divided into 2 parts as given below:",
    prompt: "Built-in Hooks: The built-in Hooks are divided into 2 parts as given below:, explain the behavior and mechanism.",
    level: "intermediate",
    type: "fix",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Basic Hooks: useState(): This functional component is used to set and retrieve the state.",
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
    explanation: "Basic Hooks: useState(): This functional component is used to set and retrieve the state. useEffect(): It enables for performing the side effects in the functional components. useContext(): It is used for creating common data that is to be accessed by the components hierarchy without having to pass the props down to each level. Additional Hooks: useReducer(): It is used when there is a complex state logic that is having several sub-values or when the upcoming state is dependent on the previous state. It will also enable you to optimization of component performance that will trigger deeper updates as it is permitted to pass the dispatch down instead of callbacks. useMemo(): This will be used for recomputing the memoized value when there is a change in one of the dependencies. This optimization will help for avoiding expensive calculations on each render. useCallback(): This is useful while passing callbacks into the optimized child components and depends on the equality of reference for the prevention of unneeded renders. useImperativeHandle(): It will enable modifying the instance that will be passed with the ref object. useDebugValue(): It is used for displaying a label for custom hooks in React DevTools. useRef(): It will permit creating a reference to the DOM element directly within the functional component. useLayoutEffect(): It is used for the reading layout from the DOM and re-rendering synchronously. 2. Custom Hooks: A custom Hook is basically a function of JavaScript. The Custom Hook working is similar to a regular function. The, use, at the beginning of the Custom Hook Name is required for React to understand that this is a custom Hook and also it will describe that this specific function follows the rules of Hooks. Moreover, developing custom Hooks will enable you for extracting component logic from within reusable functions.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Built-in Hooks: The built-in Hooks are divided into 2 parts as given below.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Built-in Hooks: The built-in Hooks are divided into 2 parts as given below.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "performance-what-is-the-context-api-when-should-you-use-it-instead",
    title: "What is the Context API? When should you use it instead of prop drilling?",
    prompt: "What is the Context API? When should you use it instead of prop drilling?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Prop drilling is the pattern of passing on data from the parent component through several levels down to the nested child component, but its process makes the code harder to maintain and debug.",
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
    explanation: "Prop drilling is the pattern of passing on data from the parent component through several levels down to the nested child component, but its process makes the code harder to maintain and debug. To avoid such problems, Context API, which is a built-in feature in React, helps in passing on the data, but without having to go through every level. This is how it works: You create a context using React.createContext(), then wrap part of your app with a Provider, and lastly, consume the value using useContext() Now, how does this actually help? For example: current user (auth) theme (dark/light) language/locale These are values that are needed across many components at different levels. Passing them manually quickly becomes messy, so Context helps in keeping it cleaner. But here, s where it gets a little confusing, Context is not meant for everything. If the data changes very frequently, such as form input or animations, then Context might even end up hurting the performance. And why is that? Because whenever the context value changes, all components consuming it re-render. So the better way to understand this is that you can use Context for global, relatively stable data and keep local or frequently changing state inside components. You can also split contexts based on how often they update, instead of putting everything into one. That, s the difference between Context and Redux! Context is built into React and works well for simpler cases. Redux, on the other hand, adds things like middleware, devtools, better control over updates, but it also comes with more setup. You can be asked some follow-up questions here, like: Q. What happens if Context values change frequently? Your ans: All consuming components re-render. Q. How do you optimize it? Your ans: I split contexts based on their use and memoize the value passed to the Provider.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Context API? When should you use it instead of prop drilling?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Context API? When should you use it instead of prop drilling?.",
    hints: [
      "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/reference/react/useContext"
  },
  {
    id: "performance-what-is-the-purpose-of-the-key-prop-in-react",
    title: "What is the purpose of the key prop in React?",
    prompt: "What is the purpose of the key prop in React?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "{  items.map((item) => <ListItem key={item.id} value={item.value} />);}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "In React, the key prop is used to uniquely identify elements in a list, allowing React to optimize rendering by updating and reordering items more efficiently.",
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
    explanation: "In React, the key prop is used to uniquely identify elements in a list, allowing React to optimize rendering by updating and reordering items more efficiently. Without unique keys, React might re-render elements unnecessarily, causing performance problems and potential bugs. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of the key prop in React?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of the key prop in React?.",
    hints: [
      "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"
  },
  {
    id: "react-why-does-react-recommend-against-mutating-state",
    title: "Why does React recommend against mutating state?",
    prompt: "Why does React recommend against mutating state?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "React advises against mutating state as it can lead to unexpected behaviors and bugs.",
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
    explanation: "React advises against mutating state as it can lead to unexpected behaviors and bugs. State immutability helps efficiently determine when components need re-rendering; direct mutations may prevent React from detecting changes. Find in-depth explanations and track study progress here -> React Hooks Mastering React hooks is important in front end interviews because hooks are the standard way to manage state, side effects, and component lifecycle in modern React. Demonstrating a solid understanding of hooks shows you can write clean, functional components and solve complex problems without relying on outdated class patterns.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Why does React recommend against mutating state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Why does React recommend against mutating state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-what-is-the-flux-pattern",
    title: "What is the Flux pattern?",
    prompt: "What is the Flux pattern?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The Flux pattern manages application state through unidirectional data flow, simplifying debugging and enhancing maintainability with clear separation of concerns between Dispatcher, Stores, Actions, and Views.",
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
    explanation: "The Flux pattern manages application state through unidirectional data flow, simplifying debugging and enhancing maintainability with clear separation of concerns between Dispatcher, Stores, Actions, and Views. Find in-depth explanations and track study progress here ->",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the Flux pattern?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the Flux pattern?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
  },
  {
    id: "react-how-to-format-date-using-react-intl",
    title: "How to format date using react-intl?",
    prompt: "How to format date using react-intl?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeSnippet: "import { FormattedDate } from 'react-intl';\nfunction DateComponent() {  return (    <FormattedDate      value={new Date()}      year=\"numeric\"      month=\"long\"      day=\"2-digit\"    />  );}\n\nimport { useIntl } from 'react-intl';\nfunction DateComponent() {  const intl = useIntl();  const formattedDate = intl.formatDate(new Date(), {    year: 'numeric',    month: 'long',    day: '2-digit',  });  return <div>{formattedDate}</div>;}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "You can format dates using the <FormattedDate /> component or the useIntl hook's formatDate method.",
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
    explanation: "You can format dates using the <FormattedDate /> component or the useIntl hook's formatDate method. Using <FormattedDate /> component: Using useIntl hook: These methods allow you to format the date in a locale-sensitive manner. React Testing Understanding testing in React is important in front end interviews because it shows you can write reliable, maintainable code and catch bugs early through unit, integration, and UI tests. Proficiency with tools like Jest and React Testing Library signals that you prioritize code quality and can work effectively in team environments with CI/CD workflows.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to format date using react-intl?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to format date using react-intl?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "100-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "performance-what-are-the-benefits-of-using-react-redux",
    title: "What are the Benefits of Using React-Redux?",
    prompt: "What are the Benefits of Using React-Redux?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "rendering-keys",
    tags: [
      "performance",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Benefits: Centralized single store for application state.",
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
    explanation: "Benefits: Centralized single store for application state. Improved performance by reducing unnecessary re-renders. Easier debugging with predictable state changes. Persistent state handling for longer-lived data.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the Benefits of Using React-Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the Benefits of Using React-Redux?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "algorithms-explain-why-and-how-to-update-state-of-components-using",
    title: "Explain Why and How to Update State of Components Using Callback?",
    prompt: "Explain Why and How to Update State of Components Using Callback?",
    level: "junior",
    type: "fix",
    category: "algorithms",
    subject: "state-management",
    tags: [
      "algorithms",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Using a callback version of setState ensures you update state based on the latest value, preventing bugs when updates queue up.",
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
    explanation: "Using a callback version of setState ensures you update state based on the latest value, preventing bugs when updates queue up.Example: this.setState(prevState => ({ count: prevState.count + 1}));",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Explain Why and How to Update State of Components Using Callback?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Explain Why and How to Update State of Components Using Callback?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "150-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/choosing-the-state-structure"
  },
  {
    id: "react-rules-of-hooks-how-to-avoid-subtle-bugs",
    title: "Rules of Hooks: How to Avoid Subtle Bugs",
    prompt: "Rules of Hooks: How to Avoid Subtle Bugs, explain the behavior and mechanism.",
    level: "intermediate",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Call Hooks only at the top level of your component.",
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
    explanation: "Call Hooks only at the top level of your component. Do not call them inside loops, conditions, or nested functions. Call Hooks only from React function components or custom hooks. Why these rules matter: They keep the Hook call order stable so React can correctly associate state and effects with a component instance.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Rules of Hooks: How to Avoid Subtle Bugs.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Rules of Hooks: How to Avoid Subtle Bugs.",
    hints: [
      "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning"
  },
  {
    id: "performance-hook-types-and-patterns-built-in-and-custom-hooks-that",
    title: "Hook Types and Patterns, Built-In and Custom Hooks That Matter",
    prompt: "Hook Types and Patterns, Built-In and Custom Hooks That Matter, explain the behavior and mechanism.",
    level: "intermediate",
    type: "fix",
    category: "performance",
    subject: "hooks",
    tags: [
      "performance",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Built-ins: Basic: useState, useEffect, useContext.",
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
    explanation: "Built-ins: Basic: useState, useEffect, useContext. Additional: useReducer, useMemo, useCallback, useRef, useLayoutEffect, useImperativeHandle, useDebugValue. Custom hooks: Encapsulate reusable behavior (fetching, input handling, subscriptions). Name must start with use. Follow the Rules of Hooks: call unconditionally and only from components or other hooks. Example custom hook: function useFetch(url) { const [data, setData] = useState(null); useEffect(() => { let cancelled = false; fetch(url).then(r => r.json()).then(d => { if (!cancelled) setData(d); }); return () => { cancelled = true; }; }, [url]); return data;}",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Hook Types and Patterns, Built-In and Custom Hooks That Matter.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Hook Types and Patterns, Built-In and Custom Hooks That Matter.",
    hints: [
      "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook."
    ],
    source: "150-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/warnings/invalid-hook-call-warning"
  },
  {
    id: "react-what-are-the-core-principles-of-redux",
    title: "What are the core principles of Redux?",
    prompt: "What are the core principles of Redux?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Redux follows three fundamental principles: Single source of truth: The state of your whole application is stored in an object tree within a single store.",
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
    explanation: "Redux follows three fundamental principles: Single source of truth: The state of your whole application is stored in an object tree within a single store. The single state tree makes it easier to keep track of changes over time and debug or inspect the application. State is read-only: The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state. Changes are made with pure functions: To specify how the state tree is transformed by actions, you write reducers. Reducers are just pure functions that take the previous state and an action as parameters, and return the next state.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the core principles of Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the core principles of Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "performance-what-is-the-proper-way-to-access-redux-store",
    title: "What is the proper way to access Redux store?",
    prompt: "What is the proper way to access Redux store?",
    level: "junior",
    type: "fix",
    category: "performance",
    subject: "performance",
    tags: [
      "performance",
      "performance",
      "junior"
    ],
    codeSnippet: "import { connect } from 'react-redux';\nimport { setVisibilityFilter } from '../actions';\nimport Link from '../components/Link';\n\nconst mapStateToProps = (state, ownProps) => ({\n  active: ownProps.filter === state.visibilityFilter,\n});\n\nconst mapDispatchToProps = (dispatch, ownProps) => ({\n  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),\n});\n\nconst FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);\n\nexport default FilterLink;\n\nclass MyComponent {\n  someMethod() {\n    doSomethingWith(this.context.store);\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The best way to access your store in a component is to use the connect() function, that creates a new component that wraps around your existing one.",
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
    explanation: "The best way to access your store in a component is to use the connect() function, that creates a new component that wraps around your existing one. This pattern is called Higher-Order Components, and is generally the preferred way of extending a component's functionality in React. This allows you to map state and action creators to your component, and have them passed in automatically as your store updates. Let's take an example of <FilterLink> component using connect: Due to it having quite a few performance optimizations and generally being less likely to cause bugs, the Redux developers almost always recommend using connect() over accessing the store directly (using context API).: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the proper way to access Redux store?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the proper way to access Redux store?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-what-is-the-purpose-of-the-constants-in-redux",
    title: "What is the purpose of the constants in Redux?",
    prompt: "What is the purpose of the constants in Redux?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "types",
    tags: [
      "react",
      "types",
      "junior"
    ],
    codeSnippet: "export const ADD_TODO = 'ADD_TODO';\nexport const DELETE_TODO = 'DELETE_TODO';\nexport const EDIT_TODO = 'EDIT_TODO';\nexport const COMPLETE_TODO = 'COMPLETE_TODO';\nexport const COMPLETE_ALL = 'COMPLETE_ALL';\nexport const CLEAR_COMPLETED = 'CLEAR_COMPLETED';\n\nimport { ADD_TODO } from './actionTypes';\n\n   export function addTodo(text) {\n     return { type: ADD_TODO, text };\n   }\n\nimport { ADD_TODO } from './actionTypes';\n\n   export default (state = [], action) => {\n     switch (action.type) {\n       case ADD_TODO:\n         return [\n           ...state,\n           {\n             text: action.text,\n             completed: false,\n           },\n         ];\n       default:\n         return state;\n     }\n   };",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE.",
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
    explanation: "Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos, in which case, you will get a ReferenceError immediately. Normally we will save them in a single file (constants.js or actionTypes.js). In Redux, you use them in two places: During action creation: Let's take actions.js: In reducers: Let's create reducer.js:: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of the constants in Redux?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of the constants in Redux?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-what-are-the-features-of-redux-devtools",
    title: "What are the features of Redux DevTools?",
    prompt: "What are the features of Redux DevTools?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Some of the main features of Redux DevTools are below, Lets you inspect every state and action payload.",
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
    explanation: "Some of the main features of Redux DevTools are below, Lets you inspect every state and action payload. Lets you go back in time by cancelling actions. If you change the reducer code, each staged action will be re-evaluated. If the reducers throw, you will see during which action this happened, and what the error was. With persistState() store enhancer, you can persist debug sessions across page reloads.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the features of Redux DevTools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the features of Redux DevTools?.",
    hints: [
      "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://redux.js.org/style-guide/"
  },
  {
    id: "react-how-to-debug-your-react-native",
    title: "How to debug your React Native?",
    prompt: "How to debug your React Native?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Follow the below steps to debug React Native app: Run your application in the iOS simulator.",
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
    explanation: "Follow the below steps to debug React Native app: Run your application in the iOS simulator. Press Command + D and a webpage should open up at http://localhost:8081/debugger-ui. Enable Pause On Caught Exceptions for a better debugging experience. Press Command + Option + I to open the Chrome Developer tools, or open it via View -> Developer -> Developer Tools. You should now be able to debug as you normally would. React supported libraries & Integration: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to debug your React Native?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to debug your React Native?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "typescript-what-is-the-difference-between-flow-and-proptypes",
    title: "What is the difference between Flow and PropTypes?",
    prompt: "What is the difference between Flow and PropTypes?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Flow is a static analysis tool (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.",
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
    explanation: "Flow is a static analysis tool (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time. PropTypes is a basic type checker (runtime checker) which has been patched onto React. It can't check anything other than the types of the props being passed to a given component. If you want more flexible typechecking for your entire project Flow/TypeScript are appropriate choices.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between Flow and PropTypes?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between Flow and PropTypes?.",
    hints: [
      "Types are erased before the code runs. Ask what the compiler knows, and what it can only assume."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "react-what-is-the-difference-between-react-and-angular",
    title: "What is the difference between React and Angular?",
    prompt: "What is the difference between React and Angular?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Let's see the difference between React and Angular in a table format.",
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
    explanation: "Let's see the difference between React and Angular in a table format. React Angular React is a library and has only the View layer Angular is a framework and has complete MVC functionality React handles rendering on the server side AngularJS renders only on the client side but Angular 2 and above renders on the server side React uses JSX that looks like HTML in JS which can be confusing Angular follows the template approach for HTML, which makes code shorter and easy to understand React Native, which is a React type to build mobile applications are faster and more stable Ionic, Angular's mobile native app is relatively less stable and slower In React, data flows only in one way and hence debugging is easy In Angular, data flows both way i.e it has two-way data binding between children and parent and hence debugging is often difficult Note: The above list of differences are purely opinionated and it vary based on the professional experience. But they are helpful as base parameters.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the difference between React and Angular?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the difference between React and Angular?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "react-do-i-need-to-keep-all-my-state-into-redux-should-i-ever",
    title: "Do I need to keep all my state into Redux? Should I ever use react internal state?",
    prompt: "Do I need to keep all my state into Redux? Should I ever use react internal state?",
    level: "intermediate",
    type: "fix",
    category: "react",
    subject: "state-management",
    tags: [
      "react",
      "state-management",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It is up to developer decision.",
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
    explanation: "It is up to developer decision. i.e, It is developer job to determine what kinds of state make up your application, and where each piece of state should live. Some users prefer to keep every single piece of data in Redux, to maintain a fully serializable and controlled version of their application at all times. Others prefer to keep non-critical or UI state, such as, is this dropdown currently open, inside a component's internal state. Below are the thumb rules to determine what kind of data should be put into Redux Do other parts of the application care about this data? Do you need to be able to create further derived data based on this original data? Is the same data being used to drive multiple components? Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)? Do you want to cache the data (i.e, use what's in state if it's already there instead of re-requesting it)?: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of Do I need to keep all my state into Redux? Should I ever use react internal state?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of Do I need to keep all my state into Redux? Should I ever use react internal state?.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "algorithms-what-is-the-benefit-of-component-stack-trace-from-error",
    title: "What is the benefit of component stack trace from error boundary?",
    prompt: "What is the benefit of component stack trace from error boundary?",
    level: "intermediate",
    type: "fix",
    category: "algorithms",
    subject: "hooks",
    tags: [
      "algorithms",
      "hooks",
      "intermediate"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line numbers using error boundary concept.",
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
    explanation: "Apart from error messages and javascript stack, React16 will display the component stack trace with file names and line numbers using error boundary concept. For example, BuggyCounter component displays the component stack trace as below,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the benefit of component stack trace from error boundary?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the benefit of component stack trace from error boundary?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "typescript-what-is-the-purpose-of-displayname-class-property",
    title: "What is the purpose of displayName class property?",
    prompt: "What is the purpose of displayName class property?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "senior"
    ],
    codeSnippet: "function withSubscription(WrappedComponent) {\n  class WithSubscription extends React.Component {\n    /* ... */\n  }\n  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;\n  return WithSubscription;\n}\nfunction getDisplayName(WrappedComponent) {\n  return WrappedComponent.displayName || WrappedComponent.name || 'Component';\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The displayName string is used in debugging messages.",
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
    explanation: "The displayName string is used in debugging messages. Usually, you don, t need to set it explicitly because it, s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component. For example, To ease debugging, choose a display name that communicates that it, s the result of a withSubscription HOC.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of displayName class property?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of displayName class property?.",
    hints: [
      "Access modifiers are erased at compile time. Only a # private field is enforced at runtime."
    ],
    source: "300-react",
    estimatedMinutes: 4,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  },
  {
    id: "react-how-to-debug-forwardrefs-in-devtools",
    title: "How to debug forwardRefs in DevTools?",
    prompt: "How to debug forwardRefs in DevTools?",
    level: "junior",
    type: "fix",
    category: "react",
    subject: "rendering-keys",
    tags: [
      "react",
      "rendering-keys",
      "junior"
    ],
    codeSnippet: "const WrappedComponent = React.forwardRef((props, ref) => {\n  return <LogProps {...props} forwardedRef={ref} />;\n});\n\nconst WrappedComponent = React.forwardRef(function myFunction(props, ref) {\n  return <LogProps {...props} forwardedRef={ref} />;\n});\n\nfunction logProps(Component) {\n  class LogProps extends React.Component {\n    // ...\n  }\n\n  function forwardRef(props, ref) {\n    return <LogProps {...props} forwardedRef={ref} />;\n  }\n\n  // Give this component a more helpful display name in DevTools.\n  // e.g. \"ForwardRef(logProps(MyComponent))\"\n  const name = Component.displayName || Component.name;\n  forwardRef.displayName = `logProps(${name})`;\n\n  return React.forwardRef(forwardRef);\n}",
    codeLanguage: "tsx",
    options: [
      {
        id: "A",
        text: "How to debug forwardRefs in DevTools?: Core React and frontend architecture principle.",
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
    explanation: "React.forwardRef accepts a render function as parameter and DevTools uses this function to determine what to display for the ref forwarding component. For example, If you don't name the render function or not using displayName property then it will appear as, ForwardRef, in the DevTools, But If you name the render function then it will appear as, ForwardRef(myFunction), As an alternative, You can also set displayName property for forwardRef function,: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of How to debug forwardRefs in DevTools?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of How to debug forwardRefs in DevTools?.",
    hints: [
      "React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://react.dev/learn/render-and-commit"
  },
  {
    id: "react-what-is-the-purpose-of-eslint-plugin-for-hooks",
    title: "What is the purpose of eslint plugin for hooks?",
    prompt: "What is the purpose of eslint plugin for hooks?",
    level: "intermediate",
    type: "fix",
    category: "react",
    subject: "hooks",
    tags: [
      "react",
      "hooks",
      "intermediate",
      "hooks"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The ESLint plugin enforces rules of Hooks to avoid bugs.",
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
    explanation: "The ESLint plugin enforces rules of Hooks to avoid bugs. It assumes that any function starting with, use, and a capital letter right after it is a Hook. In particular, the rule enforces that, Calls to Hooks are either inside a PascalCase function (assumed to be a component) or another useSomething function (assumed to be a custom Hook). Hooks are called in the same order on every render.: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What is the purpose of eslint plugin for hooks?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What is the purpose of eslint plugin for hooks?.",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "300-react",
    estimatedMinutes: 3,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "typescript-what-are-the-benefits-of-using-typescript-with-reactjs",
    title: "What are the benefits of using typescript with reactjs?",
    prompt: "What are the benefits of using typescript with reactjs?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "types",
      "junior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Below are some of the benefits of using typescript with Reactjs, It is possible to use latest JavaSc",
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
    explanation: "Below are some of the benefits of using typescript with Reactjs, It is possible to use latest JavaScript features Use of interfaces for complex type definitions IDEs such as VS Code was made for TypeScript Avoid bugs with the ease of readability and Validation: ",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of What are the benefits of using typescript with reactjs?.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of What are the benefits of using typescript with reactjs?.",
    hints: [
      "Types are erased before the code runs. Ask what the compiler knows, and what it can only assume."
    ],
    source: "300-react",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "system_design-explain-state-management-strategies-in-a-large-frontend",
    title: "Explain state management strategies in a large frontend application",
    prompt: "Explain state management strategies in a large frontend application",
    level: "senior",
    type: "fix",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "27 setFilter: ( key, val ) = > setParams ( p = > { p.",
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
    explanation: "State management is one of the most critical frontend architecture decisions. Getting it wrong leads to prop drilling hell, stale data, and bugs. The 4 types of state: Local UI state, isOpen, inputValue, tab selection (useState) Server/cache state, API data, loading, errors (React Query/SWR) Global client state, auth user, theme, cart (Zustand/Redux) URL state, filters, pagination, search params (useSearchParams) Which tool for which state: useState, simple local UI state useReducer, complex local state with multiple actions Context, low-frequency global state (theme, locale) Zustand/Jotai, medium global state, simple API Redux Toolkit, large apps, complex async flows, devtools React Query/SWR, ALL server state (replaces 90% of Redux use) Rule of thumb: Put state as close to where it is used as possible Use React Query for server state before reaching for Redux 1 // React Query: server state (replaces Redux for API data) 2 const useProducts = ( filters ) = > { 3 return useQuery ( { 4 queryKey: [ 'products', filters ], 5 queryFn: ( ) = > api. getProducts ( filters ), 6 staleTime: 5 * 60 * 1000, // 5 min, don't refetch if fresh 7 gcTime: 10 * 60 * 1000, // 10 min, keep in memory 8 } ) 9 } 10 11 // Zustand: global client state (auth, cart, theme) 12 const useCartStore = create ( ( set, get ) = > ( { 13 items: [ ], 14 addItem: ( product ) = > set ( state = > ( { 15 items: [.. state. items, product ] 16 } ) ), 17 total: ( ) = > get ( ). items. reduce ( ( sum, i ) = > sum + i. price, 0 ), 18 clearCart: ( ) = > set ( { items: [ ] } ) 19 } ) ) 20 21 // URL state: filters and pagination (shareable, bookmarkable) 22 const useProductFilters = ( ) = > { 23 const [ params, setParams ] = useSearchParams ( ) 24 return { 25 category: params. get ( 'category' ) | | 'all', 26 page: Number ( params. get ( 'page' ) | | 1 )",
    interviewLine: "State management is one of the most critical frontend architecture decisions.",
    misconception: "Getting it wrong leads to prop drilling hell, stale data, and bugs.",
    hints: [
      "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/learn/passing-props-to-a-component"
  },
  {
    id: "system_design-how-do-you-design-a-drag-and-drop-interface-n-answer-dr",
    title: "How do you design a drag-and-drop interface?",
    prompt: "How do you design a drag-and-drop interface?",
    level: "senior",
    type: "fix",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "29 const handleDragEnd = ( event ) = > { 30 const { active, over } = event 31 if (! over | | active.",
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
    explanation: "Drag and drop requires careful handling of mouse/touch events, accessibility, and state management. Libraries (use these, don't build from scratch): @dnd-kit/core, most modern, accessible, sortable, tree react-beautiful-dnd, kanban, lists (Atlassian's library) react-dropzone, file drag-and-drop only Key concepts in @dnd-kit: DndContext, wraps everything, handles drag events Draggable (useDraggable), items that can be picked up Droppable (useDroppable), areas that can receive items SortableContext, ordered list reordering arrayMove, reorder arrays after drop Accessibility for DnD: Keyboard support, Space to pick up, arrows to move, Space to drop Screen reader announcements, 'Dragging item X. Use arrow keys to move.' @dnd-kit handles this automatically 1 import { DndContext, closestCenter } from '@dnd-kit/core' 2 import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable' 3 import { CSS } from '@dnd-kit/utilities' 4 5 // Sortable item 6 const SortableCard = ( { id, task } ) = > { 7 const { attributes, listeners, setNodeRef, 8 transform, transition, isDragging } = useSortable ( { id } ) 9 return ( 10 < div 11 ref = { setNodeRef } 12 style = { { 13 transform: CSS. Transform. toString ( transform ), 14 transition, 15 opacity: isDragging? 0. 5: 1, 16 } } 17 {.. attributes } 18 {.. listeners } 19 > 20 < TaskCard task = { task } / > 21 < / div > 22 ) 23 } 24 25 // Kanban board 26 const KanbanBoard = ( ) = > { 27 const [ tasks, setTasks ] = useState ( initialTasks ) 28",
    interviewLine: "Drag and drop requires careful handling of mouse/touch events, accessibility, and state management.",
    misconception: "Libraries (use these, don't build from scratch): @dnd-kit/core, most modern, accessible, sortable, tree react-beautiful-dnd, kanban, lists (Atlassian's library) react-dropzone, file drag-and-drop only Key concepts in @dnd-kit: DndContext, w",
    hints: [
      "Hooks run in call order on every render. Ask what this one owns, and when React re-runs it."
    ],
    source: "frontend-system-design-50",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/hooks"
  },
  {
    id: "typescript-fix-class-property-missing-this",
    title: "Fix the bug: a class property read without this",
    prompt: "This class does not compile. What is wrong?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "this",
      "fix"
    ],
    codeSnippet: "class Circle {\n  private radius: number;\n\n  constructor(radius) {\n    this.radius = radius;\n  }\n\n  calculateArea() {\n    return Math.PI * radius * radius;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "private properties cannot be read inside the class that declares them",
        isCorrect: false,
        explanation: "private means accessible only within the declaring class; reading it there is exactly what it is for."
      },
      {
        id: "B",
        text: "Math.PI must be imported before use",
        isCorrect: false,
        explanation: "Math is a global object available everywhere."
      },
      {
        id: "C",
        text: "The constructor cannot share a parameter name with a property",
        isCorrect: false,
        explanation: "That shadowing is legal and common; this.radius and radius are distinguishable."
      },
      {
        id: "D",
        text: "calculateArea reads radius instead of this.radius, so it refers to no binding in scope",
        isCorrect: true,
        explanation: "Correct. Inside a method, a property must be reached through this, the bare name is not in scope."
      }
    ],
    correctAnswer: "D",
    explanation: "Inside a method, a class property is not a variable in lexical scope, it lives on the instance and has to be reached through this. Writing radius makes the compiler look for a local or an outer binding, finds none, and errors. The fix is this.radius. Worth noting a second weakness: the constructor parameter has no annotation, so under noImplicitAny it is an implicit any; annotating it constructor(radius: number) tightens the class.",
    interviewLine: "Class properties aren't in lexical scope inside methods, they're on the instance, so they need this.",
    misconception: "Expecting a class body to behave like a closure where properties are ambient variables.",
    hints: [
      "Where does the identifier radius resolve inside calculateArea?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  },
  {
    id: "typescript-fix-filter-truthy-vs-even",
    title: "Fix the bug: a filter that keeps the wrong half",
    prompt: "This is meant to keep the even numbers, but logs [1, 3, 5]. Why?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "filter",
      "truthiness",
      "fix"
    ],
    codeSnippet: "const numbers: number[] = [1, 2, 3, 4, 5];\nconst evenNumbers = numbers.filter((num) => num % 2);\nconsole.log(evenNumbers);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "filter needs an explicit boolean return type annotation",
        isCorrect: false,
        explanation: "No annotation is required; filter accepts any predicate whose result is used for truthiness."
      },
      {
        id: "B",
        text: "num % 2 is 1 for odd numbers, which is truthy, so it keeps the odd ones",
        isCorrect: true,
        explanation: "Correct. The predicate must be num % 2 === 0."
      },
      {
        id: "C",
        text: "% returns a string, so every result is truthy",
        isCorrect: false,
        explanation: "% returns a number. If everything were truthy the whole array would come back."
      },
      {
        id: "D",
        text: "filter mutates the array, so the indices shift mid-iteration",
        isCorrect: false,
        explanation: "filter returns a new array and does not mutate the source."
      }
    ],
    correctAnswer: "B",
    explanation: "num % 2 evaluates to 1 for odd numbers and 0 for even ones. filter keeps entries whose predicate is truthy, and 1 is truthy while 0 is falsy, so the odd numbers survive and the evens are dropped. The fix is to compare explicitly: num % 2 === 0. This is the classic cost of leaning on truthiness where a boolean was meant; TypeScript cannot catch it because a number is a perfectly valid thing to test for truthiness.",
    interviewLine: "0 is falsy and 1 is truthy, so a bare modulo predicate keeps exactly the half you didn't want.",
    misconception: "Reading num % 2 as 'is even'. It is the remainder, and the remainder for an even number is the falsy one.",
    hints: [
      "What is 3 % 2, and is that value truthy?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-fix-union-assignment-outside-type",
    title: "Fix the bug: assigning outside a union",
    prompt: "Which line fails to compile, and why?",
    level: "junior",
    type: "fix",
    category: "typescript",
    subject: "narrowing",
    tags: [
      "typescript",
      "union-types",
      "assignability",
      "fix"
    ],
    codeSnippet: "let data: string | number;\ndata = \"Hello\";\ndata = 42;\ndata = true;",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "data = true, boolean is not a member of string | number",
        isCorrect: true,
        explanation: "Correct. A union permits exactly its declared members and nothing else."
      },
      {
        id: "B",
        text: "None, TypeScript widens the union on first assignment",
        isCorrect: false,
        explanation: "Explicitly annotated unions never widen. Only inferred types widen, and not to boolean."
      },
      {
        id: "C",
        text: "data = 42, a union can only hold its first member",
        isCorrect: false,
        explanation: "A union holds any one of its members; number is declared."
      },
      {
        id: "D",
        text: "data = \"Hello\", a union needs a type assertion on assignment",
        isCorrect: false,
        explanation: "No assertion is needed to assign a declared member type."
      }
    ],
    correctAnswer: "A",
    explanation: "string | number means the variable may hold a string or a number, those two and nothing more. Assigning true is an error because boolean is not a member. The union is not a starting point that grows as you assign; an explicit annotation fixes the set exactly. To allow booleans you have to say so: string | number | boolean.",
    interviewLine: "A union is a closed set. It doesn't widen to accommodate whatever you assign next.",
    misconception: "Expecting a union to expand on assignment the way an inferred let does.",
    hints: [
      "Which of the three assigned values is not named in the annotation?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
  },
  {
    id: "typescript-fix-factorial-loop-multiplies-by-zero",
    title: "Fix the bug: a factorial that always returns 0",
    prompt: "factorial(5) returns 0. What is wrong with the loop?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "loops",
      "off-by-one",
      "fix"
    ],
    codeSnippet: "function factorial(n: number): number {\n  let result = 1;\n  for (let i = n; i >= 0; i, ) {\n    result = result * i;\n  }\n  return result;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "n is not validated as a non-negative integer",
        isCorrect: false,
        explanation: "A real weakness, but not the reason factorial(5) returns 0."
      },
      {
        id: "B",
        text: "The condition i >= 0 lets the loop reach 0, so the running product is multiplied by zero",
        isCorrect: true,
        explanation: "Correct. Every accumulated value is wiped out on the final iteration. It should be i > 0."
      },
      {
        id: "C",
        text: "result should start at 0 rather than 1",
        isCorrect: false,
        explanation: "Starting at 0 would make every product 0 too. A multiplicative accumulator starts at 1."
      },
      {
        id: "D",
        text: "The loop counts down, and factorial must be computed upward",
        isCorrect: false,
        explanation: "Direction is irrelevant to a product, counting down is fine."
      }
    ],
    correctAnswer: "B",
    explanation: "The loop runs while i >= 0, so its last iteration multiplies the accumulated product by 0 and discards all the work. Changing the condition to i > 0 stops at 1 and yields 120 for n = 5. Guarding the input separately is still worth doing, negative n makes the loop body never execute and silently return 1, but the bug that produces 0 is the termination condition.",
    interviewLine: "A multiplicative accumulator must never reach zero. The termination condition is the whole bug.",
    misconception: "Blaming the initial value of result. Starting at 1 is correct for a product.",
    hints: [
      "Write out the values i takes for n = 5. What is the last one?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-fix-any-return-type-loses-information",
    title: "Fix the weakness: a function that knows more than it declares",
    prompt: "This function works correctly at runtime. What should be improved about its types?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "any",
      "return-types",
      "fix"
    ],
    codeSnippet: "function keepNumbers(miscData: any[]): any[] {\n  const numbers: any[] = [];\n  for (let value of miscData) {\n    value = parseFloat(value);\n    if (!isNaN(value)) {\n      numbers.push(value);\n    }\n  }\n  return numbers;\n}\n\nconst onlyNumbers = keepNumbers([1, 2, \"hello\", 4.56, \"78\", null]);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The return type should be number[], the function guarantees it, but declares any[] and throws it away",
        isCorrect: true,
        explanation: "Correct. Callers get any back and lose all checking on the result."
      },
      {
        id: "B",
        text: "parseFloat should be Number, otherwise the values are strings",
        isCorrect: false,
        explanation: "parseFloat returns a number. The two differ on edge cases, not on the resulting type."
      },
      {
        id: "C",
        text: "for.of cannot iterate an array typed any[]",
        isCorrect: false,
        explanation: "for.of iterates any array regardless of element type."
      },
      {
        id: "D",
        text: "The parameter should be unknown[] and the body left otherwise unchanged",
        isCorrect: false,
        explanation: "unknown[] is a fair choice for the input, but the real loss is on the way out."
      }
    ],
    correctAnswer: "A",
    explanation: "The function does the work to guarantee an array of numbers, it parses each value and rejects anything that is NaN, and then declares any[] on the way out, discarding that guarantee. Every caller now holds an any[] and can call string methods on the elements without complaint. Declaring number[] pushes the knowledge back to the call site. Tightening the input to unknown[] is a further improvement, since it forces the parsing that the body already does.",
    interviewLine: "If a function guarantees something, its return type should say so. any on the way out throws away the work the body just did.",
    misconception: "Treating any as a harmless placeholder. It silently disables checking for everyone downstream.",
    hints: [
      "What can a caller do with the result that they should not be able to?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-fix-class-fields-not-declared",
    title: "Fix the bug: assigning to properties a class never declared",
    prompt: "This class does not compile. What is missing?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "properties",
      "fix"
    ],
    codeSnippet: "class Car {\n  constructor(make: string, model: string, year: number) {\n    this.make = make;\n    this.model = model;\n    this.year = year;\n  }\n\n  getInfo(): string {\n    return `${this.make} ${this.model} (${this.year})`;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "The properties are never declared, so this.make and the others do not exist on the type",
        isCorrect: true,
        explanation: "Correct. Either declare the fields, or use parameter properties to declare and assign in one step."
      },
      {
        id: "B",
        text: "getInfo cannot use a template literal with numeric values",
        isCorrect: false,
        explanation: "Template literals interpolate numbers without complaint."
      },
      {
        id: "C",
        text: "Constructor parameters must be optional to be assignable to properties",
        isCorrect: false,
        explanation: "Optionality is unrelated to whether a property exists on the class."
      },
      {
        id: "D",
        text: "The class needs an explicit return type on the constructor",
        isCorrect: false,
        explanation: "Constructors never declare a return type."
      }
    ],
    correctAnswer: "A",
    explanation: "Unlike JavaScript, TypeScript requires class fields to be declared before you assign to them, the type of an instance is defined by its declarations, not inferred from what the constructor happens to set. Either declare make: string; model: string; year: number; above the constructor, or collapse the whole thing using parameter properties: constructor(public make: string, public model: string, public year: number) {}, which declares and assigns in one step.",
    interviewLine: "An instance's type comes from its declared fields, not from whatever the constructor assigns. Parameter properties collapse both into one line.",
    misconception: "Carrying the JavaScript habit of creating properties by assigning to this in the constructor.",
    hints: [
      "What does the compiler know about the shape of a Car instance from reading the class body?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking"
  },
  {
    id: "typescript-fix-class-members-separated-by-commas",
    title: "Fix the bug: commas between class members",
    prompt: "This class fails to parse. What is the syntax error?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "syntax",
      "fix"
    ],
    codeSnippet: "class Person {\n  name: string,\n  age: number,\n\n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "Class members are separated by semicolons or newlines, not commas",
        isCorrect: true,
        explanation: "Correct. Commas separate members of an object literal or an interface written inline, not a class body."
      },
      {
        id: "B",
        text: "Property declarations must carry an access modifier such as public",
        isCorrect: false,
        explanation: "Members are public by default; the modifier is optional."
      },
      {
        id: "C",
        text: "The constructor must be declared before any property",
        isCorrect: false,
        explanation: "Members may appear in any order."
      },
      {
        id: "D",
        text: "Properties must be initialised where they are declared",
        isCorrect: false,
        explanation: "Assigning them in the constructor satisfies definite assignment under strictPropertyInitialization."
      }
    ],
    correctAnswer: "A",
    explanation: "A class body is not an object literal. Members are terminated by semicolons or simply by newlines, and a comma is a syntax error. The confusion is understandable, type literals and interfaces do accept commas between members, but class bodies follow JavaScript class syntax. Removing the commas is the whole fix.",
    interviewLine: "Class bodies use JavaScript class syntax, not object-literal syntax. Commas belong in the latter.",
    misconception: "Carrying interface or object-literal punctuation into a class body.",
    hints: [
      "Would this punctuation be valid inside an interface?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  },
  {
    id: "typescript-fix-sum-array-off-by-one",
    title: "Fix the bug: a sum that returns NaN",
    prompt: "sumArray([1, 2, 3]) returns NaN. Why?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "arrays",
      "off-by-one",
      "fix"
    ],
    codeSnippet: "function sumArray(arr: number[]): number {\n  let sum = 0;\n  for (let i = 1; i <= arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "sum should be initialised to arr[0] rather than 0",
        isCorrect: false,
        explanation: "That would paper over the real bug, and still read past the end."
      },
      {
        id: "B",
        text: "The loop skips index 0 and reads arr[length], which is undefined, adding it gives NaN",
        isCorrect: true,
        explanation: "Correct. It should run from i = 0 while i < arr.length."
      },
      {
        id: "C",
        text: "arr[i] returns a string, so += concatenates",
        isCorrect: false,
        explanation: "The array is typed number[]; the out-of-range read yields undefined, not a string."
      },
      {
        id: "D",
        text: "+= cannot be used to accumulate numbers in a typed array loop",
        isCorrect: false,
        explanation: "+= is fine. The bug is entirely in the bounds."
      }
    ],
    correctAnswer: "B",
    explanation: "Two errors compound in one line. Starting at i = 1 skips the first element, and running while i <= arr.length reads one past the end. Indexing beyond the end returns undefined, and 6 + undefined is NaN, so the result is not merely wrong, it is not a number at all. The correct bounds are i = 0 and i < arr.length. TypeScript does not catch this: arr[i] is typed number regardless of whether i is in range, unless noUncheckedIndexedAccess is enabled.",
    interviewLine: "Indexing past the end gives undefined, and any arithmetic on undefined gives NaN, which is why an off-by-one shows up as NaN rather than a slightly wrong total.",
    misconception: "Trusting that arr[i] is a number because the array is number[]. Without noUncheckedIndexedAccess, out-of-range reads are still typed number.",
    hints: [
      "Which indices does the loop actually visit for a 3-element array?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-spread-object-typed-parameters",
    title: "Spreading a value typed as object",
    prompt: "Does this compile, and what is the weakness in its typing?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "spread",
      "object-type",
      "generics",
      "fix"
    ],
    codeSnippet: "function mergeObjects(obj1: object, obj2: object): object {\n  return { ...obj1...obj2 };\n}\n\nconst merged = mergeObjects({ name: \"John\" }, { age: 30 });",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "It compiles and merged is correctly typed as { name: string; age: number }",
        isCorrect: false,
        explanation: "The declared return type is object, so the specific shape is discarded at the boundary."
      },
      {
        id: "B",
        text: "It fails: the object type does not permit spreading",
        isCorrect: false,
        explanation: "Spreading a value typed object is perfectly legal TypeScript."
      },
      {
        id: "C",
        text: "It compiles, but the object return type loses both shapes, merged has no known properties",
        isCorrect: true,
        explanation: "Correct. Generics would preserve them: <A, B>(a: A, b: B): A & B."
      },
      {
        id: "D",
        text: "It fails: a function cannot return an object literal built from spreads",
        isCorrect: false,
        explanation: "It can. The literal is a perfectly ordinary expression."
      }
    ],
    correctAnswer: "C",
    explanation: "The code compiles, object simply means 'any non-primitive', and spreading such a value is allowed. The weakness is at the boundary: declaring the return type as object throws away everything the compiler knew, so merged.name is an error even though the value is there. Making the function generic keeps the information: function mergeObjects<A extends object, B extends object>(a: A, b: B): A & B. Now the caller gets the intersection and the properties are visible.",
    interviewLine: "object means 'not a primitive' and nothing more. If you want the caller to keep the shape, the function has to be generic.",
    misconception: "Believing the object type blocks spreading. It permits it, it just erases the result's shape.",
    hints: [
      "Try reading merged.name at the call site. Why does that fail?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 3,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
  },
  {
    id: "typescript-generic-class-dictionary-correct",
    title: "Reading a generic class that is already correct",
    prompt: "What, if anything, is wrong with this generic Dictionary?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "generics",
    tags: [
      "typescript",
      "generics",
      "index-signature",
      "fix"
    ],
    codeSnippet: "class Dictionary<T> {\n  private data: { [key: string]: T } = {};\n\n  setValue(key: string, value: T): void {\n    this.data[key] = value;\n  }\n\n  getValue(key: string): T | undefined {\n    return this.data[key];\n  }\n}\n\nconst myDict = new Dictionary<number>();\nmyDict.setValue(\"one\", 1);",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "getValue should return T, not T | undefined",
        isCorrect: false,
        explanation: "T | undefined is the honest type, a missing key really does yield undefined."
      },
      {
        id: "B",
        text: "An index signature cannot be used on a private field",
        isCorrect: false,
        explanation: "Visibility and index signatures are independent."
      },
      {
        id: "C",
        text: "Nothing is wrong; the class is correctly typed, and T | undefined honestly reflects a missing key",
        isCorrect: true,
        explanation: "Correct. Not every 'find the bug' question has a bug, and this one models optionality properly."
      },
      {
        id: "D",
        text: "T must be constrained with extends to be usable in an index signature",
        isCorrect: false,
        explanation: "An unconstrained T is fine as an index signature's value type."
      }
    ],
    correctAnswer: "C",
    explanation: "This class is correct. The index signature { [key: string]: T } models a string-keyed store, T threads the element type through both methods, and getValue returning T | undefined is the accurate signature, looking up an absent key genuinely yields undefined, and saying so forces callers to handle it. Declaring T would have been the mistake. Worth knowing: an index signature is what noUncheckedIndexedAccess would otherwise add the undefined to automatically.",
    interviewLine: "T | undefined on a lookup isn't defensive noise, it's the truth about a key that might not be there.",
    misconception: "Assuming every debugging question contains a bug, and 'fixing' a correct signature into a dishonest one.",
    hints: [
      "What does this.data[key] actually evaluate to for a key that was never set?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/generics.html"
  },
  {
    id: "typescript-numeric-enum-comparison-correct",
    title: "Reading a numeric enum that is already correct",
    prompt: "Is there a logical error in this enum and the function that uses it?",
    level: "senior",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "enums",
      "fix"
    ],
    codeSnippet: "enum DaysOfTheWeek {\n  Sunday,\n  Monday,\n  Tuesday,\n  Wednesday,\n  Thursday,\n  Friday,\n  Saturday,\n}\n\nfunction getWorkingDay(day: DaysOfTheWeek): string {\n  if (day === DaysOfTheWeek.Saturday || day === DaysOfTheWeek.Sunday) {\n    return \"Weekend\";\n  }\n  return \"Weekday\";\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "getWorkingDay must handle every member with a switch to be exhaustive",
        isCorrect: false,
        explanation: "The early return plus fallthrough covers all cases; exhaustiveness is not required here."
      },
      {
        id: "B",
        text: "Sunday is 0, which is falsy, so the comparison against it never matches",
        isCorrect: false,
        explanation: "The comparison uses === against the member, not a truthiness test, so 0 compares correctly."
      },
      {
        id: "C",
        text: "Nothing is wrong, members auto-number from 0 and the comparisons are exact",
        isCorrect: true,
        explanation: "Correct. The one thing to know is that a plain numeric enum accepts any number at the boundary."
      },
      {
        id: "D",
        text: "Enum members must be given explicit values to be comparable",
        isCorrect: false,
        explanation: "Numeric enums auto-number from 0; explicit values are optional."
      }
    ],
    correctAnswer: "C",
    explanation: "The code is correct. Members auto-number from 0, so Sunday is 0 and Saturday is 6, and === compares those numbers exactly, the falsiness of 0 never comes into it. The real caveat with numeric enums is at the boundary: they are not nominal, so getWorkingDay(99) type-checks even though 99 is not a member. A string enum, or a union of string literals, closes that hole and survives serialisation more legibly.",
    interviewLine: "Numeric enums auto-number from 0 and compare exactly, but they don't reject out-of-range numbers, which is why string literal unions are often the safer choice.",
    misconception: "Worrying that Sunday being 0 breaks the comparison. It would matter for a truthiness check, not for ===.",
    hints: [
      "Does === care whether one of the values happens to be falsy?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/enums.html"
  },
  {
    id: "typescript-private-field-encapsulation-correct",
    title: "Reading an encapsulated class that is already correct",
    prompt: "Does this BankAccount contain a logical error?",
    level: "intermediate",
    type: "fix",
    category: "typescript",
    subject: "types",
    tags: [
      "typescript",
      "classes",
      "encapsulation",
      "fix"
    ],
    codeSnippet: "class BankAccount {\n  private balance: number;\n\n  constructor(initialBalance: number) {\n    this.balance = initialBalance;\n  }\n\n  deposit(amount: number): void {\n    this.balance += amount;\n  }\n\n  getBalance(): number {\n    return this.balance;\n  }\n}",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "getBalance leaks the private field and should return a copy",
        isCorrect: false,
        explanation: "balance is a number, a primitive, copied by value. There is no reference to leak."
      },
      {
        id: "B",
        text: "private is erased at compile time, so the field is not really private",
        isCorrect: false,
        explanation: "True of private but irrelevant to whether this code is logically correct. #balance would enforce it at runtime."
      },
      {
        id: "C",
        text: "balance must be initialised at its declaration site",
        isCorrect: false,
        explanation: "Assigning it in the constructor satisfies strictPropertyInitialization."
      },
      {
        id: "D",
        text: "Nothing is wrong, the field is encapsulated and both methods are correctly typed",
        isCorrect: true,
        explanation: "Correct. The only thing worth adding is validation that amount is positive, which is a design choice rather than a bug."
      }
    ],
    correctAnswer: "D",
    explanation: "The class is correct: balance is private so it can only be touched inside the class, the constructor initialises it, and both methods are accurately typed. The improvements available are about policy rather than correctness, rejecting a negative deposit, or using the ECMAScript #balance form, which is enforced at runtime instead of being erased with the types. Neither is a bug in what is written.",
    interviewLine: "TypeScript's private is a compile-time check that's erased; #private is a runtime guarantee. Different tools for different threats.",
    misconception: "Assuming a returned private field needs defensive copying. That matters for mutable objects, not primitives.",
    hints: [
      "Is balance a value or a reference?"
    ],
    source: "coderpad-typescript",
    estimatedMinutes: 2,
    bestPracticeRef: "https://www.typescriptlang.org/docs/handbook/2/classes.html"
  }
];
