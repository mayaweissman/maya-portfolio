import react, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./recursion.css";

interface RecursionState {
  text: string;
  textToDisplay: string;
  language: string;
}

export class Recursion extends Component<any, RecursionState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      text: `I'm happy to tell you <span class="bold">that's not a bug!</span> <br/><br/>
      U just choosed a Porject called  <span class="pink">Recursion.</span> <br/><br/>
      if you are familiar with this concept,<br/>
        I guess you already understand why the page was refresh ;)`,
      textToDisplay: "I",
      language: store.getState().language,
    };

    this.unsubscribeStore = store.subscribe(() => {
      const language = store.getState().language;
      this.setState({ language });
    });
  }

  public engText = `I'm happy to tell you <span class="bold">that's not a bug!</span> <br/><br/>
  U just choosed a Porject called  <span class="pink">Recursion.</span> <br/><br/>
  if you are familiar with this concept,<br/>
    I guess you already understand why the page was refresh ;)`;

  public engTextToDisplay = "I";

  public hebText = `<span class="bold">אני שמחה לבשר לך</span> שזאת לא הייתה תקלה!
   <br/><br/>
   הרגע בחרת פרויקט שנקרא </span> "רקורסיה". <span class="pink">
    אם המושג הזה מוכר לך,
    <br/>
    אני מניחה שכבר הבנת למה העמוד ריענן את עצמו ;)
`;

  public hebTextToDisplay = "א";

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const language = store.getState().language;
      this.setState({ language });
    });

    if (this.state.language === "english") {
      this.setState({ text: this.engText });
      this.setState({ textToDisplay: this.engTextToDisplay });
    } else {
      if (this.state.language === "english") {
        this.setState({ text: this.hebText });
        this.setState({ textToDisplay: this.hebTextToDisplay });
      }
    }

    setInterval(() => {
      if (this.state.text.length > 1) {
        let newText = this.state.text.slice(1);
        let textToDisplay = this.state.textToDisplay.concat(newText[0]);
        this.setState({ textToDisplay });
        this.setState({ text: newText });
      }
    }, 50);

    setTimeout(() => {
      store.dispatch({ type: ActionType.showRecursion, payLoad: false });
    }, 20000);
  }

  public render() {
    return (
      <div className="recursion">
          <img className="close-btn" src="./assets/images/X.svg" onClick={()=>store.dispatch({type: ActionType.showRecursion, payLoad: false})}/>
        <div
          className="inside-recursion-box"
          dangerouslySetInnerHTML={{
            __html: this.state.textToDisplay as string,
          }}
        ></div>
      </div>
    );
  }
}
