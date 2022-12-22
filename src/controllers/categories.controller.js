const CatList = [
  {
    CatID: 1,
    CatName: "Web",
    LanguegeList: [
      { LanguegeID: 1, LanguegeName: "ReactJS" },
      { LanguegeID: 2, LanguegeName: "AngularJS" },
      { LanguegeID: 3, LanguegeName: "VueJS" },
    ],
  },
  {
    CatID: 2,
    CatName: "Mobile",
    LanguegeList: [
      { LanguegeID: 1, LanguegeName: "React Native" },
      { LanguegeID: 2, LanguegeName: "Flutter" },
      { LanguegeID: 3, LanguegeName: "Kotlin" },
    ],
  },
];

const CourseList = [
  {
    CourseID: 1,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRatingPoint: 4.2,
    CourseRatingVote: 621,
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
  {
    CourseID: 2,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRatingPoint: 4.2,
    CourseRatingVote: 621,
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
  {
    CourseID: 3,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRatingPoint: 4.2,
    CourseRatingVote: 621,
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
];

const renderCategories = async (req, res) => {
  res.render("vwCategories/index", {
    style: "categories.css",
    CatList: CatList,
  });
};

const getCategory = async (req, res) => {
  const {
    params: { category: category, language: language },
  } = req;

  var courses = [];
  CourseList.forEach((course) => {
    if (course.CourseCategory === category && course.CourseLanguage === language) {
      courses.push(course);
    }
  });

  res.render("vwCategories/index", {
    style: "categories.css",
    CatList: CatList,
    category: category,
    language: language,
    courses: courses,
  });
};

export { renderCategories, getCategory };
