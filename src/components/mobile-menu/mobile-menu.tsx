import React, { Component } from "react";
import "./mobile-menu.css";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { TransferWithinAStationSharp } from "@material-ui/icons";

interface MobileMenuState {
  activeLink: number;
  underlinesList: number[];
  isMenuOpen: boolean;
  closeClass: string
}

export class MobileMenu extends Component<any, MobileMenuState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      activeLink: 0,
      underlinesList: [],
      isMenuOpen: true,
      closeClass: ""
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
    let y = 0;
    switch (index) {
      case 1:
        y = this.getVerticalScrollPercentage(document.body, 18);
        break;

      case 2:
        y = this.getVerticalScrollPercentage(document.body, 30);
        break;

      case 3:
        y = this.getVerticalScrollPercentage(document.body, 45);
        break;

      case 4:
        y = this.getVerticalScrollPercentage(document.body, 55);
        break;

      case 5:
        y = this.getVerticalScrollPercentage(document.body, 67);
        break;

      case 6:
        y = this.getVerticalScrollPercentage(document.body, 82);
        break;

      default:
        break;
    }
    this.closePopUp();
    window.scrollTo(0, y);
  };

  public getVerticalScrollPercentage(elm: any, percentage: number) {
    var p = elm.parentNode
    return p.scrollHeight / 100 * percentage;
  }

  public closePopUp = () => {
    this.setState({ closeClass: "close-popup" });
    setTimeout(() => {
      this.setState({ isMenuOpen: false });
    }, 1500);
  }

  public openPopUp = () => {
    this.setState({ closeClass: "" });
    setTimeout(() => {
      this.setState({ isMenuOpen: true });
    }, 1500);
  }
  public render() {
    return (
      <div className={"mobile-menu " + this.state.closeClass}>
        <div className="menu-circle" onClick={this.openPopUp}>
          <MenuIcon style={{ color: 'white', fontSize: '10vw' }} />
        </div>
        {this.state.isMenuOpen && <div className="menu-popup">
          <div className="pop-up-content">
            <CloseIcon style={{ fontSize: '8vw', position: 'absolute', top: '3vw', right: '3vw' }} onClick={this.closePopUp} />

            <div className="links">
              <div
                onMouseEnter={this.fillUnderLine}
                onMouseLeave={() => this.setState({ underlinesList: [] })}
                className={
                  "menu-item item-1 " + this.isActive(1) + this.isUnderLine(1)
                }
              >
                <a onClick={this.changeDisplay(1)}>
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
                <a onClick={this.changeDisplay(2)}>
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
                <a onClick={this.changeDisplay(3)}>
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
                <a onClick={this.changeDisplay(4)}>
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
                <a onClick={this.changeDisplay(5)}>
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
                <a onClick={this.changeDisplay(6)}>
                  Contact me
          </a>
              </div>
            </div>
          </div>

        </div>}
      </div>
    );
  }
}
