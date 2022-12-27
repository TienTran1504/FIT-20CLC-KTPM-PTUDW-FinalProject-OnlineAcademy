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
    CourseRating: [5, 5, 4, 3, 5, 1, 2, 1],
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    CourseViews: 123,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 2,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRating: [5, 5, 4, 3, 5],
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    CourseViews: 123,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 3,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRating: [5, 5, 4, 5, 5, 5, 5],
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    CourseViews: 123,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 4,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 3, 5],
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
    CourseViews: 34656,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 5,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 3, 5],
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
    CourseViews: 34656,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 6,
    CourseName: "Angular - The Complete Guide (2023 Edition)",
    CourseDescription:
      "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 3, 5, 5],
    CourseCategory: "Web",
    CourseLanguage: "AngularJS",
    CoursePrice: 500000,
    CourseImage: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
    CourseViews: 67887,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 7,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRating: [5, 5, 4, 3, 5, 1, 2, 1],
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    CourseViews: 123,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 8,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRating: [5, 5, 4, 3, 5],
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    CourseViews: 123,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 9,
    CourseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    CourseDescription:
      "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    CourseAuthor: "Hau Nguyen",
    CourseRating: [5, 5, 4, 5, 5, 5, 5],
    CourseCategory: "Web",
    CourseLanguage: "ReactJS",
    CoursePrice: 549000,
    CourseImage: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
    CourseViews: 123,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 10,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 3, 5],
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
    CourseViews: 34656,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 11,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 3, 5],
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
    CourseViews: 34656,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 12,
    CourseName: "Angular - The Complete Guide (2023 Edition)",
    CourseDescription:
      "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 3, 5, 5],
    CourseCategory: "Web",
    CourseLanguage: "AngularJS",
    CoursePrice: 500000,
    CourseImage: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
    CourseViews: 67887,
    PostingDate: Date("2022-03-25"),
  },
];

function fullStar(ratingPoint) {
  var fullStar = [];
  var stars = ratingPoint - parseInt(ratingPoint) >= 0.75 ? parseInt(ratingPoint) + 1 : parseInt(ratingPoint);
  console.log(stars);
  for (let i = 0; i < stars; i++) {
    fullStar.push(stars);
  }
  return fullStar;
}

function halfStar(ratingPoint) {
  var halfStar = [];
  var diff = ratingPoint - parseInt(ratingPoint);
  var stars = diff >= 0.25 && diff < 0.75 ? 1 : 0;
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

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}

const search = async (req, res) => {
  const name = req.query.name || "";
  const page = req.query.page || 1;

  var courses = [];
  CourseList.forEach((course) => {
    if (course.CourseName.includes(name)) {
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
      isCurrentPage: i === +curPage,
    });
  }

  res.render("vwCategories/index", {
    style: "categories.css",
    CatList: CatList,
    courses: courses,
    havePagination: courses.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: curPage === 1 ? true : false,
    lastPage: curPage === nPages ? true : false,
    prevPage: curPage - 1,
    nextPage: curPage + 1,
    noData: courses.length === 0 || curPage > nPages ? true : false,
  });
};

const getCategory = async (req, res) => {
  // const {
  //   params: { category: category, language: language, page: page },
  // } = req;

  const name = req.query.name || "";
  const category = req.query.category || "";
  const language = req.query.language || "";
  const page = req.query.page || 1;

  var courses = [];
  if (!category) courses = CourseList;
  else if (!language)
    CourseList.forEach((course) => {
      if (course.CourseCategory === category) {
        courses.push(course);
      }
    });
  else
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
      isCurrentPage: i === +curPage,
    });
  }

  var currentPageURL = "categories?category=" + category + "&language=" + language + "&page=";

  res.render("vwCategories/index", {
    style: "categories.css",
    CatList: CatList,
    category: category,
    language: language,
    courses: courses
      .map((course) => {
        var CourseRatingVote = course.CourseRating.length;
        var CourseRatingPoint = course.CourseRating.reduce((a, b) => a + b, 0) / course.CourseRating.length;

        return {
          ...course,
          CourseRatingVote: CourseRatingVote,
          CourseRatingPoint: CourseRatingPoint.toFixed(1),
          fullStar: fullStar(CourseRatingPoint),
          halfStar: halfStar(CourseRatingPoint),
          blankStar: blankStar(CourseRatingPoint),
          CoursePrice: numberWithCommas(course.CoursePrice),
          CourseViews: numberWithCommas(course.CourseViews),
          PostingDate: formatDate(course.PostingDate),
        };
      })
      .slice(offset, offset + limit),
    havePagination: courses.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: curPage === 1 ? true : false,
    lastPage: curPage === nPages ? true : false,
    prevPage: currentPageURL + Number(curPage - 1),
    nextPage: currentPageURL + Number(curPage + 1),
    noData: courses.length === 0 || curPage > nPages ? true : false,
  });
};

export { getCategory, search };
