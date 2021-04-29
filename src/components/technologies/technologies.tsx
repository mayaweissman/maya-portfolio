import React, { Component } from "react";
import "./technologies.css";

export class Technologies extends Component {

    

  public render() {
    return (
      <div className="technologies" id="technologies">
        <div className="technologies-area">
          <h1>Tech stack</h1>
          <div className="stacks">
            <div className="stack">
              <div className="tech tech-js">
                <img
                  className="tech-icon"
                  src="./assets/images/javascript.png"
                />
                <span>JavaScript</span>
              </div>
              <div className="tech tech-html">
                <img className="tech-icon" src="./assets/images/html.png" />
                <span>HTML</span>
              </div>
              <div className="tech tech-css">
                <img className="tech-icon" src="./assets/images/css.png" />
                <span>CSS/SCSS</span>
              </div>
              <div className="tech tech-ts">
                <img
                  className="tech-icon"
                  src="./assets/images/typescript.png"
                />
                <span>TypeScript</span>
              </div>
              <div className="tech tech-jquery">
                <img className="tech-icon" src="./assets/images/jquery.png" />
                <span>JQuery</span>
              </div>
              <div className="tech tech-react">
                <img className="tech-icon" src="./assets/images/react.png" />
                <span>React</span>
              </div>
              <div className="tech tech-redux">
                <img className="tech-icon" src="./assets/images/redux.png" />
                <span>Redux</span>
              </div>
              <div className="tech tech-wordpress">
                <img
                  className="tech-icon"
                  src="./assets/images/wordpress.png"
                />
                <span>Wordpress</span>
              </div>
              <div className="tech tech-angular">
                <img className="tech-icon" src="./assets/images/angular.png" />
                <span>Angular</span>
              </div>
              <div className="tech tech-bootstrap">
                <img
                  className="tech-icon"
                  src="./assets/images/bootstrap.png"
                />
                <span>Bootstrap</span>
              </div>
              <span className="stack-title">Front end</span>
            </div>
            <div className="stack">
              <div className="tech tech-node">
                <img className="tech-icon" src="./assets/images/node-js.png" />
                <span>Node.js</span>
              </div>
              <div className="tech tech-sql">
                <img className="tech-icon" src="./assets/images/sql.png" />
                <span>SQL</span>
              </div>
              <div className="tech tech-mysql">
                <img className="tech-icon" src="./assets/images/mysql.png" />
                <span>MySQL</span>
              </div>
              <div className="tech tech-mongo">
                <img className="tech-icon" src="./assets/images/mongo.svg" />
                <span>MongoDB</span>
              </div>
              <div className="tech tech-php">
                <img className="tech-icon" src="./assets/images/php.png" />
                <span>PHP</span>
              </div>
              <div className="tech tech-socket">
                <img
                  className="tech-icon"
                  src="./assets/images/socket-io.svg"
                />
                <span>Socket.io</span>
              </div>
              <div className="tech tech-express">
                <img className="tech-icon" src="./assets/images/express.png" />
                <span>Express</span>
              </div>
              <div className="tech tech-azure">
                <img className="tech-icon" src="./assets/images/azure.png" />
                <span>Azure</span>
              </div>
              <div className="tech tech-heroku">
                <img className="tech-icon" src="./assets/images/heroku.png" />
                <span>Heroku</span>
              </div>
              <div className="tech tech-firebase">
                <img className="tech-icon" src="./assets/images/firebase.png" />
                <span>Firebase</span>
              </div>
              <span className="stack-title">Back end</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
