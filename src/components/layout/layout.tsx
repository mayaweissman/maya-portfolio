import React, { Component } from "react";
import { Contact } from "../contact/contact";
import { Welcome } from "../welcome/welcome";
import "./layout.css";

export class Layout extends Component{
    public render(){
        return(
            <div className="layout">
                <main>
                    <Welcome/>
                </main>
                <aside>
                    <Contact/>
                </aside>
            </div>
        )
    }
}