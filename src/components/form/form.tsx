import React, { Component } from "react";
import "./form.css";

interface FormState {
  focused: { name: boolean; email: boolean; phone: boolean; message: boolean };
}

export class Form extends Component<any, FormState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      focused: { name: false, email: false, phone: false, message: false },
    };
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

  public render() {
    return (
      <div className="form" id="form">
        <div className="inside-form">
          <h1>contact me</h1>
          <h3>
            Here you can tell me about some really awesome jobs, a problems you
            found on any of my assets, <br />
             or anything you like :){" "}
          </h3>

          <form>
            <div className="first-section">
              <div className="fname-area field">
                <span className={!this.state.focused.name ? "form-title" : "form-title active-field" }>Full name *</span>
                <input
                  onFocus={this.upPlaceholders("name")}
                  className="fname-field"
                  name="fname"
                  type="text"
                />
                <span className="error">Error for field</span>
              </div>
              <div className="phone-area field">
                <span className={!this.state.focused.phone ? "form-title" : "form-title active-field" }>Phone number *</span>
                <input
                  onFocus={this.upPlaceholders("phone")}
                  className="phone-field"
                  name="phone"
                  type="text"
                />
                <span className="error">Error for field</span>
              </div>
            </div>
            <div className="second-section">
              <div className="email-area field">
                <span className={!this.state.focused.email ? "form-title" : "form-title active-field" }>Email *</span>
                <input
                  onFocus={this.upPlaceholders("email")}
                  className="email-field"
                  name="email"
                  type="text"
                />
                <span className="error">Error for field</span>
              </div>
              <div className="message-area field">
                <span className={!this.state.focused.message ? "form-title" : "form-title active-field" }>Message</span>
                <textarea
                  onFocus={this.upPlaceholders("message")}
                  rows={4}
                  name="message"
                  className="message-field"
                />
                <span className="error">Error for field</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
