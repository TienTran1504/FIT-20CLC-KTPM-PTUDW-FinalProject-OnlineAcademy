import CourseCategory from "../models/coursecategory.model";
import Course from "../models/course.model";
import User from "../models/user.model";
import Feedback from "../models/feedback.model";

// const CatList = [
//   {
//     _id: 1,
//     name: "Web",
//     languageList: [
//       { _id: 1, name: "ReactJS", courseList: [1, 1, 1, 1, 1, 1] },
//       { _id: 2, name: "AngularJS", courseList: [1, 1] },
//       { _id: 3, name: "VueJS", courseList: [] },
//     ],
//   },
//   {
//     _id: 2,
//     name: "Mobile",
//     languageList: [
//       { _id: 1, name: "React Native", courseList: [1, 1, 1, 1] },
//       { _id: 2, name: "Flutter", courseList: [] },
//       { _id: 3, name: "Kotlin", courseList: [] },
//     ],
//   },
// ];

// const LangList = [
//   {
//     _id: 1,
//     name: "ReactJS",
//     courseList: [1, 1, 1, 1, 1, 1],
//   },
//   {
//     _id: 2,
//     name: "AngularJS",
//     courseList: [1, 1],
//   },
//   {
//     _id: 3,
//     name: "VueJS",
//     courseList: [],
//   },
//   {
//     _id: 4,
//     name: "React Native",
//     courseList: [1, 1, 1, 1],
//   },
//   {
//     _id: 5,
//     name: "Flutter",
//     courseList: [],
//   },
//   {
//     _id: 6,
//     name: "Kotlin",
//     courseList: [],
//   },
// ];

// const CourseList = [
//   {
//     CourseID: 1,
//     name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//     briefDescription:
//       "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
//     createdBy: "Hau Nguyen",
//     ratingList: [5, 5, 4, 3, 5, 1, 2, 1],
//     categoryName: "Web",
//     languageName: "ReactJS",
//     price: 549000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 2,
//     name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//     briefDescription:
//       "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
//     createdBy: "Hau Nguyen",
//     ratingList: [5, 5, 4, 3, 5],
//     categoryName: "Web",
//     languageName: "ReactJS",
//     price: 349000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-12-28"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 3,
//     name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//     briefDescription:
//       "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
//     createdBy: "Hau Nguyen",
//     ratingList: [5, 5, 4, 5, 5, 5, 5],
//     categoryName: "Web",
//     languageName: "ReactJS",
//     price: 229000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1],
//   },
//   {
//     CourseID: 4,
//     name: "React Native - The Practical Guide [2023]",
//     briefDescription:
//       "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 3, 5],
//     categoryName: "Mobile",
//     languageName: "React Native",
//     price: 600000,
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 5,
//     name: "React Native - The Practical Guide [2023]",
//     briefDescription:
//       "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 3, 5],
//     categoryName: "Mobile",
//     languageName: "React Native",
//     price: 800000,
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 6,
//     name: "Angular - The Complete Guide (2023 Edition)",
//     briefDescription:
//       "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 3, 5, 5],
//     categoryName: "Web",
//     languageName: "AngularJS",
//     price: 700000,
//     image: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 7,
//     name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//     briefDescription:
//       "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
//     createdBy: "Hau Nguyen",
//     ratingList: [5, 5, 4, 3, 5, 1, 2, 1],
//     categoryName: "Web",
//     languageName: "ReactJS",
//     price: 519000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1],
//   },
//   {
//     CourseID: 8,
//     name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//     briefDescription:
//       "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
//     createdBy: "Hau Nguyen",
//     ratingList: [5, 5, 4, 3, 5],
//     categoryName: "Web",
//     languageName: "ReactJS",
//     price: 149000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-12-28"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 9,
//     name: "React - The Complete Guide (incl Hooks, React Router, Redux)",
//     briefDescription:
//       "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     categoryName: "Web",
//     languageName: "ReactJS",
//     price: 349000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 10,
//     name: "React Native - The Practical Guide [2023]",
//     briefDescription:
//       "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 3, 5],
//     categoryName: "Mobile",
//     languageName: "React Native",
//     price: 650000,
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     createdAt: new Date("2022-03-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 11,
//     name: "React Native - The Practical Guide [2023]",
//     briefDescription:
//       "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 5, 5, 5],
//     categoryName: "Mobile",
//     languageName: "React Native",
//     price: 620000,
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     createdAt: new Date("2022-12-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 12,
//     name: "Angular - The Complete Guide (2023 Edition)",
//     briefDescription:
//       "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 5, 5, 5, 5],
//     categoryName: "Web",
//     languageName: "AngularJS",
//     price: 520000,
//     image: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
//     createdAt: new Date("2022-12-27"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
// ];

// const feedback = [
//   {
//     content: "...",
//     numberRated: 5,
//     createdIn: "63b19ad71aa34d2d78b7232a",
//     createdBy: "639e89638b6a384e84c4fae7",
//   },
//   {
//     content: "...",
//     numberRated: 4,
//     createdIn: "63b19ad71aa34d2d78b7232a",
//     createdBy: "639e89638b6a384e84c4fae7",
//   },
//   {
//     content: "...",
//     numberRated: 2,
//     createdIn: "63b19ad71aa34d2d78b7232a",
//     createdBy: "639e89638b6a384e84c4fae7",
//   },
// ];

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

function formatDate2(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function dateDiffInDays(a, b) {
  return ((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0);
}

const search = async (req, res) => {
  const key = req.query.key || "";
  const page = req.query.page || 1;
  const sort = req.query.sort || "";

  const CatList = await CourseCategory.find().lean();
  const CourseList = await Course.find().lean();
  var courses = await Course.find({ $text: { $search: key } }).lean();
  const users = await User.find().lean();
  const feedback = await Feedback.find().lean();

  var tmp = [...CourseList];
  var bestSellerCourse = tmp
    .sort(function (a, b) {
      return b.studentList.length - a.studentList.length;
    })
    .slice(0, 5);

  // var courses = [];
  // CourseList.forEach((course) => {
  //   if (
  //     course.name.toLowerCase().includes(key.toLowerCase()) ||
  //     course.languageName.toLowerCase().includes(key.toLowerCase()) ||
  //     course.categoryName.toLowerCase().includes(key.toLowerCase())
  //   ) {
  //     courses.push(course);
  //   }
  // });

  courses = courses.map((course) => {
    var feedbackList = feedback.filter((u) => u.createdIn.toString() == course._id.toString());
    var CourseRatingVote = feedbackList.length;
    var CourseRatingPoint = +(feedbackList.reduce((a, b) => a + b.numberRated, 0) / CourseRatingVote).toFixed(1) || 0;
    var user = users.find((u) => u._id == course.createdBy.toString());

    return {
      ...course,
      CourseRatingVote: CourseRatingVote,
      CourseRatingPoint: CourseRatingPoint,
      createdBy: user.firstName + " " + user.lastName,
    };
  });

  if (sort === "highest-rated")
    courses.sort(function (a, b) {
      return b.CourseRatingPoint - a.CourseRatingPoint || b.CourseRatingVote - a.CourseRatingVote;
    });
  else if (sort === "lowest-price")
    courses.sort(function (a, b) {
      return a.price - b.price;
    });

  const curPage = parseInt(page) || 1;
  const limit = 6;
  const offset = (curPage - 1) * limit;

  const total = courses.length;
  const nPages = Math.ceil(total / limit);
  const pageLimit = 5;

  const pageNumbers = [];
  if (curPage < pageLimit - 1)
    for (let i = 1; i <= nPages && i <= pageLimit; i++) {
      pageNumbers.push({
        value: i,
        isCurrentPage: i === +curPage,
      });
    }
  else if (curPage <= nPages - parseInt(pageLimit / 2))
    for (let i = curPage - parseInt(pageLimit / 2); i <= nPages && i <= curPage + parseInt(pageLimit / 2); i++) {
      pageNumbers.push({
        value: i,
        isCurrentPage: i === +curPage,
      });
    }
  else
    for (let i = nPages - (pageLimit - 1); i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrentPage: i === +curPage,
      });
    }

  var currentPageURL = "?key=" + key + "&sort=" + sort + "&page=";
  var currentURL = "?key=" + key;

  res.render("vwCategories/index", {
    CatList: CatList.map((cat) => {
      return {
        ...cat,
        languageList: cat.languageList.map((lang) => {
          return {
            ...lang,
            courseQuantity: numberWithCommas(
              CourseList.filter((u) => u.languageName == lang.name && u.categoryName == cat.name).length
            ),
          };
        }),
      };
    }),
    courses: courses
      .map((course) => {
        return {
          ...course,
          fullStar: fullStar(course.CourseRatingPoint),
          halfStar: halfStar(course.CourseRatingPoint),
          blankStar: blankStar(course.CourseRatingPoint),
          price: numberWithCommas(course.price),
          CourseViews: numberWithCommas(course.viewList.length),
          students: numberWithCommas(course.studentList.length),
          createdAt: formatDate(course.createdAt),
          bestSeller: bestSellerCourse.includes(course) ? true : false,
          new: dateDiffInDays(new Date(formatDate2(course.createdAt)), new Date()) <= 7 ? true : false,
        };
      })
      .slice(offset, offset + limit),
    havePagination: courses.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: curPage === 1 ? true : false,
    lastPage: curPage === nPages ? true : false,
    prevPage: "search?key=" + key + "&sort=" + sort + "&page=" + Number(curPage - 1),
    nextPage: "search?key=" + key + "&sort=" + sort + "&page=" + Number(curPage + 1),
    noData: courses.length === 0 || curPage > nPages ? true : false,
    results: numberWithCommas(courses.length),
    key: key,
    currentURL: currentURL,
    currentPageURL: currentPageURL,
    hasSort: sort === "highest-rated" || sort === "lowest-price" ? true : false,
    sort: sort === "highest-rated" ? "Highest Rated" : "Lowest Price",
  });
};

const getCategory = async (req, res) => {
  const category = req.query.category || "";
  const language = req.query.language || "";
  const page = req.query.page || 1;
  const sort = req.query.sort || "";

  const CatList = await CourseCategory.find().lean();
  const CourseList = await Course.find().lean();
  const users = await User.find().lean();
  const feedback = await Feedback.find().lean();

  var tmp = [...CourseList];
  var bestSellerCourse = tmp
    .sort(function (a, b) {
      return b.studentList.length - a.studentList.length;
    })
    .slice(0, 5);

  var courses = [];

  if (!category && !language) courses = [...CourseList];
  else if (!language)
    CourseList.forEach((course) => {
      if (course.categoryName === category) {
        courses.push(course);
      }
    });
  else if (!category)
    CourseList.forEach((course) => {
      if (course.languageName === language) {
        courses.push(course);
      }
    });
  else
    CourseList.forEach((course) => {
      if (course.categoryName === category && course.languageName === language) {
        courses.push(course);
      }
    });

  courses = courses.map((course) => {
    var feedbackList = feedback.filter((u) => u.createdIn.toString() == course._id.toString());
    var CourseRatingVote = feedbackList.length;
    var CourseRatingPoint = +(feedbackList.reduce((a, b) => a + b.numberRated, 0) / CourseRatingVote).toFixed(1) || 0;
    var user = users.find((u) => u._id == course.createdBy.toString());

    return {
      ...course,
      CourseRatingVote: CourseRatingVote,
      CourseRatingPoint: CourseRatingPoint,
      createdBy: user.firstName + " " + user.lastName,
    };
  });

  if (sort === "highest-rated")
    courses.sort(function (a, b) {
      return b.CourseRatingPoint - a.CourseRatingPoint || b.CourseRatingVote - a.CourseRatingVote;
    });
  else if (sort === "lowest-price")
    courses.sort(function (a, b) {
      return a.price - b.price;
    });

  const curPage = parseInt(page) || 1;
  const limit = 6;
  const offset = (curPage - 1) * limit;

  const total = courses.length;
  const nPages = Math.ceil(total / limit);
  const pageLimit = 5;

  const pageNumbers = [];
  if (curPage < pageLimit - 1)
    for (let i = 1; i <= nPages && i <= pageLimit; i++) {
      pageNumbers.push({
        value: i,
        isCurrentPage: i === +curPage,
      });
    }
  else if (curPage <= nPages - parseInt(pageLimit / 2))
    for (let i = curPage - parseInt(pageLimit / 2); i <= nPages && i <= curPage + parseInt(pageLimit / 2); i++) {
      pageNumbers.push({
        value: i,
        isCurrentPage: i === +curPage,
      });
    }
  else
    for (let i = nPages - (pageLimit - 1); i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrentPage: i === +curPage,
      });
    }

  var currentPageURL = "categories?category=" + category + "&language=" + language + "&sort=" + sort + "&page=";
  var currentURL = "categories?category=" + category + "&language=" + language;

  res.render("vwCategories/index", {
    CatList: CatList.map((cat) => {
      return {
        ...cat,
        isActive: cat.name === category && language === "" ? true : false,
        languageList: cat.languageList.map((lang) => {
          return {
            ...lang,
            courseQuantity: numberWithCommas(
              CourseList.filter((u) => u.languageName == lang.name && u.categoryName == cat.name).length
            ),
            isActive: lang.name === language && cat.name === category ? true : false,
          };
        }),
      };
    }),
    category: category,
    language: language,
    courses: courses
      .map((course) => {
        return {
          ...course,
          fullStar: fullStar(course.CourseRatingPoint),
          halfStar: halfStar(course.CourseRatingPoint),
          blankStar: blankStar(course.CourseRatingPoint),
          price: numberWithCommas(course.price),
          CourseViews: numberWithCommas(course.viewList.length),
          students: numberWithCommas(course.studentList.length),
          createdAt: formatDate(course.createdAt),
          bestSeller: bestSellerCourse.includes(course) ? true : false,
          new: dateDiffInDays(new Date(formatDate2(course.createdAt)), new Date()) <= 7 ? true : false,
        };
      })
      .slice(offset, offset + limit),
    havePagination: courses.length > limit ? true : false,
    pageNumbers: pageNumbers,
    firstPage: curPage === 1 ? true : false,
    lastPage: curPage === nPages ? true : false,
    prevPage: currentPageURL + Number(curPage - 1),
    nextPage: currentPageURL + Number(curPage + 1),
    currentPageURL: currentPageURL,
    noData: courses.length === 0 || curPage > nPages ? true : false,
    currentURL: currentURL,
    hasSort: sort === "highest-rated" || sort === "lowest-price" ? true : false,
    sort: sort === "highest-rated" ? "Highest Rated" : "Lowest Price",
  });
};

export { getCategory, search };
