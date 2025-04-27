import react, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { AboutModel } from "../../models/aboutModel";
import "./about-pop-up.css";

interface AboutPopUpState {
  contentKey: string;
  content: AboutModel[];
  language: string;
}

export class AboutPopUp extends Component<any, AboutPopUpState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      contentKey: store.getState().contentForAboutPopUp,
      content: [],
      language: store.getState().language,
    };

    this.unsubscribeStore = store.subscribe(() => {
      const contentKey = store.getState().contentForAboutPopUp;
      this.setState({ contentKey });
      const language = store.getState().language;
      this.setState({ language });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const contentKey = store.getState().contentForAboutPopUp;
      this.setState({ contentKey });
      const language = store.getState().language;
      this.setState({ language });
    });

    if (this.state.language === "english") {
      this.setState({ content: this.contents });
    } else {
      this.setState({ content: this.hebContents });
    }
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public contents = [
    {
      key: "profile",
      title: "About me",
      imgSrc: "profile-icon.svg",
      content: `Hi! <br/> My name is Maya Weissman. <br/>
     I discovered my love for web development through a completely different profession. <br/>
     In my youth, I was a makeup business owner. <br/>
     Like any business owner - I needed a website, landing pages and more. <br/>
     With very little knowledge, I turned to the platforms through them I could build such assets. <br/>
     I spent so many hours working on platforms like WordPress, Wix and others, and I realized I was not in the right field. <br/>
     I fell in love with what I did, and realized I had to turn this hobby into a profession. <br/>
     <br/>
     <br/>
     Today, I am happy to say that I am completely in the right field.<br/>
     I am waking up every morning with a passion for what I do. <br/>
     Im in love with writing codes, Working on a team,
     Solving problems and thinking outside the box when I encounter a really annoying problem.<br/>
     I guess only those who work in the field will understand what I mean :)
     `,
    },
    {
      key: "study",
      title: "Education",
      imgSrc: "education-icon.svg",
      content: `Since entering the industry, I've often been asked:
"Why didn’t you just take a 3-month course on Udemy?"

The truth is, the one-year program I completed at John Bryce College was one of the best experiences of my life.
It gave me a strong foundation — the essential toolbox I needed to take my first steps into the tech world.

If you've read my "About Me," you already know that I came to John Bryce with absolutely no background in coding.
At the start of the course, I was one of those students who asked a thousand questions — and honestly, I lagged behind the rest of the class.
Call it competitive spirit, but falling behind just wasn’t an option for me.

I took the course very seriously. Beyond the assigned homework, I spent countless hours practicing, experimenting, and diving deep into self-learning.
In the end, my hard work paid off: I graduated with honors, achieving a 98 average across all projects and exams.

   `,
    },
    {
      key: "work",
      title: "Career",
      imgSrc: "career-icon.svg",
      content: `
In early 2020, I began working at McCann Group as a Full Stack Developer. During my time there, I contributed to a variety of projects, both for external clients and internal initiatives. The diverse range of projects allowed me to gain experience with different technologies and systems, including:

Frontend: JavaScript, TypeScript, ReactJS, ReactTS, React Native, Vanilla JS

Backend: Node.js, PHP

Other Tools: WordPress, Excel Functions, FileZilla, VS Code, and more.

Through these projects, I was able to expand my skill set, gaining exposure to UI/UX design, data management, and information security—essential tools that helped me grow as a developer.

In 2021, I transitioned to Stor.ai, a company specializing in technological solutions for the grocery industry worldwide. There, I played a key role in developing systems to optimize collection processes for the company’s customers. Working as part of a collaborative programming team, I contributed to several critical systems, including:

Picking Application: A system designed to streamline the order-picking process.

Backoffice System: A tool for store managers to monitor, manage, and generate reports related to picking processes across various branches.

Microservices & Integration: Developing microservice-based servers and integrations to support various operational needs.

This experience at Stor.ai further honed my technical and collaborative skills, deepening my expertise in system optimization and large-scale software development.
      `,
    },
  ];

  public hebContents = [
    {
      key: "profile",
      title: "קצת עליי",
      imgSrc: "profile-icon.svg",
      content: `היי! <br/> אני מיה ויסמן. <br/>
     את אהבתי לתחום הפיתוח גיליתי בכלל דרך תחום אחר לגמרי. <br/>
    בצעירותי, הייתי בעלת עסק בתחום האיפור. <br/>
     כמו כל בעלת עסק, הייתי זקוקה לאתר אינטרנט, עמודי נחיתה ונכסים דיגיטליים אחרים. <br/>
     עם מעט מאוד ידע, פניתי לפלטפורמות שדרכן יכולתי לבנות נכסים כאלה בעצמי. <br/>
    אחרי שביליתי שעות מול פלטרפורמות כמו wordpress ו-wix, הבנתי שאני בכלל לא נמצאת בתחום הנכון. <br/>
    התאהבתי במה שאני עושה, והבנתי שאני צריכה להפוך את התחביב למקצוע.<br/>
     <br/>
    היום, אני יותר משמחה להגיד שאני לגמרי נמצאת בתחום הנכון.<br/>
    אני קמה בכל בוקר עם תשוקה למה שאני עושה:<br/>
     אני אוהבת לכתוב קוד, לעבוד בצוות,
     לפתור בעיות ולשבור את הראש כשאני נתקלת בבעיה ממש מעצבנת.<br/>
    אני מניחה שמי שעובד בתחום ידע בדיוק על מה אני מדברת :)
     `,
    },
    {
      key: "study",
      title: "הכשרה",
      imgSrc: "education-icon.svg",
      content: `מאז שנכנסתי לתעשייה, שמעתי לא פעם את השאלה - <br/>
       למה לא לקחת פשוט קורס של 3 חודשים ב"Udemy?"<br/>
       האמת היא, שהקורס של שנה שעשיתי בג'ון ברייס היא אחת החוויות הכי טובות שהיו לי.<br/>
       במסגרת הלימודים, קיבלתי את ארגז הכלים הראשוני אליו הייתי זקוקה בשביל תחילת דרכי בתעשייה.<br/>
       אם קראתם את פסקת ה"עליי", אתם כבר יודעים שהגעתי לג'ון ברייס עם אפס ניסיון.<br/>
       בתחילת הלימודים, הייתי מהתלמידות המעצבנות, אלה ששואלות מליון שאלות וכן- הייתי הרבה מאחורי כולם בחומר.<br/>
      תקראו לי תחרותית - אבל לא התאים לי בכלל לא להצטיין.<br/>
       לקחתי את הלימודים מאוד ברצינות, ומלבד למטלות השונות שקיבלתי מהמרצה, הייתי מבלה שעות מול המחשב בחקר, התנסות ובעיקר הרבה למידה עצמית.<br/>
       יצא ככה, שהמתלמידה שנמצאת הרבה מאחורה סיימתי את הלימודים בהצטיינות עם ממוצע של 98 בכל העבודות והמבחנים.<br/>
       <br/>
     קשה לומר ששם הסתיים פרק הלימודים בחיי. למזלי, בתחום התכנות אני לומדת כל יום משהו חדש :)    `,
    },
    {
      key: "work",
      title: "קריירה",
      imgSrc: "career-icon.svg",
      content: `
      בתחילת שנת 2020, התחלתי לעבוד בקבוצת "McCann" בתפקיד Full Stack Developer.<br/>
      במסגרת עבודתי בחברה, לקחתי חלק בפרוייקטים רבים - חלקם עבור לקוחות החברה וחלקם פרוייקטים פנימיים. <br/>
     עקב ריבוי הפרוייקטים שיועדו ללקוחות שונים, <br/>
     התנסיתי בפיתוח במגוון רחב של שפות וטכנולוגיות כמו:<br/>
       JavaScript, TypeScript, ReactJS, ReactTS, React Native, Wordpress, PHP, Node.js, Vanilla Js, Excel Functions, FileZilla, VS Code ועוד.
      <br/>
    כמו כן, במסגרת עבודתי זכיתי לקבל כלים נוספים אשר מסייעים לי בעבודתי כמו: UI/UX, אבטחת מידע, ניהול דטאות ועוד.
    <br/><br/><br/>
    בשנת 2021 התחלתי לעבוד בחברת "Stor.ai" המספקת מענה טכנולוגי לסופרים וצרכניות ברחבי העולם.
    במסגרת עבודתי, לקחתי חלק בפיתוח מערכות הנועדו לייעל את תהליכי הליקוט של לקוחות החברה, כחלק מצוות מתכנתים.
    בין היתר, פיתחנו אפליקציית ליקוט הנועדה לייעל את תהליך ליקוט ההזמנות, מערכת "Backoffice" הנועדה למנהלי החנות לצורך מעכב, ביצוע פעולות והפקת דוחות עבור תהליכי הליקוט בסניפים,
    שרתי Microservice, אינטגרציה, ועוד. 


      `,
    },
  ];
  public stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  public getContent = () => {
    return this.state.content.find((c) => c.key === this.state.contentKey);
  };

  public render() {
    return (
      <div
        className="about-pop-up"
        onClick={() =>
          store.dispatch({ type: ActionType.changeDisplayForAboutPopUp })
        }
      >
        <div className="inside-about-pop-up" onClick={this.stopPropagation}>
          <img
            className="close-pop-up"
            src="./assets/images/X.svg"
            onClick={() =>
              store.dispatch({ type: ActionType.changeDisplayForAboutPopUp })
            }
          />
          <h1>{this.getContent()?.title}</h1>
          <img
            className="about-image"
            src={"./assets/images/" + this.getContent()?.imgSrc}
          />
          <div
            className="content-area"
            style={{
              textAlign: this.state.language === "english" ? "left" : "right",
              direction: this.state.language === "english" ? "ltr" : "rtl",
            }}
            dangerouslySetInnerHTML={{
              __html: this.getContent()?.content as string,
            }}
          ></div>
        </div>
      </div>
    );
  }
}
