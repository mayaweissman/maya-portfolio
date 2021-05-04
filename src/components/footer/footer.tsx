import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import "./footer.css";

interface FooterState {
    language: string
}

export class Footer extends Component<any, FooterState> {

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
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

    public render() {
        return (
            <div className="footer" style={{
                direction: this.state.language === 'english' ? 'ltr' : 'rtl',
                textAlign: this.state.language === 'english' ? 'left' : 'right'
            }}>
                <span>
                    {this.state.language === 'english' ?
                        ` This website made with ReactTS using some Material Ui Icons.` :
                        'האתר נבנה באמצעות ReactTS תוך שימוש באייקונים מתוך הספרייה של Material Ui Icons'}
                    <br />
                    {this.state.language === 'english' ?
                        ` &copy;	All rights reserved to Maya Weissman.` :
                        ' כל הזכויות על בניית האתר שמורות למיה ויסמן.'}

                    <br />
                    {this.state.language === 'english' ?
                        `   &copy;	Some of the projects presented on the website were built as part of my work at "McCann",all rights to those properties are reserved to 'McCann Group'
                        and its customers.` :
                        ' חלק מהפרוייקטים המוצגים באתר נבנו במסגרת עבודתי בקבוצת "מקאן". כל הזכויות עבור אותם פרוייקטים שמורים לקבוצת "מקאן" ולקוחותיה בלבד בהתאם למדיניות הקבוצה..'}

                </span>
            </div>
        )
    }
}