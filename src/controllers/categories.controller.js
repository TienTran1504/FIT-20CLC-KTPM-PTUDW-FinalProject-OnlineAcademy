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
    CourseRatingPoint: 4.3,
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
    CourseRatingPoint: 4.9,
    CourseRatingVote: 621,
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
  {
    CourseID: 4,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRatingPoint: 4.8,
    CourseRatingVote: 1080,
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
  },
  {
    CourseID: 5,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRatingPoint: 4.8,
    CourseRatingVote: 1080,
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
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
    params: { category: category, language: language, page: page },
  } = req;

  var courses = [];
  CourseList.forEach((course) => {
    if (course.CourseCategory === category && course.CourseLanguage === language) {
      courses.push(course);
    }
  });
  const curPage = parseInt(page) || 1;
  const limit = 6;
  const offset = (curPage - 1) * limit;

  const total = courses.length;
  const nPages = Math.ceil(total / limit);

  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === +curPage,
    });
  }

  function fullStar(ratingPoint) {
    var fullStar = [];
    var stars = ratingPoint - ratingPoint.toFixed(0) >= 0.75 ? ratingPoint + 1 : ratingPoint.toFixed(0);
    for (let i = 0; i < stars; i++) {
      fullStar.push(stars);
    }
    return fullStar;
  }

  function halfStar(ratingPoint) {
    var halfStar = [];
    var stars = ratingPoint - ratingPoint.toFixed(0) >= 0.25 ? 1 : 0;
    for (let i = 0; i < stars; i++) {
      halfStar.push(stars);
    }
    return halfStar;
  }

  function blankStar(ratingPoint) {
    var blankStar = [];
    var stars = 5 - fullStar(ratingPoint).length - halfStar(ratingPoint).length;
    for (let i = 0; i < stars; i++) {
      blankStar.push(stars);
    }
    return blankStar;
  }

  res.render("vwCategories/index", {
    style: "categories.css",
    CatList: CatList,
    category: category,
    language: language,
    courses: courses
      .map((course) => {
        return {
          ...course,
          fullStar: fullStar(course.CourseRatingPoint),
          halfStar: halfStar(course.CourseRatingPoint),
          blankStar: blankStar(course.CourseRatingPoint),
        };
      })
      .slice(offset, offset + limit),
    havePagination: courses.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: curPage === 1 ? true : false,
    lastPage: curPage === total ? true : false,
    prevPage: curPage - 1,
    nextPage: curPage + 1,
  });
};

export { renderCategories, getCategory };
