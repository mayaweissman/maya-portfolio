import React, { ChangeEvent, Component } from "react";
import { FormModel } from "../../models/formModel";
import "./form.css";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import axios from "axios";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";

interface FormState {
  focused: { name: boolean; email: boolean; phone: boolean; message: boolean };
  credentials: FormModel;
  errors: {
    nameError: string;
    emailError: string;
    phoneError: string;
    messageError: string;
  };
  isFormSent: boolean;
  language: string;
}

export class Form extends Component<any, FormState> {

  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      focused: { name: false, email: false, phone: false, message: false },
      credentials: new FormModel(),
      errors: {
        nameError: " ",
        emailError: " ",
        phoneError: " ",
        messageError: " ",
      },
      isFormSent: false,
      language: store.getState().language
    };

    this.unsubscribeStore = store.subscribe(() => {
      const language = store.getState().language;
      this.setState({ language });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const language = store.getState().language;
      this.setState({ language });
    });
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public setName = (e: ChangeEvent<HTMLInputElement>) => {
    const fname = e.target.value;
    const credentials = { ...this.state.credentials };
    credentials.name = undefined;
    let nameError = "";

    if (fname.length < 2 || !fname) {
      nameError =  this.state.language === 'english' ? "How do I know how to call you?" : 'איך אדע כיצד לקרוא לך?';
    } else if (!fname.split(" ")[1]) {
      nameError =  this.state.language === 'english' ? "I also have a last name... What about you?" : 'לי יש גם שם משפחה.. מה איתך?';
    } else {
      credentials.name = fname;
    }

    this.setState({ credentials });
    const errors = { ...this.state.errors };
    errors.nameError = nameError;
    this.setState({ errors });
  };

  public setEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const credentials = { ...this.state.credentials };
    credentials.email = undefined;
    let emailError = "";
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      emailError =  this.state.language === 'english' ? "How do I know how to contact you?" : 'איך אדע כיצד ליצור איתך קשר?';
    } else if (!re.test(String(email).toLowerCase())) {
      emailError =  this.state.language === 'english' ? "Did you just invent an email?" : 'יכול להיות שהמצאת הרגע אימייל?';
    } else {
      credentials.email = email;
    }

    this.setState({ credentials });
    const errors = { ...this.state.errors };
    errors.emailError = emailError;
    this.setState({ errors });
  };

  public setPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    let phoneError = "";
    const re = /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
    const credentials = { ...this.state.credentials };
    credentials.phone = undefined;

    if (!phone) {
      phoneError =  this.state.language === 'english' ? "Looks like you forgot to enter your phone number..." : 'נראה ששכחת להזין את מספר הטלפון שלך';
    } else if (!re.test(String(phone).toLowerCase())) {
      phoneError =  this.state.language === 'english' ? "Sorry, your phone number does not match my regex." : 'אני מצטערת, המספר שלך לא תואם את ה-regex שלי.';
    } else {
      credentials.phone = +phone;
    }

    this.setState({ credentials });
    const errors = { ...this.state.errors };
    errors.phoneError = phoneError;
    this.setState({ errors });
  };

  public getProgressForCircle = () => {
    const credentials = { ...this.state.credentials };
    let filled = 0;
    for (const c of Object.values(credentials)) {
      if (c) {
        filled++;
      }
    }
    return filled;
  };

  public setMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    const credentials = { ...this.state.credentials };
    credentials.message = message;
    this.setState({ credentials });
  };

  public isFormIsLegal = () => {
    let isLegal = true;
    if (
      !this.state.credentials.phone ||
      !this.state.credentials.email ||
      !this.state.credentials.name
    ) {
      isLegal = false;
    }
    return isLegal;
  };

  public upPlaceholders = (name: string) => (e: any) => {
    const focused = { ...this.state.focused };
    switch (name) {
      case "name":
        focused.name = true;
        break;
      case "phone":
        focused.phone = true;
        break;
      case "email":
        focused.email = true;
        break;
      case "message":
        focused.message = true;
        break;

      default:
        break;
    }
    this.setState({ focused });
  };

  public isDownPlaceholder = (name: string) => (e: any) => {
    const focused = { ...this.state.focused };
    switch (name) {
      case "name":
        if (
          !this.state.credentials.name &&
          this.state.errors.nameError !==
          "I also have a last name... What about you?" &&
          this.state.errors.nameError !==
          'לי יש גם שם משפחה.. מה איתך?'
        ) {
          focused.name = false;
        }
        break;
      case "phone":
        if (
          !this.state.credentials.phone &&
          this.state.errors.phoneError !==
          "Sorry, your phone number does not match my regex." &&
          this.state.errors.phoneError !==
          'אני מצטערת, המספר שלך לא תואם את ה-regex שלי.'
        ) {
          focused.phone = false;
        }
        break;
      case "email":
        if (
          !this.state.credentials.email &&
          this.state.errors.emailError !== "Did you just invent an email?" && 
          this.state.errors.emailError !== 'יכול להיות שהמצאת הרגע אימייל?'
        ) {
          focused.email = false;
        }
        break;
      case "message":
        if (!this.state.credentials.message) {
          focused.message = false;
        }
        break;

      default:
        break;
    }
    this.setState({ focused });
  };

  public sendForm = async () => {
    try {
      this.setState({ isFormSent: true });
      const headers = {
        processData: false,
        contentType: false,
        cache: false,
        enctype: "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      };
      const response = await axios.post(
        "https://hooks.zapier.com/hooks/catch/3149413/by3wogy/",
        this.state.credentials,
        {
          headers: headers,
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  public render() {
    return (
      <div className="form" id="form">
        {this.state.isFormSent && (
          <div className="inside-form">
            <img className="thanks-gif" src="./assets/images/giphy.gif" />
           {this.state.language === 'english' && <h1>I promise to reply your message <br />
            as soon as possible!</h1>}
           {this.state.language !== 'english' && <h1>אני מבטיחה לחזור לפנייתך <br />
            !בהקדם האפשרי</h1>}
          </div>
        )}
        {!this.state.isFormSent && (
          <div className="inside-form">
            <h1>
              {this.state.language === 'english' ? 'Contact me' : 'יצירת קשר'}
            </h1>
            <h3 style={{
              direction: this.state.language === 'english' ? 'ltr' : 'rtl', textAlign: this.state.language === 'english' ? 'left' : 'right'
            }}>
              {this.state.language === 'english' ? `  Here you can tell me about some really awesome jobs, a problems
              you found on any of my assets, ` :
                `זה המקום לספר לי על עבודות ממש שוות, בעיות שמצאת בכל אחד מהאתרים שלי `}

              {this.state.language === 'english' && <br className="only-desktop" />}
              {this.state.language !== 'english' && <br/>}
              {this.state.language === 'english' ? 'or anything you like :) ' : 'או בעצם, כל דבר :)'}
              <br />
              <span className="explaination">
                {this.state.language === 'english' ? 'Fields marked with-* are required' : 'שדות המסומנים ב-* הינם חובה'}
              </span>
            </h3>

            <form>
              <div className="first-section">
                <div className="fname-area field">
                  <span
                    style={{
                      direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                      left: this.state.language === 'english' ? '0' : 'unset',
                      right: this.state.language === 'english' ? 'unset' : '0'
                    }}
                    className={
                      !this.state.focused.name
                        ? "form-title"
                        : "form-title active-field"
                    }
                  >
                    {this.state.language === 'english' ? ' Full name *' : 'שם מלא *'}
                  </span>
                  <input
                    onFocus={this.upPlaceholders("name")}
                    onInput={this.setName}
                    onBlur={this.isDownPlaceholder("name")}
                    className="fname-field"
                    name="fname"
                    type="text"
                  />
                  <span className="error" style={{
                    direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                    right: this.state.language === 'english' ? '0' : 'unset',
                    left: this.state.language === 'english' ? 'unset' : '0'
                  }}>{this.state.errors.nameError}</span>
                </div>
                <div className="phone-area field">
                  <span
                   style={{
                    direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                    left: this.state.language === 'english' ? '0' : 'unset',
                    right: this.state.language === 'english' ? 'unset' : '0'
                  }}
                    className={
                      !this.state.focused.phone
                        ? "form-title"
                        : "form-title active-field"
                    }
                  >
                    {this.state.language === 'english' ? 'Phone number *' : 'מספר טלפון *'}
                  </span>
                  <input
                    onFocus={this.upPlaceholders("phone")}
                    onInput={this.setPhone}
                    onBlur={this.isDownPlaceholder("phone")}
                    className="phone-field"
                    name="phone"
                    type="number"
                  />
                  <span className="error" style={{
                    direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                    right: this.state.language === 'english' ? '0' : 'unset',
                    left: this.state.language === 'english' ? 'unset' : '0'
                  }}>{this.state.errors.phoneError}</span>
                </div>
              </div>
              <div className="second-section">
                <div className="email-area field">
                  <span
                   style={{
                    direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                    left: this.state.language === 'english' ? '0' : 'unset',
                    right: this.state.language === 'english' ? 'unset' : '0'
                  }}
                    className={
                      !this.state.focused.email
                        ? "form-title"
                        : "form-title active-field"
                    }
                  >
                    {this.state.language === 'english' ? 'Email *' : 'אימייל *'}
                  </span>
                  <input
                    onFocus={this.upPlaceholders("email")}
                    onBlur={this.isDownPlaceholder("email")}
                    className="email-field"
                    onInput={this.setEmail}
                    name="email"
                    type="text"
                  />
                  <span className="error" style={{
                    direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                    right: this.state.language === 'english' ? '0' : 'unset',
                    left: this.state.language === 'english' ? 'unset' : '0'
                  }}>{this.state.errors.emailError}</span>
                </div>
                <div className="message-area field">
                  <span
                   style={{
                    direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                    left: this.state.language === 'english' ? '0' : 'unset',
                    right: this.state.language === 'english' ? 'unset' : '0'
                  }}
                    className={
                      !this.state.focused.message
                        ? "form-title"
                        : "form-title active-field"
                    }
                  >
                    {this.state.language === 'english' ? 'Message' : 'הודעה'}
                  </span>
                  <textarea
                    onInput={this.setMessage}
                    onFocus={this.upPlaceholders("message")}
                    onBlur={this.isDownPlaceholder("message")}
                    rows={4}
                    name="message"
                    className="message-field"
                  />
                  <span className="error">
                    {this.state.errors.messageError}
                  </span>
                </div>
              </div>
            </form>

            <div
              className={
                this.isFormIsLegal() ? "send-circle ilegal-form" : "send-circle"
              }
            >
              <div
                className="middle-of-send-circle"
                onClick={() => {
                  if (this.isFormIsLegal()) {
                    this.sendForm();
                  }
                }}
              >
                <span
                  className={this.isFormIsLegal() ? "lock unlocked" : "lock"}
                ></span>
                {this.isFormIsLegal() && <span>
                  {this.state.language === 'english' ? 'Send' : 'שלח'}

                </span>}
              </div>
              <div className="first-section">
                <div
                  className={
                    this.getProgressForCircle() >= 2
                      ? "one-on-circle rib filled-rib"
                      : "one-on-circle rib"
                  }
                ></div>
                <div
                  className={
                    this.getProgressForCircle() >= 3
                      ? "two-on-circle rib filled-rib"
                      : "two-on-circle rib"
                  }
                ></div>
              </div>

              <div className="second-section">
                <div
                  className={
                    this.getProgressForCircle() >= 1
                      ? "three-on-circle rib filled-rib"
                      : "three-on-circle rib"
                  }
                ></div>
                <div
                  className={
                    this.getProgressForCircle() >= 4
                      ? "four-on-circle rib filled-rib"
                      : "four-on-circle rib"
                  }
                ></div>
              </div>
            </div>
          </div>
        )
        }
      </div>
    );
  }
}
