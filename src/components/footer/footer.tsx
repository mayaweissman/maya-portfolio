import React, { Component } from "react";
import "./footer.css";

export class Footer extends Component {
    public render() {
        return (
            <div className="footer">
                <span>This website made with ReactTS using some Material Ui Icons.
                    <br />
                    &copy;	All rights reserved to Maya Weissman.
                    <br />
                    &copy;	Some of the projects presented on the website were built as part of my work at "McCann",all rights to those properties are reserved to 'McCann Group'
                     and its customers.
                </span>
            </div>
        )
    }
}