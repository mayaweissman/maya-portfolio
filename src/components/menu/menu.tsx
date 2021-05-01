import React, { Component } from "react";
import "./menu.css";

interface MenuState {
  activeLink: number;
  underlinesList: number[];
}

export class Menu extends Component<any, MenuState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      activeLink: 0,
      underlinesList: [],
    };
  }

  public isActive = (index: number) => {
    if (this.state.activeLink === index) {
      return "active ";
    }
    return "";
  };

  public fillUnderLine = (e: any) => {
    let className = e.target.className.split(" ")[1];
    if (!className) {
      className = e.target.parentElement.classList[1];
    }
    const index = +className.split("-")[1];
    const active = this.state.activeLink;
    if (active === 0) {
      return;
    } else if (active === index) {
      return;
    }

    let underlinesList = [];
    if (this.state.activeLink > index) {
      for (let i = index; i <= this.state.activeLink; i++) {
        underlinesList.push(i);
      }
    } else {
      for (let i = this.state.activeLink; i <= index; i++) {
        underlinesList.push(i);
      }
    }
    this.setState({ underlinesList });
  };

  public isUnderLine = (index: number) => {
    if (this.state.underlinesList.length > 0) {
      for (const l of this.state.underlinesList) {
        if (l === index && index !== this.state.activeLink) {
          return "active-item ";
        }
      }
    }
    return "";
  };

  public changeDisplay = (index: number) => (event: any) => {
    this.setState({ activeLink: index, underlinesList: [] });
  };

  public render() {
    return (
      <div className="menu">
        <div
          onMouseEnter={this.fillUnderLine}
          onMouseLeave={() => this.setState({ underlinesList: [] })}
          className={
            "menu-item item-1 " + this.isActive(1) + this.isUnderLine(1)
          }
        >
          <a href="#about" onClick={this.changeDisplay(1)}>
            About
          </a>
        </div>
        <div
          onMouseEnter={this.fillUnderLine}
          onMouseLeave={() => this.setState({ underlinesList: [] })}
          className={
            "menu-item item-2 " + this.isActive(2) + this.isUnderLine(2)
          }
        >
          <a href="#technologies" onClick={this.changeDisplay(2)}>
            Tech stack
          </a>
        </div>
        <div
          onMouseEnter={this.fillUnderLine}
          onMouseLeave={() => this.setState({ underlinesList: [] })}
          className={
            "menu-item item-3 " + this.isActive(3) + this.isUnderLine(3)
          }
        >
          <a href="#projects" onClick={this.changeDisplay(3)}>
            Projects
          </a>
        </div>
        <div
          onMouseEnter={this.fillUnderLine}
          onMouseLeave={() => this.setState({ underlinesList: [] })}
          className={
            "menu-item item-4 " + this.isActive(4) + this.isUnderLine(4)
          }
        >
          <a href="#cv" onClick={this.changeDisplay(4)}>
            My CV
          </a>
        </div>
        <div
          onMouseEnter={this.fillUnderLine}
          onMouseLeave={() => this.setState({ underlinesList: [] })}
          className={
            "menu-item item-5 " + this.isActive(5) + this.isUnderLine(5)
          }
        >
          <a href="#social" onClick={this.changeDisplay(5)}>
            Find me
          </a>
        </div>
        <div
          onMouseEnter={this.fillUnderLine}
          onMouseLeave={() => this.setState({ underlinesList: [] })}
          className={
            "menu-item item-6 " + this.isActive(6) + this.isUnderLine(6)
          }
        >
          <a href="#form" onClick={this.changeDisplay(6)}>
            Contact me
          </a>
        </div>
      </div>
    );
  }
}
