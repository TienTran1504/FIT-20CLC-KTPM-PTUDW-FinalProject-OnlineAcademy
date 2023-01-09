import CourseCategory from "../models/coursecategory.model";
import CourseLanguage from "../models/courselanguage.model";
import Course from "../models/course.model";
import User from "../models/user.model";
import Feedback from "../models/feedback.model";

const SliderList = [
  {
    SliderImage: "../../../public/assets/images/slider1.jpg",
  },
  {
    SliderImage: "../../../public/assets/images/slider2.jpg",
  },
  {
    SliderImage: "../../../public/assets/images/slider3.jpg",
  },
  {
    SliderImage: "../../../public/assets/images/slider4.jpg",
  },
  {
    SliderImage: "../../../public/assets/images/slider5.jpg",
  },
];

// const LanguageList = [
//   {
//     name: "ReactJS",
//     image: "https://codelearn.io/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg",
//     courseList: [
//       {
//         studentList: [
//           { id: 1, createdAt: new Date("2022-03-25") },
//           { id: 2, createdAt: new Date("2022-12-29") },
//         ],
//       },
//       { studentList: [{ id: 1, createdAt: new Date("2022-12-29") }] },
//     ],
//   },
//   {
//     name: "AngularJS",
//     image: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
//     courseList: [{ studentList: [{ id: 1, createdAt: new Date("2022-12-29") }] }],
//   },
//   {
//     name: "VueJS",
//     image: "https://segwitz.com/wp-content/uploads/2021/06/vuejs-development-malaysia.jpeg",
//     courseList: [],
//   },
//   {
//     name: "React Native",
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     courseList: [
//       { studentList: [{ id: 1, createdAt: new Date("2022-12-30") }] },
//       {
//         studentList: [
//           { id: 1, createdAt: new Date("2022-12-29") },
//           { id: 2, createdAt: new Date("2022-12-29") },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Flutter",
//     image:
//       "https://dailysmarty-production.s3.amazonaws.com/uploads/post/img/7974/flutter-use-cases-mobile-app-development.jpeg",
//     courseList: [],
//   },
//   {
//     name: "Kotlin",
//     image: "https://images.viblo.asia/2185d41e-6e40-42ba-8464-201b818bee58.png",
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
//     createdAt: new Date("2022-05-21"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1],
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
//     price: 549000,
//     image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//     createdAt: new Date("2022-08-19"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1],
//   },
//   {
//     CourseID: 3,
//     name: "React Native - The Practical Guide [2023]",
//     briefDescription:
//       "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 3, 5],
//     categoryName: "Mobile",
//     languageName: "React Native",
//     price: 600000,
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     createdAt: new Date("2021-04-01"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 4,
//     name: "React Native - The Practical Guide [2023]",
//     briefDescription:
//       "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 2, 5],
//     categoryName: "Mobile",
//     languageName: "React Native",
//     price: 600000,
//     image: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
//     createdAt: new Date("2022-12-26"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
//   {
//     CourseID: 5,
//     name: "Angular - The Complete Guide (2023 Edition)",
//     briefDescription:
//       "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
//     createdBy: "Phuoc Dinh",
//     ratingList: [5, 5, 4, 5, 5, 5],
//     categoryName: "Web",
//     languageName: "AngularJS",
//     price: 500000,
//     image: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
//     createdAt: new Date("2022-12-25"),
//     viewList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     studentList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   },
// ];

// const feedback = [
//   {
//     content: "...",
//     numberRated: 5,
//     createdIn: "63b327fd2ee7895fa81c82ac",
//     createdBy: "639e89638b6a384e84c4fae7",
//   },
//   {
//     content: "...",
//     numberRated: 4,
//     createdIn: "63b327fd2ee7895fa81c82ac",
//     createdBy: "639e89638b6a384e84c4fae7",
//   },
//   {
//     content: "...",
//     numberRated: 2,
//     createdIn: "63b327fd2ee7895fa81c82ac",
//     createdBy: "639e89638b6a384e84c4fae7",
//   },
// ];

function fullStar(ratingPoint) {
  var fullStar = [];
  var stars = ratingPoint - parseInt(ratingPoint) >= 0.75 ? parseInt(ratingPoint) + 1 : parseInt(ratingPoint);
  var stars = ratingPoint - parseInt(ratingPoint) >= 0.75 ? parseInt(ratingPoint) + 1 : parseInt(ratingPoint);
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

const renderHome = async (req, res) => {
  const CatList = await CourseCategory.find().lean();
  const LanguageList = await CourseLanguage.find().lean();
  var CourseList = await Course.find({ disable: "False", status: "completed" }).lean();
  const users = await User.find().lean();
  const feedback = await Feedback.find().lean();

  req.session.CatList = CatList;

  CourseList = CourseList.map((course) => {
    var feedbackList = feedback.filter((u) => u.createdIn.toString() == course._id.toString());
    var CourseRatingVote = feedbackList.length;
    var CourseRatingPoint = +(feedbackList.reduce((a, b) => a + b.numberRated, 0) / CourseRatingVote).toFixed(1) || 0;
    var user = users.find((u) => u._id == course.createdBy.toString());

    var feedbackListInWeek = feedbackList.filter(
      (u) => dateDiffInDays(new Date(formatDate2(u.createdAt)), new Date()) <= 7
    );
    var CourseRatingVoteInWeek = feedbackListInWeek.length;
    var CourseRatingPointInWeek =
      +(feedbackListInWeek.reduce((a, b) => a + b.numberRated, 0) / CourseRatingVoteInWeek).toFixed(1) || 0;

    return {
      ...course,
      CourseRatingVote: CourseRatingVote,
      CourseRatingPoint: CourseRatingPoint,
      createdBy: user.firstName + " " + user.lastName,
      viewInWeek: course.viewList.filter(
        (view) => dateDiffInDays(new Date(formatDate2(view.createdAt)), new Date()) <= 7
      ).length,
      CourseRatingVoteInWeek: CourseRatingVoteInWeek,
      CourseRatingPointInWeek: CourseRatingPointInWeek,
    };
  });

  var sortedLangList = [];
  sortedLangList = LanguageList.map((lang) => {
    var sumOfStudents = 0;
    lang.courseList.forEach((course) => {
      sumOfStudents += CourseList.find((u) => u._id.toString() == course._id.toString()).studentList.filter(
        (student) => dateDiffInDays(new Date(student.time), new Date()) <= 7
      ).length;
    });

    return {
      ...lang,
      numOfStudents: numberWithCommas(sumOfStudents),
    };
  });

  sortedLangList.sort((a, b) => {
    return b.numOfStudents - a.numOfStudents;
  });

  const bestSellerCourse = [
    ...CourseList.sort(function (a, b) {
      return b.studentList.length - a.studentList.length;
    }).slice(0, 5),
  ];

  const mostViewedCourses = [
    ...CourseList.sort(function (a, b) {
      return b.viewList.length - a.viewList.length;
    }),
  ];

  const mostView = mostViewedCourses[0].viewList.length;
  const featuredCourses = [
    ...CourseList.sort(function (a, b) {
      return (
        b.viewInWeek / mostView +
        b.CourseRatingPointInWeek / 5 +
        b.CourseRatingVoteInWeek / mostView -
        (a.viewInWeek / mostView + a.CourseRatingPointInWeek / 5 + a.CourseRatingVoteInWeek / mostView)
      );
    }).slice(0, 5),
  ];

  const latestCourses = [
    ...CourseList.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    }),
  ];

  res.render("home", {
    SliderList: SliderList,
    CatList: CatList,
    LanguageList: sortedLangList.slice(0, 5),
    featuredCourses: featuredCourses
      .map((course) => {
        return {
          ...course,
          fullStar: fullStar(course.CourseRatingPoint),
          halfStar: halfStar(course.CourseRatingPoint),
          blankStar: blankStar(course.CourseRatingPoint),
          price: numberWithCommas(course.price),
          createdAt: formatDate(course.createdAt),
          CourseViews: numberWithCommas(course.viewList.length),
          Students: numberWithCommas(course.studentList.length),
          bestSeller: bestSellerCourse.includes(course) ? true : false,
          new: dateDiffInDays(new Date(formatDate2(course.createdAt)), new Date()) <= 3 ? true : false,
        };
      })
      .slice(0, 5),
    mostViewedCourses: mostViewedCourses
      .map((course) => {
        return {
          ...course,
          fullStar: fullStar(course.CourseRatingPoint),
          halfStar: halfStar(course.CourseRatingPoint),
          blankStar: blankStar(course.CourseRatingPoint),
          price: numberWithCommas(course.price),
          createdAt: formatDate(course.createdAt),
          CourseViews: numberWithCommas(course.viewList.length),
          Students: numberWithCommas(course.studentList.length),
          bestSeller: bestSellerCourse.includes(course) ? true : false,
          new: dateDiffInDays(new Date(formatDate2(course.createdAt)), new Date()) <= 3 ? true : false,
        };
      })
      .slice(0, 10),
    latestCourses: latestCourses
      .map((course) => {
        return {
          ...course,
          fullStar: fullStar(course.CourseRatingPoint),
          halfStar: halfStar(course.CourseRatingPoint),
          blankStar: blankStar(course.CourseRatingPoint),
          price: numberWithCommas(course.price),
          createdAt: formatDate(course.createdAt),
          CourseViews: numberWithCommas(course.viewList.length),
          Students: numberWithCommas(course.studentList.length),
          bestSeller: bestSellerCourse.includes(course) ? true : false,
          new: dateDiffInDays(new Date(formatDate2(course.createdAt)), new Date()) <= 3 ? true : false,
        };
      })
      .slice(0, 10),
  });
};

export { renderHome, formatDate, fullStar, halfStar, blankStar };
