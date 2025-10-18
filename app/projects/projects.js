const projects = [
  // {
  //   id: 18,
  //   title: "Recruiter Reply",
  //   urlTitle: "recruiter-reply",
  //   img: ["/P18pic.png"],
  //   liveLink: "https://recruiter-reply.vercel.app/",
  //   shortDescription:
  //     "This is a frontend Next JS website for a Client for a ecommerce shop built in Octobor 2024.",
  //   longDescription:
  //     "Book Finder is a frontend Next.js website built for a client to help users search and discover books. Launched in October 2024, it features a powerful search engine, book categorization, and detailed book previews. The site is styled with Tailwind CSS and uses React for dynamic rendering, ensuring a fast and responsive experience across all devices.",
  //   techStack: [
  //     ["Next JS", "/NextJs.png"],
  //     ["React", "/React.png"],
  //     ["Tailwind CSS", "/TailwindCss.png"],
  //   ],
  //   gitLink: "https://github.com/Lawrence-Amlan-Gomes/Recruiter-Reply",
  //   feaTures: [
  //     {
  //       title: "Project Overview",
  //       description: [
  //         {
  //           text: [
  //             " paragraph 1 :Users can view a comprehensive dashboard that provides an overview of all projects",
  //             " paragraph 2 : including their status, deadlines, and assigned team members.",
  //           ],
  //           listItems: ["List Item Paragrapht 1", "List Item Paragraph 2"],
  //           images: ["/P1pic.png", "/P1pic.png"],
  //         },
  //         {
  //           text: [
  //             " paragraph 1 :Users can view a comprehensive dashboard that provides an overview of all projects",
  //             " paragraph 2 : including their status, deadlines, and assigned team members.",
  //           ],
  //           listItems: ["List Item Paragrapht 1", "List Item Paragraph 2"],
  //           images: ["/P3Pic.png", "/P3Pic.png"],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 16,
    title: "Be Healthy",
    urlTitle: "be-healthy",
    img: ["/P16pic.png"],
    liveLink: "https://be-healthy-delta.vercel.app/",
    shortDescription:
      "A full-stack Next.js application built in September 2025 for health and wellness, featuring BMI calculation, meal planning, workout tracking, and community engagement with MongoDB integration.",
    longDescription:
      "Be Healthy is a full-stack Next.js application developed in September 2025 to promote physical fitness, healthy eating, effective workouts, and mental well-being. It offers ten features, including a BMI Calculator accessible without login, and nine others (Profile Settings, Dashboard, Healthy Recipe Suggestions, Nutrition Tracker, Workout Planner, Wellness Goal Setting, Guided Meditation Sessions, Health Coach, and Community) available post-login. Built with Next.js, React, Tailwind CSS, JavaScript, and MongoDB, the platform provides a responsive, user-friendly experience with real-time data management, showcasing skills in full-stack development, database integration, and dynamic UI design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
      ["MongoDB", "/Mongodb.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/Be-Healthy",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page introduces the Be Healthy app, designed to promote physical fitness, healthy eating, workouts, and mental well-being, with a theme toggle for light/dark modes.",
              "Only the BMI Calculator is accessible without login; other features require user authentication."
            ],
            listItems: [
              "Engaging introduction to health and wellness features",
              "Light/dark theme toggle for personalized experience",
              "Restricted access to most features without login",
              "Responsive design for all devices"
            ],
            images: ["/P16pic.png"],
          },
        ],
      },
      {
        title: "Authentication Routes",
        description: [
          {
            text: [
              "Unauthenticated users are directed to the /login route with a login form, and can navigate to the /register route to create an account with name, email, and secure password.",
              "MongoDB stores passwords as hashed values for security, and post-registration, users are redirected to the login page."
            ],
            listItems: [
              "Secure login and registration with MongoDB",
              "Hashed password storage for data protection",
              "Seamless navigation between login and registration",
              "Responsive form design for all devices"
            ],
            images: ["/P16_1pic.png", "/P16_2pic.png"],
          },
        ],
      },
      {
        title: "User Profile Settings",
        description: [
          {
            text: [
              "The Profile Settings section allows users to upload, change, or delete their profile picture, and update name, bio, phone number, and password (with current password verification).",
              "Users can also log out from this page, ensuring secure session management."
            ],
            listItems: [
              "Editable profile with photo management",
              "Secure password updates with verification",
              "Logout functionality with redirection",
              "Responsive profile interface"
            ],
            images: ["/P16_3pic.png", "/P16_4pic.png"],
          },
        ],
      },
      {
        title: "Dashboard",
        description: [
          {
            text: [
              "The Dashboard provides a centralized overview, initially empty, that dynamically updates with summaries of user activity across BMI, recipes, nutrition, workouts, goals, and meditation.",
              "It serves as a hub for tracking progress across the app’s features."
            ],
            listItems: [
              "Dynamic activity summaries for user engagement",
              "Real-time updates with MongoDB integration",
              "Responsive layout for progress tracking",
              "Centralized hub for all health features"
            ],
            images: ["/P16_5pic.png"],
          },
        ],
      },
      {
        title: "BMI Calculator",
        description: [
          {
            text: [
              "The BMI Calculator, accessible without login, allows users to input age, height (feet/cm), weight (kg/lbs), and gender to calculate BMI, view body condition, and see a chart of BMI ranges.",
              "Users can recalculate BMI as needed for updated results."
            ],
            listItems: [
              "Input fields for age, height, weight, and gender",
              "BMI result with body condition analysis",
              "Visual chart for BMI range comparison",
              "Recalculation functionality for flexibility"
            ],
            images: ["/P16_6pic.png"],
          },
        ],
      },
      {
        title: "Healthy Recipe Suggestions",
        description: [
          {
            text: [
              "This feature provides a daily meal plan tailored to the user’s BMI and body condition, offering three meal options for each of five daily meals.",
              "Users can select one meal per time slot and revisit/reselect meals anytime."
            ],
            listItems: [
              "Personalized meal plans based on BMI",
              "Three meal options for five daily slots",
              "Flexible meal selection and reselection",
              "Responsive meal plan interface"
            ],
            images: ["/P16_7pic.png"],
          },
        ],
      },
      {
        title: "Nutrition Tracker",
        description: [
          {
            text: [
              "The Nutrition Tracker displays total calories and nutritional breakdown for meals completed from the daily plan, updating dynamically as users log meals.",
              "For example, it shows calories/nutrients for three of five meals consumed."
            ],
            listItems: [
              "Real-time calorie and nutrient tracking",
              "Dynamic updates based on meal completion",
              "User-friendly nutritional breakdown display",
              "MongoDB-backed data persistence"
            ],
            images: ["/P16_8pic.png"],
          },
        ],
      },
      {
        title: "Workout Planner",
        description: [
          {
            text: [
              "The Workout Planner suggests four workout plans based on BMI and body condition: two for six days a week and two for five days a week.",
              "Users can select a plan and switch to another if their needs change."
            ],
            listItems: [
              "Tailored workout plans for varying schedules",
              "Flexible plan selection and reselection",
              "BMI-based workout recommendations",
              "Responsive workout plan interface"
            ],
            images: ["/P16_9pic.png"],
          },
        ],
      },
      {
        title: "Wellness Goal Setting",
        description: [
          {
            text: [
              "Users can select from 15 daily habits related to nutrition, exercise, sleep, mental health, and hydration to set personal wellness goals.",
              "Goals can be modified or reset at any time for flexibility."
            ],
            listItems: [
              "15 habit options for goal setting",
              "Flexible goal modification and reset",
              "Comprehensive wellness categories",
              "User-friendly goal management interface"
            ],
            images: ["/P16_10pic.png"],
          },
        ],
      },
      {
        title: "Guided Meditation Sessions",
        description: [
          {
            text: [
              "This feature offers 15 tips and instructions to improve mental health and build resilience, with options to revisit and reselect practices."
            ],
            listItems: [
              "15 meditation tips for mental well-being",
              "Flexible selection of meditation practices",
              "Responsive and calming interface design",
              "Support for mental health resilience"
            ],
            images: ["/P16_11pic.png"],
          },
        ],
      },
      {
        title: "Health Coach",
        description: [
          {
            text: [
              "The Health Coach provides information on 50 common minor ailments and their first-aid treatments, e.g., searching 'fever' displays at-home relief options."
            ],
            listItems: [
              "Searchable database of 50 minor ailments",
              "Practical first-aid treatment information",
              "User-friendly health resource interface",
              "MongoDB-backed data retrieval"
            ],
            images: ["/P16_12pic.png"],
          },
        ],
      },
      {
        title: "Community",
        description: [
          {
            text: [
              "The Community section allows users to view posts from other Be Healthy users and create, edit, or delete their own posts to foster connection and motivation."
            ],
            listItems: [
              "View and interact with community posts",
              "CRUD operations for user-generated posts",
              "Responsive community engagement interface",
              "MongoDB-backed post storage"
            ],
            images: ["/P16_13pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast performance and SEO-friendly content delivery.",
              "Integrates MongoDB for real-time user and health data management, with Tailwind CSS for responsive, utility-first styling."
            ],
            listItems: [
              "Next.js dynamic routing for feature pages",
              "MongoDB for secure data storage and retrieval",
              "React hooks for state and effect management",
              "Tailwind CSS for consistent, responsive design",
              "Optimized performance for health app functionality"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Faculty Review",
    urlTitle: "faculty-review",
    img: ["/P15pic.png"],
    liveLink: "https://bracu-faculty-review.vercel.app/",
    shortDescription:
      "A frontend Next.js application built in May 2025 for faculty reviews, enabling students to comment, rate, and view faculty details with admin management features.",
    longDescription:
      "Faculty Review is a frontend Next.js application developed in July 2025 to facilitate student reviews and ratings of university faculty. The landing page displays faculty cards with search functionality, accessible only after login. Students can comment, view others' comments, and rate faculty, while admins can manage faculty data. Built with Next.js, React, Tailwind CSS, and JavaScript, the platform ensures a responsive and intuitive experience, showcasing skills in authentication, dynamic rendering, and role-based functionality.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
      ["MongoDB", "/Mongodb.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/Bracu-Faculty-Review",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page displays a grid of faculty cards, each showing the faculty's name, image, and initial, with a search input box to filter by initials, name, or department.",
              "Access to the landing page and its features requires user authentication, redirecting unauthenticated users to the login route."
            ],
            listItems: [
              "Responsive faculty card grid layout",
              "Dynamic search by initials, name, or department",
              "Protected route requiring login",
              "Intuitive and engaging UI design"
            ],
            images: ["/P15pic.png"],
          },
        ],
      },
      {
        title: "Authentication Routes",
        description: [
          {
            text: [
              "Unauthenticated users attempting to access the landing page or navbar items are redirected to the /login route, featuring a login form.",
              "The login page provides a link to the /register route for new users to create an account, with seamless navigation between the two."
            ],
            listItems: [
              "Secure login form with validation",
              "Navigation to registration page",
              "Responsive form design for all devices",
              "Consistent authentication flow"
            ],
            images: ["/P15_1pic.png", "/P15_2pic.png"],
          },
        ],
      },
      {
        title: "Faculty Review Interface (/ Route, Post-Login)",
        description: [
          {
            text: [
              "After login, clicking a faculty card renders a different component on the same / route, with the upper left side allowing students to add comments about the faculty.",
              "The bottom left shows other students' comments, the top right displays detailed faculty information, and the bottom right allows rating the faculty from 0 to 5 (0 for no rating)."
            ],
            listItems: [
              "Interactive comment section for student feedback",
              "Display of peer comments for community insights",
              "Detailed faculty information view",
              "Rating system with 0-5 scale"
            ],
            images: ["/P15_3pic.png"],
          },
        ],
      },
      {
        title: "Admin Dashboard (/admin Route)",
        description: [
          {
            text: [
              "Admins, after login, see an additional 'Edit' icon in the navbar, leading to the /admin route where they can add, edit, or delete faculty information in the database.",
              "The admin interface ensures comprehensive management of faculty data with a user-friendly design."
            ],
            listItems: [
              "CRUD operations for faculty data",
              "Admin-only access to management features",
              "Responsive layout for database operations",
              "Secure data handling and validation"
            ],
            images: ["/P15_4pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast performance and SEO-friendly content delivery.",
              "Utilizes Tailwind CSS for responsive, utility-first styling, with React for dynamic component rendering and state management."
            ],
            listItems: [
              "Next.js dynamic routing for role-based interfaces",
              "React hooks for state and effect management",
              "Tailwind CSS for consistent, responsive design",
              "Secure authentication and data handling",
              "Optimized performance for user interactions"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Time Track",
    urlTitle: "time-track",
    img: ["/P9pic.png"],
    liveLink: "https://timetrack-ten.vercel.app/",
    shortDescription:
      "A full-stack Next.js application built in May 2025 for daily routine time management, featuring task creation, scheduling, and MongoDB integration.",
    longDescription:
      "Time Track is a full-stack Next.js application developed in May 2025 to help users manage their daily routines efficiently. It features a user-friendly dashboard where users can create, edit, and delete tasks with customizable schedules (daily or weekly) and time formats (AM/PM or 24-hour). The system integrates MongoDB for real-time data management, ensuring seamless task tracking and profile management. Built with Next.js, React, Tailwind CSS, JavaScript, and MongoDB, the platform offers a responsive experience, showcasing skills in full-stack development, database integration, and dynamic UI design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
      ["MongoDB", "/Mongodb.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/TimeTrack",
    feaTures: [
      {
        title: "Authentication Routes",
        description: [
          {
            text: [
              "Unauthenticated users are redirected to the /login route, featuring a login form, with an option to navigate to the /register route for account creation.",
              "The login and registration pages provide a secure and seamless authentication flow, consistent with modern web standards."
            ],
            listItems: [
              "Secure login form with MongoDB-backed authentication",
              "Seamless navigation between login and registration",
              "Responsive form design for all devices",
              "User-friendly authentication interface"
            ],
            images: ["/P9_1pic.png", "/P9_2pic.png"],
          },
        ],
      },
      {
        title: "Task Management Dashboard",
        description: [
          {
            text: [
              "After login, users access a centralized dashboard where they can create tasks, assign names, set times in AM/PM or 24-hour format, and choose daily or weekly recurrence.",
              "Tasks can be edited or deleted, with real-time updates stored in MongoDB for persistent data management."
            ],
            listItems: [
              "Task creation with customizable time formats",
              "Support for daily or weekly task scheduling",
              "Edit and delete functionality for tasks",
              "Responsive dashboard layout for task management"
            ],
            images: ["/P9_3pic.png"],
          },
        ],
      },
      {
        title: "Profile Route",
        description: [
          {
            text: [
              "Clicking the profile icon in the navbar navigates to the /profile route, displaying user information from registration, with options to upload, change, or remove a profile photo, update name, bio, password (but not email), and log out.",
              "The profile functionality mirrors that of the Library Management project, ensuring a consistent user experience."
            ],
            listItems: [
              "Editable profile with photo and personal details",
              "Secure updates for name, bio, and password",
              "Logout functionality with redirection to login",
              "Responsive profile page layout"
            ],
            images: ["/P9_4pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast performance and SEO-friendly content delivery.",
              "Integrates MongoDB for real-time task and user data management, with Tailwind CSS for responsive, utility-first styling."
            ],
            listItems: [
              "Next.js dynamic routing for authentication and profile",
              "MongoDB for efficient task storage and retrieval",
              "React hooks for state and effect management",
              "Tailwind CSS for consistent, responsive design",
              "Real-time task updates with database integration"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  // {
  //   id: 13,
  //   title: "Lawyer FYI",
  //   urlTitle: "lawyer-fyi",
  //   img: ["/P13pic.png"],
  //   liveLink: "https://lawyer-fyi.vercel.app/",
  //   shortDescription:
  //     "This is a frontend Next JS website for a Client for a ecommerce shop built in Octobor 2024.",
  //   longDescription:
  //     "Book Finder is a frontend Next.js website built for a client to help users search and discover books. Launched in October 2024, it features a powerful search engine, book categorization, and detailed book previews. The site is styled with Tailwind CSS and uses React for dynamic rendering, ensuring a fast and responsive experience across all devices.",
  //   techStack: [
  //     ["Next JS", "/NextJs.png"],
  //     ["React", "/React.png"],
  //     ["Tailwind CSS", "/TailwindCss.png"],
  //   ],
  //   gitLink: "https://github.com/Lawrence-Amlan-Gomes/Lawyer-FYI",
  //   feaTures: [
  //     {
  //       title: "Project Overview",
  //       description: [
  //         {
  //           text: [
  //             " paragraph 1 :Users can view a comprehensive dashboard that provides an overview of all projects",
  //             " paragraph 2 : including their status, deadlines, and assigned team members.",
  //           ],
  //           listItems: ["List Item Paragrapht 1", "List Item Paragraph 2"],
  //           images: ["/P1pic.png", "/P1pic.png"],
  //         },
  //         {
  //           text: [
  //             " paragraph 1 :Users can view a comprehensive dashboard that provides an overview of all projects",
  //             " paragraph 2 : including their status, deadlines, and assigned team members.",
  //           ],
  //           listItems: ["List Item Paragrapht 1", "List Item Paragraph 2"],
  //           images: ["/P3Pic.png", "/P3Pic.png"],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 19,
    title: "Library Management",
    urlTitle: "library-management",
    img: ["/P19pic.png"],
    liveLink: "https://library-management-system-alpha-nine.vercel.app/",
    shortDescription:
      "A frontend Next.js library management system built in March 2025, featuring user and admin functionalities for book borrowing, profile management, and fine tracking with MongoDB integration.",
    longDescription:
      "Library Management is a frontend Next.js application developed in March 2025 for a client to manage a library system. It supports user authentication, book browsing, borrowing with a limit of 3 books, and fine calculation for overdue returns, all powered by MongoDB for robust data management. Users can search books, view borrowing history, and manage profiles, while admins can add, edit, or delete books and view user details. Built with Next.js, React, Tailwind CSS, JavaScript, and MongoDB, the site ensures a responsive and intuitive experience, showcasing skills in database integration, dynamic routing, and modern UI design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
      ["MongoDB", "/Mongodb.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/Azmain-Library",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page displays a grid of book cards with images and IDs, accessible only after login, with a navbar containing History and Login (or profile icon post-login).",
              "Unauthenticated users clicking cards or navbar items are redirected to the /login route."
            ],
            listItems: [
              "Responsive book card grid layout",
              "Protected routes requiring authentication",
              "Dynamic navbar with profile icon post-login",
              "Visual fallback to first name's letter if no profile image"
            ],
            images: ["/P19pic.png", "/P19_3pic.png"],
          },
        ],
      },
      {
        title: "Authentication Routes",
        description: [
          {
            text: [
              "Unauthenticated users are redirected to the /login route, featuring a login form, with an option to navigate to the /register route for account creation.",
              "Post-login, users see their profile image or first name’s initial in the navbar on the landing page."
            ],
            listItems: [
              "Secure login form with MongoDB-backed authentication",
              "Seamless navigation between login and registration",
              "Responsive form design for all devices",
              "Dynamic navbar update post-authentication"
            ],
            images: ["/P19_1pic.png", "/P19_2pic.png"],
          },
        ],
      },
      {
        title: "User Book Interaction (/user Route)",
        description: [
          {
            text: [
              "Clicking a book card navigates to the /user route, showing detailed book information on the left with a 'Borrow Book' button, 'Return Book' if borrowed, or messages like 'No more books in the stock' or 'Maximum book borrow limit (3) has reached.'",
              "The right side displays the user’s borrowed books with images, borrow dates, expired dates, and a red pop-up for overdue fines (100 TK per book per day, e.g., 400 TK for two books overdue by two days)."
            ],
            listItems: [
              "Detailed book view with borrow/return options",
              "Borrow limit enforcement (max 3 books)",
              "Real-time fine calculation for overdue books",
              "Responsive split layout for book and borrow list"
            ],
            images: ["/P19_5pic.png", "/P19_6pic.png", "/P19_7pic.png", "/P19_8pic.png", "/P19_9pic.png"],
          },
        ],
      },
      {
        title: "Search Functionality",
        description: [
          {
            text: [
              "A search input box on the landing page allows users to filter book cards by title, author, genre, or ID, providing real-time results with MongoDB queries."
            ],
            listItems: [
              "Dynamic search filtering across multiple fields",
              "Real-time updates to book card display",
              "User-friendly search input design",
              "MongoDB-backed search optimization"
            ],
            images: ["/P19_4pic.png"],
          },
        ],
      },
      {
        title: "History Route (/history)",
        description: [
          {
            text: [
              "The /history route, accessible via the navbar, displays the user’s lifetime borrowing history in book cards, each showing the book image, borrowing date, and returning or expired date."
            ],
            listItems: [
              "Comprehensive borrowing history display",
              "Card-based layout for historical records",
              "Clear date information for borrowing and returns",
              "Responsive design for history overview"
            ],
            images: ["/P19_10pic.png"],
          },
        ],
      },
      {
        title: "Profile Route (/profile)",
        description: [
          {
            text: [
              "The /profile route shows the user’s personal information from registration, with options to upload, change, or remove a profile photo, update name, bio, password (but not email), and log out."
            ],
            listItems: [
              "Editable profile with photo and personal details",
              "Secure updates for name, bio, and password",
              "Logout functionality with redirection to login",
              "Responsive profile page layout"
            ],
            images: ["/P19_11pic.png"],
          },
        ],
      },
      {
        title: "Admin Dashboard (/admin Route)",
        description: [
          {
            text: [
              "Admins access all user features plus two additional navbar items: Users and Admin. The /admin route allows adding new books via a form on the left and viewing/editing/deleting existing books in a row-based list on the right.",
              "Books cannot be deleted if currently borrowed by any user, with MongoDB ensuring data integrity."
            ],
            listItems: [
              "Form for adding new books with validation",
              "Row-based list for book management",
              "Restricted deletion for borrowed books",
              "MongoDB-backed CRUD operations"
            ],
            images: ["/P19_12pic.png"],
          },
        ],
      },
      {
        title: "Users Route (/allUsers)",
        description: [
          {
            text: [
              "The /allUsers route, accessible to admins via the navbar, displays all user information in card format, including user image, name, email, and phone."
            ],
            listItems: [
              "Card-based layout for user information",
              "Display of user image and contact details",
              "Responsive design for admin user management",
              "Secure access restricted to admins"
            ],
            images: ["/P19_13pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast performance and SEO-friendly content delivery.",
              "Integrates MongoDB for robust, real-time book and user data management, with Tailwind CSS for responsive, utility-first styling."
            ],
            listItems: [
              "Next.js dynamic routing for user and admin pages",
              "MongoDB for efficient data storage and retrieval",
              "React hooks for state and effect management",
              "Tailwind CSS for consistent, responsive design",
              "Fine calculation logic for overdue books"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Cafeteria",
    urlTitle: "cafeteria",
    img: ["/P7pic.png"],
    liveLink: "https://cafeteria-opal-psi.vercel.app/",
    shortDescription:
      "A frontend React.js e-commerce platform built in February 2025 for a cafeteria, featuring user/admin dashboards, food ordering, and Firebase integration.",
    longDescription:
      "Cafeteria is a frontend React.js application developed in February 2025 for an online food ordering platform. It supports user authentication via Firebase, with distinct interfaces for admins and users. Admins can manage food items, employees, members, vendors, raw materials, works, and payments, while users can browse food items, add to cart, and view profiles. Styled with Tailwind CSS and integrated with Firebase for real-time database operations, the site ensures a responsive, intuitive experience, showcasing skills in authentication, role-based routing, and dynamic UI.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
      ["Firebase", "/Firebase.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/Cafeteria",
    feaTures: [
      {
        title: "Authentication Routes",
        description: [
          {
            text: [
              "Unauthenticated users are directed to the /login route, displaying a login form for secure access.",
              "From the login page, users can navigate to the /register route to create a new account."
            ],
            listItems: [
              "Secure login form with Firebase authentication",
              "Seamless navigation to registration page",
              "Responsive form design for all devices",
              "User-friendly authentication flow"
            ],
            images: ["/P7_1pic.png", "/P7_2pic.png"],
          },
        ],
      },
      {
        title: "Admin Dashboard",
        description: [
          {
            text: [
              "Upon admin login, users are redirected to the landing page (/) with a navbar containing Home, Food Items, Employees, Members, Vendors, Raw Materials, Works, Payment, and Log Out.",
              "Clicking 'Food Items' navigates to /foodItems, where admins can update, edit, or delete food items in the Firebase database."
            ],
            listItems: [
              "Role-based admin navbar with management options",
              "CRUD operations for food items via Firebase",
              "Responsive admin interface for database management",
              "Secure admin-only access to sensitive routes"
            ],
            images: ["/P7_3pic.png", "/P7_4pic.png"],
          },
        ],
      },
      {
        title: "User Dashboard",
        description: [
          {
            text: [
              "Upon user login, the landing page (/) displays a navbar with Profile, Home, Food Items, Cart, and Log Out options, tailored for user interaction.",
              "The landing page provides a welcoming interface consistent with admin access but with user-specific functionality."
            ],
            listItems: [
              "User-specific navbar with relevant options",
              "Consistent landing page design for all roles",
              "Responsive and intuitive user interface",
              "Secure user authentication via Firebase"
            ],
            images: ["/P7_5pic.png"],
          },
        ],
      },
      {
        title: "Food Items Route (/foodItems)",
        description: [
          {
            text: [
              "For users, the /foodItems route displays a grid of food item cards, each featuring an image, name, quantity, price, and 'Add to Cart' button.",
              "The interface allows users to browse and select food items for purchase, distinct from the admin’s management view."
            ],
            listItems: [
              "Responsive food item card grid layout",
              "Clear display of item details and pricing",
              "Interactive 'Add to Cart' functionality",
              "User-focused browsing experience"
            ],
            images: ["/P7pic.png"],
          },
        ],
      },
      {
        title: "Cart Route (/cart)",
        description: [
          {
            text: [
              "Clicking the Cart icon navigates users to the /cart route, showing all selected food items with their total price.",
              "Users can proceed to payment or empty the cart using dedicated buttons."
            ],
            listItems: [
              "Dynamic cart display with total cost",
              "Options to proceed to payment or clear cart",
              "Responsive design for cart management",
              "Real-time updates with Firebase integration"
            ],
            images: ["/P7_6pic.png"],
          },
        ],
      },
      {
        title: "Profile Route (/profile)",
        description: [
          {
            text: [
              "The /profile route displays the user’s personal information provided during registration, offering a clear and concise view of their account details."
            ],
            listItems: [
              "Display of user registration details",
              "Responsive profile page layout",
              "Secure data retrieval via Firebase",
              "Clean and user-friendly interface"
            ],
            images: ["/P7_7pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for dynamic, component-based architecture and Firebase for secure authentication and real-time database operations.",
              "Utilizes Tailwind CSS for responsive, utility-first styling, ensuring a consistent and modern design across all routes."
            ],
            listItems: [
              "Firebase for authentication and data management",
              "React Router for role-based navigation",
              "React hooks for state and effect management",
              "Tailwind CSS for rapid, responsive styling",
              "Optimized performance for e-commerce functionality"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 14,
    title: "Our Agency",
    urlTitle: "our-agency",
    img: ["/P14pic.png"],
    liveLink: "https://our-agency-one.vercel.app/",
    shortDescription:
      "A frontend Next.js website built in January 2025 for a custom agency, showcasing their work with dynamic animations and responsive design.",
    longDescription:
      "Our Agency is a frontend Next.js website developed in January 2025 for a custom agency to highlight their portfolio. The site features a dynamic landing page with interactive work previews, a dedicated works route, and a contact form. Built with Next.js, React, Framer Motion, Tailwind CSS, and JavaScript, it uses Framer Motion for smooth animations on hover and navigation. The platform offers a responsive, engaging experience, showcasing skills in dynamic routing, animation integration, and modern UI design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Framer Motion", "/framerMotion.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/OurAgency",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page features a responsive navbar with 'Our Work,' 'Play Music,' and 'Get in Touch' buttons, creating an intuitive navigation experience.",
              "The hero section includes a heading, subheading, and smaller divs listing all agency works, with Framer Motion animations enhancing interactivity."
            ],
            listItems: [
              "Responsive navbar with interactive buttons",
              "Dynamic hero with engaging heading and subheading",
              "Work preview divs with Framer Motion animations",
              "Consistent design across devices"
            ],
            images: ["/P14pic.png"],
          },
          {
            text: [
              "On mouseover of any work div, the background image changes to the work’s image, and the heading/subheading area updates to show the work’s image, title, small description, and work type."
            ],
            listItems: [
              "Dynamic background image change on hover",
              "Animated content swap using Framer Motion",
              "Interactive work previews with title and type",
              "Smooth transitions for enhanced UX"
            ],
            images: ["/P14_1pic.png"],
          },
        ],
      },
      {
        title: "Work Detail Page (/works/{work-title})",
        description: [
          {
            text: [
              "Clicking a work div navigates to a dynamic route (/works/{work-title}), displaying a detailed view of the selected work, including its image, title, type, and comprehensive description.",
              "The page provides an immersive experience with rich content and consistent styling."
            ],
            listItems: [
              "Dynamic routing for individual work pages",
              "Detailed work descriptions with images",
              "Consistent layout with landing page previews",
              "Responsive design for detailed content"
            ],
            images: ["/P14_2pic.png"],
          },
        ],
      },
      {
        title: "Works Route (/works)",
        description: [
          {
            text: [
              "The Works route, accessible via the 'Our Work' navbar link, displays all work cards with images, titles, and types, mirroring the landing page’s interactive design.",
              "Clicking any card navigates to the respective /works/{work-title} route for detailed information."
            ],
            listItems: [
              "Card-based layout for all agency works",
              "Interactive cards with images and types",
              "Seamless navigation to detailed work pages",
              "Framer Motion animations for card interactions"
            ],
            images: ["/P14_3pic.png"],
          },
        ],
      },
      {
        title: "Contact Route (/contact)",
        description: [
          {
            text: [
              "The Contact route, accessible via the 'Get in Touch' button, features a 'Send Message' form for users to submit inquiries or feedback.",
              "The form is designed for simplicity and reliability, ensuring effective communication with the agency."
            ],
            listItems: [
              "Integrated contact form with validation",
              "Responsive design for desktop and mobile",
              "Clear call-to-action for user inquiries",
              "Consistent styling with Tailwind CSS"
            ],
            images: ["/P14_4pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast performance and SEO-friendly content delivery.",
              "Utilizes Framer Motion for smooth animations on hover and navigation, combined with Tailwind CSS for responsive, utility-first styling."
            ],
            listItems: [
              "Next.js dynamic routing for work pages",
              "Framer Motion for interactive animations",
              "React hooks for state and effect management",
              "Tailwind CSS for consistent, responsive design",
              "Optimized performance for agency portfolio"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 17,
    title: "Home Test",
    urlTitle: "home-test",
    img: ["/P17pic.png"],
    liveLink: "https://home-ssc-model-test.vercel.app/",
    shortDescription:
      "A frontend Next.js application built in December 2024 for a home-based SSC exam preparation system, featuring MCQ tests for Chemistry with AI-generated questions.",
    longDescription:
      "Home Test is a frontend Next.js application developed in December 2024 to aid students in preparing for SSC examinations through a self-paced MCQ model test system. The platform focuses on Chemistry for grades 9 and 10, utilizing the Gemini 2.5 Flash API to generate dynamic MCQs. The site features a minimalistic navbar, a home route with motivational messaging, and a Chemistry route for generating and answering MCQs with instant feedback. Built with Next.js, React, Tailwind CSS, and JavaScript, it offers a responsive and engaging user experience, showcasing skills in API integration, dynamic content generation, and interactive UI design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/HomeSSCModelText",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page welcomes students with a bold message: 'Prepare Yourself Better for Your Upcoming SSC Examination,' encouraging self-paced exam preparation.",
              "A minimalistic navbar contains a single 'Chemistry' link, guiding users to the MCQ test generation route."
            ],
            listItems: [
              "Motivational heading for student engagement",
              "Minimalistic navbar for focused navigation",
              "Responsive design for all devices",
              "Clear call-to-action for Chemistry route"
            ],
            images: ["/P17pic.png"],
          },
        ],
      },
      {
        title: "Chemistry Route (/chemistry)",
        description: [
          {
            text: [
              "The Chemistry route presents a 'Generate' button, allowing students to create a set of MCQs based on Chapter 1 of Chemistry for grades 9 and 10, stored in the file system.",
              "Clicking the 'Generate' button triggers the Gemini 2.5 Flash API to produce 5 MCQs, each with 4 options (one correct, three incorrect)."
            ],
            listItems: [
              "Dynamic MCQ generation via Gemini 2.5 Flash API",
              "Chapter-specific content for grades 9 and 10",
              "Responsive layout for question display",
              "Clear and intuitive 'Generate' button"
            ],
            images: ["/P17_1pic.png", "/P17_2pic.png"],
          },
        ],
      },
      {
        title: "MCQ Interaction and Feedback",
        description: [
          {
            text: [
              "Students can select answers for the 5 displayed MCQs and submit their responses using a 'Submit' button.",
              "Upon submission, correct answers are highlighted with a green background, while incorrect student-selected answers are marked with a red background for immediate feedback."
            ],
            listItems: [
              "Interactive answer selection for MCQs",
              "Color-coded feedback (green for correct, red for incorrect)",
              "Instant result display after submission",
              "Responsive and clear question interface"
            ],
            images: ["/P17_3pic.png"],
          },
        ],
      },
      {
        title: "Restart Functionality",
        description: [
          {
            text: [
              "A 'Restart' button allows students to return to the initial generate state, clearing previous answers and enabling a fresh set of MCQs to be generated."
            ],
            listItems: [
              "Seamless reset to initial MCQ generation state",
              "Clear user feedback for restart action",
              "Efficient state management for test resets",
              "Consistent UI flow for repeated practice"
            ],
            images: ["/P17_1pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast performance and SEO-friendly content delivery.",
              "Integrates the Gemini 2.5 Flash API for dynamic MCQ generation, combined with Tailwind CSS for a responsive, utility-first design."
            ],
            listItems: [
              "Next.js routing for seamless navigation",
              "Gemini 2.5 Flash API for real-time question generation",
              "React hooks for state and effect management",
              "Tailwind CSS for consistent, responsive styling",
              "Optimized performance for educational content delivery"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Protein Corner",
    urlTitle: "protein-corner",
    img: ["/P8pic.png"],
    liveLink: "https://protein-corner-frontend.vercel.app/",
    shortDescription:
      "A frontend Next.js e-commerce platform built in November 2024 for Protein Corner, showcasing protein-based products with filtering, cart, and payment features.",
    longDescription:
      "Protein Corner is a frontend Next.js e-commerce application developed in November 2024 to sell protein-based products like chicken, fish, beef, egg, and milk. The site features a dynamic hero section with a product video, a responsive navbar, product cards with filtering options, a contact form, a cart system, and a payment route. Built with Next.js, React, Tailwind CSS, and JavaScript, it delivers a fast, user-friendly experience, highlighting skills in dynamic routing, state management, and responsive design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/protein-corner-frontend",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page features a hero section with a video showcasing chicken, fish, beef, egg, and milk, creating an engaging introduction to the store.",
              "The navbar includes links to Shop, Contact, Payment, Login, and a Cart icon, with 'Enter Shop' and 'Contact Us' buttons in the hero section."
            ],
            listItems: [
              "Dynamic hero video for product engagement",
              "Responsive navbar with intuitive navigation",
              "Prominent call-to-action buttons in hero",
              "Consistent design across devices"
            ],
            images: ["/P8pic.png"],
          },
          {
            text: [
              "Scrolling down reveals a product catalog with cards displaying image, name, price, discount, and an 'Add to Cart' button, alongside filtering options for all, chicken, beef, egg, milk, and fish."
            ],
            listItems: [
              "Responsive product card grid layout",
              "Dynamic filtering by product category",
              "Clear pricing and discount display",
              "Interactive 'Add to Cart' functionality"
            ],
            images: ["/P8_1pic.png"],
          },
        ],
      },
      {
        title: "Shop Route",
        description: [
          {
            text: [
              "The Shop route mirrors the product catalog from the landing page, featuring cards with image, name, price, discount, and 'Add to Cart' button, along with category filters for all, chicken, beef, egg, milk, and fish.",
              "This dedicated route provides a focused shopping experience with consistent design and functionality."
            ],
            listItems: [
              "Consistent product card layout with landing page",
              "Category-based filtering for easy browsing",
              "Seamless add-to-cart interactions",
              "Optimized for performance and usability"
            ],
            images: ["/P8_1_1pic.png"],
          },
        ],
      },
      {
        title: "Cart Functionality",
        description: [
          {
            text: [
              "Clicking 'Add to Cart' on a product card adds the item to the cart, accessible via the Cart icon in the navbar, displaying all added products.",
              "Users can adjust quantities using '+' and '-' buttons for each product in the cart."
            ],
            listItems: [
              "Dynamic cart with real-time updates",
              "Quantity adjustment for each product",
              "Responsive cart display for all devices",
              "State management for cart persistence"
            ],
            images: ["/P8_3pic.png"],
          },
        ],
      },
      {
        title: "Contact Route",
        description: [
          {
            text: [
              "The Contact route features a 'Send Message' form linked to the company email, allowing users to submit inquiries or support requests, similar to the Utes project.",
              "The form is designed for simplicity and reliability, ensuring effective communication with the Protein Corner team."
            ],
            listItems: [
              "Integrated contact form with email functionality",
              "Form validation for reliable submissions",
              "Responsive design for desktop and mobile",
              "Clear call-to-action for inquiries"
            ],
            images: ["/P8_2pic.png"],
          },
        ],
      },
      {
        title: "Payment Route",
        description: [
          {
            text: [
              "The Payment route displays all products added to the cart, their total cost, and a 'Checkout' button to complete the purchase process.",
              "The layout ensures clarity and ease of use for finalizing transactions."
            ],
            listItems: [
              "Comprehensive cart summary with total cost",
              "Checkout button for transaction completion",
              "Responsive and clear payment interface",
              "Secure and streamlined purchase flow"
            ],
            images: ["/P8_4pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast load times and SEO-friendly content delivery.",
              "Utilizes Tailwind CSS for a responsive, utility-first design system, maintaining consistency across all routes and devices."
            ],
            listItems: [
              "Next.js dynamic routing for shop and payment pages",
              "React hooks for state and effect management",
              "Tailwind CSS for rapid, responsive styling",
              "Optimized image and video handling",
              "SEO-friendly structure for e-commerce visibility"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Utes",
    urlTitle: "utes",
    img: ["/P12pic.png"],
    liveLink: "https://utes.vercel.app/",
    shortDescription:
      "A frontend Next.js website built in October 2024 for Utes, an IT solutions company, featuring a comprehensive showcase of services, solutions, and support with responsive design.",
    longDescription:
      "Utes is a frontend Next.js website developed in October 2024 for Utes, an IT solutions company, where I served as the sole frontend developer. The platform showcases the company’s services, solutions, and support offerings through a professional interface with dynamic routing. It includes a responsive navbar with theme toggle and login, a hero section, detailed service and solution pages, a contact form, and an about page. Built with Next.js, Tailwind CSS, and JavaScript, the site ensures a seamless, modern user experience, highlighting my skills in dynamic routing, responsive design, and content presentation.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/Utes",
    feaTures: [
      {
        title: "Landing Page (/ Route)",
        description: [
          {
            text: [
              "The landing page features a responsive navbar with the Utes logo, links to Services, Solutions, Supports, Contact, About, a theme toggle button, and a login button for user authentication.",
              "The hero section displays an image of the company building with a heading 'Transforming Your Ideas into Digital Reality' and a subheading 'Expert IT Solutions Designed to Optimize Operations, Enhance Security, and Propel Your Business into the Future.'"
            ],
            listItems: [
              "Responsive navbar with dynamic theme toggle and login",
              "Engaging hero section with impactful imagery and messaging",
              "Clear typography and professional layout",
              "Smooth scrolling and interactive card previews"
            ],
            images: ["/P12pic.png"],
          },
          {
            text: [
              "Scrolling down reveals cards showcasing solutions, services, and support offerings, providing a quick overview of Utes’s capabilities."
            ],
            listItems: [
              "Card-based layout for solutions and services",
              "Responsive grid optimized for all devices",
              "Interactive hover effects for user engagement",
              "Consistent visual hierarchy for easy navigation"
            ],
            images: ["/P12_1pic.png"],
          },
        ],
      },
      {
        title: "Services Route",
        description: [
          {
            text: [
              "The Services route details Utes’s offerings, including Web Development, Android App Development, iOS App Development, Domain and Hosting, Digital Marketing, Email Marketing, Cyber Security Service, and Graphic Design.",
              "Each service includes a detailed description, e.g., 'Our IT solution company offers expert web development services, creating responsive, user-friendly websites tailored to your business needs,' paired with logos and visuals."
            ],
            listItems: [
              "Detailed service descriptions with business value",
              "Service-specific logos and imagery",
              "Responsive layout for multi-device access",
              "SEO-optimized content for discoverability"
            ],
            images: ["/P12_2pic.png"],
          },
        ],
      },
      {
        title: "Solutions Route",
        description: [
          {
            text: [
              "The Solutions route highlights AI Solution, ICT and Training, and E-Commerce and Online Market, each with in-depth descriptions and supporting visuals.",
              "Descriptions emphasize innovation, e.g., 'Our AI solution service empowers businesses with cutting-edge technology to enhance efficiency and decision-making.'"
            ],
            listItems: [
              "Detailed solution descriptions with technical focus",
              "Visuals tailored to AI, training, and e-commerce",
              "Business-oriented messaging for client appeal",
              "Consistent branding and styling"
            ],
            images: ["/P12_3pic.png"],
          },
        ],
      },
      {
        title: "Supports Route",
        description: [
          {
            text: [
              "The Supports route outlines Technical Support, Customer Support, Maintenance Support, and Warranty and Repairs, with descriptions emphasizing 24/7 availability and rapid response.",
              "Example: 'Our technical support team is dedicated to providing exceptional assistance for all your IT needs' with accompanying visuals."
            ],
            listItems: [
              "24/7 support with multiple contact channels",
              "Proactive maintenance and warranty services",
              "Clear, customer-focused support descriptions",
              "Responsive design for support information"
            ],
            images: ["/P12_4pic.png"],
          },
        ],
      },
      {
        title: "Contact Route",
        description: [
          {
            text: [
              "The Contact route features a 'Send Message' form linked to the company email, enabling users to submit inquiries or support requests.",
              "The form is designed for ease of use, ensuring seamless communication with the Utes team."
            ],
            listItems: [
              "Integrated contact form with email functionality",
              "Form validation for reliable submissions",
              "Responsive design for desktop and mobile devices",
              "Clear call-to-action for business inquiries"
            ],
            images: ["/P12_5pic.png"],
          },
        ],
      },
      {
        title: "About Route",
        description: [
          {
            text: [
              "The About route presents 'About Utes' with a compelling narrative: 'At Utes, we are dedicated to transforming businesses through innovative IT solutions. With a team of experienced professionals, we specialize in software development, cloud services, and cybersecurity.'",
              "The page emphasizes the company's mission, customer-centric approach, and commitment to excellence and continuous improvement."
            ],
            listItems: [
              "Compelling company narrative and mission statement",
              "Showcase of specialized services and expertise",
              "Customer-centric approach and tailoring emphasis",
              "Professional content tailored for business partnerships"
            ],
            images: ["/P12_6pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring optimal performance and SEO benefits for the corporate website.",
              "Utilizes Tailwind CSS for a responsive, utility-first design system that maintains consistency across all routes and devices."
            ],
            listItems: [
              "Next.js dynamic routing for multi-page architecture",
              "Tailwind CSS for rapid, responsive development",
              "React components for reusable UI elements",
              "Optimized image handling and performance",
              "SEO-friendly structure for business visibility"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Guest Book",
    urlTitle: "guest-book",
    img: ["/P6pic.png"],
    liveLink: "https://guest-book-gamma.vercel.app/",
    shortDescription:
      "A frontend React.js application built in September 2024 for an interactive guest book platform, featuring user authentication, profile customization, and responsive design.",
    longDescription:
      "Guest Book is a frontend React.js application developed in September 2024 to create an interactive platform where users can log in, customize their profiles, and manage personal details. The app features authentication routes (/login and /register), a home page with a profile display, and options to upload a photo, edit a bio, and log out. Styled with Tailwind CSS, it offers a clean, responsive interface, showcasing skills in user authentication, state management, and dynamic UI components.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
      ["Firebase", "/Firebase.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/GuestBook",
    feaTures: [
      {
        title: "Authentication Routes",
        description: [
          {
            text: [
              "Unauthenticated users accessing the root route (/) are redirected to the /login route for secure access.",
              "The login page provides an option to navigate to the registration page, with seamless navigation back to login from registration."
            ],
            listItems: [
              "Protected routes for authenticated users",
              "Smooth navigation between login and registration",
              "Responsive form layouts for user input",
              "Secure redirection for unauthorized access"
            ],
            images: ["/P6_1pic.png", "/P6_2pic.png"],
          },
        ],
      },
      {
        title: "Home Route: User Profile",
        description: [
          {
            text: [
              "After successful login, users land on the home route (/) displaying a profile circle showing the first letter of their name if no photo is set.",
              "The profile includes an upload photo icon, delete photo icon, a bio field with an edit bio icon, and a logout button below."
            ],
            listItems: [
              "Dynamic profile circle with initial letter fallback",
              "Interactive photo upload and delete functionality",
              "Editable bio field with intuitive controls",
              "Logout button for secure session termination"
            ],
            images: ["/P6_3pic.png"],
          },
          {
            text: [
              "Users can upload a profile photo and update their bio, with changes reflected instantly in the profile display."
            ],
            listItems: [
              "Real-time profile photo updates",
              "Dynamic bio editing with instant UI refresh",
              "Responsive design for profile elements",
              "User-friendly feedback for profile changes"
            ],
            images: ["/P6_4pic.png"],
          },
        ],
      },
      {
        title: "Logout Functionality",
        description: [
          {
            text: [
              "Clicking the logout button terminates the session and redirects the user back to the /login route, ensuring secure access control."
            ],
            listItems: [
              "Secure session termination",
              "Seamless redirection to login page",
              "Clear user feedback on logout",
              "Consistent navigation flow"
            ],
            images: ["/P6_1pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for efficient component-based architecture and dynamic user interactions.",
              "Utilizes Tailwind CSS for responsive, utility-first styling, ensuring a consistent and modern interface across devices."
            ],
            listItems: [
              "React Router for authentication and navigation",
              "React hooks for state management and side effects",
              "Tailwind CSS for rapid and responsive styling",
              "Clean and modular code structure"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Tasker",
    urlTitle: "tasker",
    img: ["/P3Pic.png"],
    liveLink: "https://improved-tasker5.vercel.app/",
    shortDescription:
      "A frontend React.js task management application built in September 2024, enabling users to create, edit, delete, and organize tasks with intuitive notifications and search features.",
    longDescription:
      "Tasker is a frontend React.js application developed in September 2024 for efficient task management. The home route features a hero section and a task list area where users can add, edit, delete, favorite, and search tasks. Tasks include details like title, description, priority, and tags, with mandatory field validation and color-coded notifications for actions. Styled with Tailwind CSS, the app provides a responsive and user-friendly interface, demonstrating advanced state management, form handling, and UI feedback mechanisms in React.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/ImprovedTasker5",
    feaTures: [
      {
        title: "Home Route: Hero and Initial Task View",
        description: [
          {
            text: [
              "The home route opens with an engaging hero section that introduces the task management functionality.",
              "Below the hero, an empty task list displays 'Create Your First Task' title, an 'Add Task' button, and 'Task List is empty!' message in the center."
            ],
            listItems: [
              "Visually appealing hero section for user onboarding",
              "Clear call-to-action with 'Add Task' button",
              "Responsive layout adapting to all screen sizes",
              "Intuitive empty state design to encourage interaction"
            ],
            images: ["/P3Pic.png", "/P3_1pic.png"],
          },
        ],
      },
      {
        title: "Adding a New Task",
        description: [
          {
            text: [
              "Clicking 'Add Task' opens a large absolute modal titled 'Add New Task' where users input task title, description, priority, and tags—all fields are mandatory.",
              "If fields are incomplete, an error message appears: 'You have to give every information about this task!' preventing creation."
            ],
            listItems: [
              "Modal form with mandatory fields for task details",
              "Client-side validation for complete data entry",
              "User-friendly input interfaces for priority and tags",
              "Seamless modal open/close animations"
            ],
            images: ["/P3_2pic.png", "/P3_3pic.png"],
          },
          {
            text: [
              "Upon filling all fields and clicking 'Create New Task', the task is added to the list with a green pop-up notification: 'Task {taskName} has been added successfully'."
            ],
            listItems: [
              "Successful addition with visual confirmation",
              "Dynamic task rendering in the main list",
              "Color-coded success notification",
              "Persistent task storage using local state"
            ],
            images: ["/P3_4pic.png"],
          },
        ],
      },
      {
        title: "Editing a Task",
        description: [
          {
            text: [
              "Each task has an edit button; clicking it opens the same modal titled 'Edit Task' pre-filled with existing details for updates.",
              "After modifications and confirmation, the task updates in the list with a yellow pop-up: 'Task {taskName} has been edited successfully'."
            ],
            listItems: [
              "Pre-populated edit modal for seamless updates",
              "Validation and error handling during edits",
              "Real-time reflection of changes in the UI",
              "Yellow notification for edit confirmation"
            ],
            images: ["/P3_5pic.png", "/P3_6pic.png"],
          },
        ],
      },
      {
        title: "Deleting Tasks",
        description: [
          {
            text: [
              "Individual tasks can be deleted via a delete button, triggering a red pop-up: 'Task {taskName} has been deleted successfully'.",
              "A 'Delete All' button clears the entire list, showing 'All tasks has been deleted successfully' and resetting to the initial empty state."
            ],
            listItems: [
              "Instant removal with confirmation notification",
              "Bulk delete functionality for all tasks",
              "Red color-coded alerts for destructive actions",
              "State reset to empty view after full deletion"
            ],
            images: ["/P3_7pic.png", "/P3_10pic.png"],
          },
        ],
      },
      {
        title: "Additional Task Management Features",
        description: [
          {
            text: [
              "Tasks can be marked as favorite or unfavorite for quick access, and a search input field filters tasks dynamically by name or tags.",
              "These features enhance organization and retrieval, making task management more efficient."
            ],
            listItems: [
              "Toggle favorite status with visual indicators",
              "Real-time search filtering across tasks",
              "Combined priority and tag-based organization",
              "Responsive updates without page reloads"
            ],
            images: ["/P3_8pic.png", "/P3_9pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for component-based architecture, enabling modular task components and modal dialogs.",
              "Utilizes Tailwind CSS for responsive styling and quick development of modals, notifications, and layouts."
            ],
            listItems: [
              "React hooks for state management and side effects",
              "Local state persistence for tasks (useState/useEffect)",
              "Tailwind CSS for consistent and utility-first styling",
              "Event-driven notifications with timed dismissals"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "CineRental",
    urlTitle: "cine-rental",
    img: ["/P10pic.png"],
    liveLink: "https://cine-rental-two.vercel.app/",
    shortDescription:
      "A frontend React.js application built in August 2024 for renting movies, featuring a responsive movie catalog, cart functionality, and theme switching.",
    longDescription:
      "CineRental is a frontend React.js application developed in August 2024 to allow users to browse and rent movies. The home route displays a collection of movie cards, each with details like name, genre, rating, and an 'Add to Cart' button. The app includes dynamic pop-up messages for cart actions, a detailed movie view, a cart summary with checkout and removal options, and a light/dark theme toggle. Styled with Tailwind CSS, it ensures a seamless, responsive experience across devices, showcasing skills in state management, UI/UX design, and interactive components.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/CineRental",
    feaTures: [
      {
        title: "Home Route: Movie Catalog",
        description: [
          {
            text: [
              "The home route showcases a collection of movie cards, each displaying the movie's name, genre, rating, and an 'Add to Cart' button for quick interaction.",
              "The layout is designed to be visually engaging, with a responsive grid that adapts to various screen sizes for optimal browsing."
            ],
            listItems: [
              "Responsive movie card grid layout",
              "Clear display of movie name, genre, and rating",
              "Interactive 'Add to Cart' button on each card",
              "Optimized for performance across devices"
            ],
            images: ["/P10pic.png"],
          },
        ],
      },
      {
        title: "Cart Functionality",
        description: [
          {
            text: [
              "Clicking the 'Add to Cart' button adds the movie to the cart and displays an absolute pop-up message: 'The movie {movieName} added to the cart'.",
              "If the same movie is added again, a pop-up message appears: 'The movie {movieName} has been added to the cart already'."
            ],
            listItems: [
              "Dynamic pop-up messages for cart actions",
              "State management to track added movies",
              "User-friendly feedback for duplicate additions",
              "Smooth and responsive cart interactions"
            ],
            images: ["/P10_1pic.png", "/P10_2pic.png"],
          },
        ],
      },
      {
        title: "Theme Switching",
        description: [
          {
            text: [
              "The app supports light and dark theme switching, allowing users to toggle between modes for a personalized viewing experience.",
              "The theme toggle is seamlessly integrated, ensuring consistent styling across all components and pages."
            ],
            listItems: [
              "Light and dark theme toggle functionality",
              "Consistent styling with Tailwind CSS",
              "Persistent theme state management",
              "Smooth transitions between themes"
            ],
            images: ["/P10_3pic.png"],
          },
        ],
      },
      {
        title: "Movie Detail Pop-up",
        description: [
          {
            text: [
              "Clicking a movie card's image opens a large, centered absolute pop-up div displaying detailed movie information, including a big image, name, rating, and 'Add to Cart' button.",
              "The pop-up provides an immersive view of the selected movie, enhancing user engagement with clear and detailed content."
            ],
            listItems: [
              "Dynamic pop-up for detailed movie information",
              "Large image display with rating and cart button",
              "Responsive and centered pop-up design",
              "Seamless navigation and interaction"
            ],
            images: ["/P10_4pic.png"],
          },
        ],
      },
      {
        title: "Cart Summary Pop-up",
        description: [
          {
            text: [
              "Clicking the cart icon in the navigation opens a large absolute pop-up div displaying all movies added to the cart, along with a checkout button.",
              "Users can remove individual movies from the cart, providing flexible cart management within the pop-up."
            ],
            listItems: [
              "Comprehensive cart summary with all added movies",
              "Checkout button for completing the rental process",
              "Remove functionality for individual movies",
              "Responsive and user-friendly pop-up design"
            ],
            images: ["/P10_5pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for efficient component-based architecture and dynamic user interactions.",
              "Utilizes Tailwind CSS for rapid development of a responsive and visually consistent user interface."
            ],
            listItems: [
              "React hooks for state and effect management",
              "Dynamic pop-up components for cart and movie details",
              "Tailwind CSS for responsive and consistent styling",
              "Clean and modular code structure"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Shop Center",
    urlTitle: "shop-center",
    img: ["/P5pic.png"],
    liveLink: "https://shop-center-black.vercel.app/",
    shortDescription:
      "A frontend Next.js e-commerce platform built in August 2024 to showcase and sell products online, featuring a responsive product catalog and dynamic routing.",
    longDescription:
      "Shop Center is a frontend Next.js e-commerce platform developed in August 2024 for a client to facilitate online product browsing and purchasing. The site features a hero section on the home route, a product catalog with clickable cards, and dynamic routes for individual products and category pages. Styled with Tailwind CSS and powered by React and Next.js, it offers a fast, user-friendly shopping experience across devices, showcasing skills in dynamic routing, API integration, and UI/UX design.",
    techStack: [
      ["Next.js", "/NextJs.png"],
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/ShopCenter",
    feaTures: [
      {
        title: "Home Route: Hero and Product Catalog",
        description: [
          {
            text: [
              "The home route features a visually engaging hero section that welcomes users and sets the tone for the e-commerce experience.",
              "Scrolling down reveals a product catalog with cards displaying each product's image, name, category, and price, such as 'iPhone 9 (smartphones) - An apple mobile which is nothing like apple - $549 $478'."
            ],
            listItems: [
              "Eye-catching hero section for brand impact",
              "Responsive grid layout for product cards",
              "Clear display of product name, category, and pricing",
              "Clickable cards for seamless navigation to product details"
            ],
            images: ["/P5pic.png", "/P5_1pic.png"],
          },
        ],
      },
      {
        title: "Product Detail Page",
        description: [
          {
            text: [
              "Accessible via dynamic routes (/product/id), the product detail page displays an enlarged image of the selected product along with detailed information.",
              "Details include product name, category (e.g., smartphones), rating, discount, price, and an 'Add to Cart' button, e.g., 'iPhone 9 (smartphones) - An apple mobile which is nothing like apple - $549 $478'."
            ],
            listItems: [
              "Dynamic routing for individual product pages",
              "Detailed product information with ratings and discounts",
              "Interactive 'Add to Cart' functionality",
              "Responsive layout for enhanced viewing"
            ],
            images: ["/P5_2pic.png"],
          },
        ],
      },
      {
        title: "Category Page",
        description: [
          {
            text: [
              "Clicking the category text (e.g., 'smartphones') navigates to a dynamic category route (/category/smartphones) displaying all products within that category.",
              "The category page provides a filtered view of products, maintaining the same card-based layout for consistency and ease of browsing."
            ],
            listItems: [
              "Dynamic category routing for filtered product display",
              "Consistent card layout for category-specific products",
              "Seamless navigation from product to category pages",
              "Optimized for quick category browsing"
            ],
            images: ["/P5_3pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with Next.js for server-side rendering and dynamic routing, ensuring fast load times and SEO-friendly content delivery.",
              "Utilizes Tailwind CSS for a responsive, visually consistent design, enhancing user engagement across mobile and desktop devices."
            ],
            listItems: [
              "Next.js dynamic routes for product and category pages",
              "React hooks for efficient state management",
              "Tailwind CSS for rapid and consistent styling",
              "Optimized image handling with Next.js Image component"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Book Finder",
    urlTitle: "book-finder",
    img: ["/P2pic.png"],
    liveLink: "https://lws-react-js-assignment-2.vercel.app/",
    shortDescription:
      "A frontend React.js application built in July 2024 for searching and discovering books, featuring intuitive search and sorting capabilities with a responsive design.",
    longDescription:
      "Book Finder is a frontend React.js application developed in July 2024 to help users search and discover books. The site features a home page displaying various books, with options to search via an input box and sort by alphabetical order or publication year. Styled with Tailwind CSS, it ensures a fast, responsive experience across devices, demonstrating skills in API integration, state management, and user-friendly UI design.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/LWS-ReactJS-Assignment-2",
    feaTures: [
      {
        title: "Home Page: Book Display",
        description: [
          {
            text: [
              "The home page serves as the main interface, showcasing a diverse collection of books in an organized and visually appealing layout.",
              "Users can browse through various kinds of books, with each entry displaying essential details for quick overview."
            ],
            listItems: [
              "Responsive grid layout for book cards",
              "Dynamic loading of book data",
              "Clean and intuitive user interface",
              "Optimized for performance across devices"
            ],
            images: ["/P2pic.png"],
          },
        ],
      },
      {
        title: "Search Functionality",
        description: [
          {
            text: [
              "An intuitive search input box allows users to find specific books quickly by entering keywords or titles.",
              "The search feature dynamically filters the book list in real-time, providing instant results as users type."
            ],
            listItems: [
              "Real-time search filtering",
              "Keyword-based book matching",
              "User-friendly input interface",
              "Seamless integration with book display"
            ],
            images: ["/P2_1pic.png"],
          },
        ],
      },
      {
        title: "Sorting Options",
        description: [
          {
            text: [
              "Users can organize the book list using multiple sorting criteria to suit their browsing preferences.",
              "Available sorting options include alphabetical order (A-Z or Z-A) and publication year (oldest to latest or latest to oldest)."
            ],
            listItems: [
              "Alphabetical sorting (A-Z and Z-A)",
              "Chronological sorting by publication year",
              "Instant reordering of book list",
              "Intuitive dropdown or button controls"
            ],
            images: ["/P2_2pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for efficient component-based architecture and dynamic user interactions.",
              "Utilizes Tailwind CSS for rapid development of a responsive and consistent user interface."
            ],
            listItems: [
              "React hooks for state and effect management",
              "Efficient data filtering and sorting algorithms",
              "Tailwind CSS for styling and responsiveness",
              "Clean, modular code structure"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Photo Feed",
    urlTitle: "photo-feed",
    img: ["/P11pic.png"],
    liveLink: "https://photo-feed-omega.vercel.app/",
    shortDescription:
      "A frontend React.js application built in July 2024 to showcase and interact with nature-related photos, offering a visually engaging and responsive user experience.",
    longDescription:
      "Photo Feed is a frontend React.js application developed in July 2024 to display a collection of nature-related photos. The site features a home route with a gallery of images and individual photo pages accessible via dynamic routes (/photo-id). Users can view enlarged photos, see uploader details, love and share counts, and save images. Styled with Tailwind CSS and powered by React, the app ensures a seamless and responsive experience across devices, highlighting skills in dynamic routing, state management, and UI/UX design.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/PhotoFeed",
    feaTures: [
      {
        title: "Home Route: Photo Gallery",
        description: [
          {
            text: [
              "The home route presents a visually appealing gallery of nature-related photos, designed to engage users with a clean and intuitive layout.",
              "Users can browse a curated collection of images, with each photo clickable to navigate to a dedicated photo page for more details."
            ],
            listItems: [
              "Responsive grid layout for photo thumbnails",
              "Smooth navigation to individual photo pages",
              "Optimized image loading for performance",
              "Consistent styling across devices"
            ],
            images: ["/P11pic.png"],
          },
        ],
      },
      {
        title: "Individual Photo Page",
        description: [
          {
            text: [
              "Accessible via dynamic routes (/photo-id), the individual photo page displays an enlarged version of the selected image for an immersive viewing experience.",
              "The page includes details such as the uploader’s name, love reaction count, share count, and an option to save the image to the user’s device."
            ],
            listItems: [
              "Dynamic routing for individual photo pages",
              "Display of uploader details and engagement metrics",
              "Interactive love and share functionalities",
              "Image download feature for user convenience"
            ],
            images: ["/P11_1pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for dynamic client-side rendering, ensuring efficient user interactions and fast performance.",
              "Utilizes Tailwind CSS for a responsive, visually consistent design, enhancing user engagement across mobile and desktop devices."
            ],
            listItems: [
              "React Router for scalable dynamic routing",
              "React hooks for efficient state management",
              "Tailwind CSS for rapid and consistent styling",
              "Optimized image handling for performance"
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "News Feed",
    urlTitle: "news-feed",
    img: ["/P4pic.png"],
    liveLink: "https://news-feed-swart-nine.vercel.app/",
    shortDescription:
      "A frontend React.js website built in June 2024 to display real-time news updates fetched from an external API, offering a clean and responsive user experience.",
    longDescription:
      "News Feed is a frontend React.js application developed in June 2024 to deliver real-time news updates. The site features a single home route that fetches news data from an external server via a React API call. Styled with Tailwind CSS, it provides a responsive and intuitive interface, displaying a 'Today's news is loading' message during data retrieval. The project showcases skills in API integration, React state management, and modern web development practices.",
    techStack: [
      ["React", "/React.png"],
      ["Tailwind CSS", "/TailwindCss.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/NewsFeed",
    feaTures: [
      {
        title: "Home Route: News Feed Display",
        description: [
          {
            text: [
              "The home route serves as the primary interface, fetching and displaying real-time news updates from an external API in a clean, organized layout.",
              "While news data is being retrieved, a user-friendly 'Today's news is loading' message is shown to enhance the user experience during loading states.",
            ],
            listItems: [
              "Real-time news updates fetched via React API calls",
              "Responsive grid layout for news articles",
              "Loading state with clear user feedback",
              "Optimized performance for fast data rendering",
            ],
            images: ["/P4pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with React.js for dynamic rendering and efficient client-side performance, ensuring a seamless user experience.",
              "Utilizes Tailwind CSS for a responsive and visually appealing design, maintaining consistency across mobile and desktop devices.",
            ],
            listItems: [
              "Efficient API integration with error handling",
              "React hooks for state and lifecycle management",
              "Tailwind CSS for rapid and consistent styling",
              "Clean and maintainable code structure",
            ],
            images: [],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "Short React Projects",
    urlTitle: "short-react-projects",
    img: ["/P1pic.png"],
    liveLink: "https://react-projects-ruddy-seven.vercel.app",
    shortDescription:
      "A frontend React.js portfolio showcasing a collection of small-scale React projects, built in June 2024 for personal development and demonstration.",
    longDescription:
      "Short React Projects is a frontend React.js website developed to showcase a collection of five small-scale React projects. Built in June 2024, the site features a clean, responsive design with a gallery-style layout, detailed project descriptions, and navigation routes for each project. Styled with modular CSS (folder.module.css format), it offers an engaging user experience across devices, highlighting skills in React development, state management, and UI/UX design.",
    techStack: [
      ["React", "/React.png"],
      ["CSS", "/css.png"],
      ["JavaScript", "/js.png"],
    ],
    gitLink: "https://github.com/Lawrence-Amlan-Gomes/ReactProjects",
    feaTures: [
      {
        title: "Home Route",
        description: [
          {
            text: [
              "The home route serves as the welcoming entry point to the portfolio, featuring a clean and minimalistic design that immediately engages visitors.",
              "Displays the main title 'Welcome to My React JS Projects' with a professional layout that sets the tone for the entire portfolio experience.",
            ],
            listItems: [
              "Clean, minimalistic design for professional first impression",
              "Responsive layout that works seamlessly across all devices",
              "Immediate navigation access to all project routes",
              "Consistent branding and styling throughout the application",
            ],
            images: ["/P1pic.png"],
          },
        ],
      },
      {
        title: "Project One: Theme Changer",
        description: [
          {
            text: [
              "A dynamic theme-switching component that demonstrates React's state management capabilities and provides users with customizable visual preferences.",
              "The interface displays 'Theme' as the main heading, followed by 'Dark/Light' toggle text and corresponding Sun/Moon icons for intuitive user interaction.",
            ],
            listItems: [
              "Smooth theme transitions between dark and light modes",
              "Intuitive UI with clear visual indicators (Sun/Moon icons)",
              "Dynamic background color changes (bg-black or bg-white)",
              "Persistent theme state management using React hooks",
            ],
            images: ["/P1_1pic.png"],
          },
        ],
      },
      {
        title: "Project Two: Tic-Tac-Toe Game",
        description: [
          {
            text: [
              "A fully functional Tic-Tac-Toe game implementation that showcases game logic, state management, and user interaction patterns in React.",
              "Players alternate between 'X' and 'O' symbols, with the game automatically detecting and displaying the winner upon completion of a valid winning pattern.",
            ],
            listItems: [
              "Complete game logic with win condition detection",
              "Turn-based gameplay with visual feedback for current player",
              "Winner announcement with clear visual indication",
              "Restart functionality available at any point during gameplay",
            ],
            images: ["/P1_2pic.png"],
          },
        ],
      },
      {
        title: "Project Three: Stopwatch Application",
        description: [
          {
            text: [
              "A simple yet elegant stopwatch application that demonstrates timer functionality, state persistence, and user control patterns in React applications.",
              "Users can start, pause, and reset the stopwatch, with the reset functionality returning the timer to its initial 00:00:00 state for fresh timing sessions.",
            ],
            listItems: [
              "Precise time tracking with millisecond accuracy",
              "Intuitive start/pause controls with clear visual states",
              "Reset functionality that returns to initial state",
              "Clean, readable time display format",
              "Responsive design for touch and click interactions",
            ],
            images: ["/P1_3pic.png"],
          },
        ],
      },
      {
        title: "Project Four: Todo List Manager",
        description: [
          {
            text: [
              "A task management application that implements basic CRUD (Create, Read, Update, Delete) operations, demonstrating practical data manipulation in React.",
              "Users can add new tasks to the list and remove completed tasks, providing a simple yet effective task organization system for personal productivity.",
            ],
            listItems: [
              "Add new tasks with instant list updates",
              "Delete functionality for task removal",
              "Persistent task state management",
              "Clean, organized list presentation",
              "Responsive input and interaction design",
            ],
            images: ["/P1_4pic.png"],
          },
        ],
      },
      {
        title: "Technical Implementation",
        description: [
          {
            text: [
              "Built with modern React.js architecture, ensuring efficient client-side rendering and dynamic user interactions.",
              "Utilizes modular CSS (folder.module.css) for scoped, maintainable, and responsive styling across all components.",
            ],
            listItems: [
              "Modern React hooks for efficient state management",
              "React Router for seamless navigation between projects",
              "Modular CSS for scoped and maintainable styling",
              "Optimized image handling for performance",
              "Professional code structure and documentation",
            ],
            images: [],
          },
        ],
      },
    ],
  },
];

export default projects;
