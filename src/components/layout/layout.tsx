import React, { Component } from "react";
import { About } from "../about/about";
import { Welcome } from "../welcome/welcome";
import "./layout.css";

export class Layout extends Component {
  public render() {
    return (
      <div className="layout">
        <header>
          <h1>Menu</h1>
        </header>
        <div className="welcome-area">
          <Welcome />
        </div>
        <main>
          <About />
          
        </main>
      </div>
    );
  }
}
