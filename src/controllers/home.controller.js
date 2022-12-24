const SliderList = [
  {
    SliderImage: "https://www.inductionhouse.com.au/Online%20Learning%20Slider%202.jpg",
  },
  {
    SliderImage: "http://logoman.ca/wp-content/uploads/2018/01/Slider-Banner-Programming-Image-.jpg",
  },
  {
    SliderImage: "https://www.wonderplugin.com/wp-content/uploads/2019/05/tutorial-computer-900x288.jpg",
  },
];

const CatList = [
  {
    CatID: 1,
    CatName: "Web",
    LanguegeList: [
      { LanguegeID: 1, LanguegeName: "ReactJS" },
      { LanguegeID: 2, LanguegeName: "AngularJS" },
      { LanguegeID: 3, LanguegeName: "VueJS" },
    ],
    CatImage: "https://www.codeimmersives.com/wp-content/uploads/2021/04/term1.png",
  },
  {
    CatID: 2,
    CatName: "Mobile",
    LanguegeList: [
      { LanguegeID: 1, LanguegeName: "React Native" },
      { LanguegeID: 2, LanguegeName: "Flutter" },
      { LanguegeID: 3, LanguegeName: "Kotlin" },
    ],
    CatImage: "https://spelltech4ever.com/wp-content/uploads/2021/08/mobileprogramming.jpg",
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
    CourseID: 4,
    CourseName: "React Native - The Practical Guide [2023]",
    CourseDescription:
      "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 2, 5],
    CourseCategory: "Mobile",
    CourseLanguage: "React Native",
    CoursePrice: 600000,
    CourseImage: "http://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
    CourseViews: 34656,
    PostingDate: Date("2022-03-25"),
  },
  {
    CourseID: 5,
    CourseName: "Angular - The Complete Guide (2023 Edition)",
    CourseDescription:
      "Master Angular (formerly Angular 2) and build awesome, reactive web apps with the successor of Angular.js",
    CourseAuthor: "Phuoc Dinh",
    CourseRating: [5, 5, 4, 5, 5, 5],
    CourseCategory: "Web",
    CourseLanguage: "AngularJS",
    CoursePrice: 500000,
    CourseImage: "https://web888.vn/wp-content/uploads/2022/04/tong-quan-ve-angularjs-1650275790336.jpg",
    CourseViews: 67887,
    PostingDate: Date("2022-03-25"),
  },
];

const renderHome = async (req, res) => {
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

  res.render("home", {
    style: "home.css",
    js: "home.js",
    SliderList: SliderList,
    CatList: CatList,
    featuredCourses: CourseList.map((course) => {
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
    }),
  });
};

export { renderHome };
