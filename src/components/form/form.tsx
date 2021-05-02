import React, { ChangeEvent, Component } from "react";
import { FormModel } from "../../models/formModel";
import "./form.css";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import axios from "axios";

interface FormState {
  focused: { name: boolean; email: boolean; phone: boolean; message: boolean };
  credentials: FormModel;
  errors: {
    nameError: string;
    emailError: string;
    phoneError: string;
    messageError: string;
  };
}

export class Form extends Component<any, FormState> {
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
    };
  }

  public setName = (e: ChangeEvent<HTMLInputElement>) => {
    const fname = e.target.value;
    const credentials = { ...this.state.credentials };
    credentials.name = undefined;
    let nameError = "";

    if (fname.length < 2 || !fname) {
      nameError = "How do I know how to call you?";
    } else if (!fname.split(" ")[1]) {
      nameError = "I also have a last name... What about you?";
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
      emailError = "How do I know how to contact you?";
    } else if (!re.test(String(email).toLowerCase())) {
      emailError = "Did you just invent an email?";
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
      phoneError = "Looks like you forgot to enter your phone number...";
    } else if (!re.test(String(phone).toLowerCase())) {
      phoneError = "Sorry, your phone number does not match my regex.";
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
    if (!this.state.credentials.phone || !this.state.credentials.email || !this.state.credentials.name) {
      isLegal = false;
    }
    return isLegal;
  }


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
        if (!this.state.credentials.name && this.state.errors.nameError !== 'I also have a last name... What about you?') {
          focused.name = false;
        }
        break;
      case "phone":
        if (!this.state.credentials.phone && this.state.errors.phoneError !== 'Sorry, your phone number does not match my regex.') {
          focused.phone = false;
        }
        break;
      case "email":
        if (!this.state.credentials.email && this.state.errors.emailError !== 'Did you just invent an email?') {
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
      const headers = {
        processData: false,
        contentType: false,
        cache: false,
        enctype: 'multipart/form-data',
        "Access-Control-Allow-Origin": "*"
      }
      const response = await axios.post('https://hooks.zapier.com/hooks/catch/3149413/by3wogy/', this.state.credentials, {
        headers: headers
      });
      console.log(response.data);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  public render() {
    return (
      <div className="form" id="form">
        <div className="inside-form">
          <h1>contact me</h1>
          <h3>
            Here you can tell me about some really awesome jobs, a problems you
            found on any of my assets, <br />
            or anything you like :){" "}
            <br />
            <span className="explaination">Fields marked with-* are required</span>
          </h3>

          <form>
            <div className="first-section">
              <div className="fname-area field">
                <span
                  className={
                    !this.state.focused.name
                      ? "form-title"
                      : "form-title active-field"
                  }
                >
                  Full name *
                </span>
                <input
                  onFocus={this.upPlaceholders("name")}
                  onInput={this.setName}
                  onBlur={this.isDownPlaceholder('name')}
                  className="fname-field"
                  name="fname"
                  type="text"
                />
                <span className="error">{this.state.errors.nameError}</span>
              </div>
              <div className="phone-area field">
                <span
                  className={
                    !this.state.focused.phone
                      ? "form-title"
                      : "form-title active-field"
                  }
                >
                  Phone number
                </span>
                <input
                  onFocus={this.upPlaceholders("phone")}
                  onInput={this.setPhone}
                  onBlur={this.isDownPlaceholder('phone')}
                  className="phone-field"
                  name="phone"
                  type="number"
                />
                <span className="error">{this.state.errors.phoneError}</span>
              </div>
            </div>
            <div className="second-section">
              <div className="email-area field">
                <span
                  className={
                    !this.state.focused.email
                      ? "form-title"
                      : "form-title active-field"
                  }
                >
                  Email *
                </span>
                <input
                  onFocus={this.upPlaceholders("email")}
                  onBlur={this.isDownPlaceholder('email')}
                  className="email-field"
                  onInput={this.setEmail}
                  name="email"
                  type="text"
                />
                <span className="error">{this.state.errors.emailError}</span>
              </div>
              <div className="message-area field">
                <span
                  className={
                    !this.state.focused.message
                      ? "form-title"
                      : "form-title active-field"
                  }
                >
                  Message
                </span>
                <textarea
                  onInput={this.setMessage}
                  onFocus={this.upPlaceholders("message")}
                  onBlur={this.isDownPlaceholder('message')}
                  rows={4}
                  name="message"
                  className="message-field"
                />
                <span className="error">{this.state.errors.messageError}</span>
              </div>
            </div>
          </form>

          <div className={this.isFormIsLegal() ? "send-circle ilegal-form" : "send-circle"}>
            <div className="middle-of-send-circle" onClick={() => { if (this.isFormIsLegal()) { this.sendForm() } }}>
              <span
                className={
                  this.isFormIsLegal() ? "lock unlocked" : "lock"
                }
              ></span>
              {this.isFormIsLegal() && <span>Send</span>}
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
      </div>
    );
  }
}
