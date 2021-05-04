import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { getSocial } from "../../data/socials";
import { SocialModel } from "../../models/socialModel";
import { store } from "../../redux/store";
import "./social.css";

interface SocialState {
  isOnDrag: boolean;
  positions: { name: string; left: number; top: number }[];
  elementNameToCenter: SocialModel;
  socialElements: SocialModel[];
  isAfterAnimation: boolean;
  isCenterAvailable: boolean;
  isOnMobile: boolean;
  language: string;
}

export class Social extends Component<any, SocialState> {

  private unsubscribeStore: Unsubscribe;


  public constructor(props: any) {
    super(props);
    this.state = {
      isOnDrag: false,
      positions: [
        { name: "facebook", left: -4, top: -4 },
        { name: "instagram", left: -4, top: -4 },
        { name: "linkedin", left: -4, top: -4 },
        { name: "github", left: -4, top: -4 },
        { name: "whatsapp", left: -4, top: -4 },
        { name: "gmail", left: -4, top: -4 },
        { name: "clubhouse", left: -4, top: -4 },
        { name: "telegram", left: -4, top: -4 },
      ],
      elementNameToCenter: new SocialModel(),
      socialElements: getSocial(),
      isAfterAnimation: false,
      isCenterAvailable: false,
      isOnMobile: false,
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

    setTimeout(() => {
      this.setState({ isAfterAnimation: true });
    }, 16000);

    if (window.screen.width < 600) {
      this.setState({ isOnMobile: true });
    }
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }



  public dragSocial = (social: string) => (e: any) => {
    //Enable function only if animation end
    if (!this.state.isAfterAnimation) {
      this.setState({ isOnDrag: true });
      this.setState({ isCenterAvailable: false });
      //Restart all drggaing for socials ojects
      const socials = [...this.state.socialElements];
      for (const s of socials) {
        s.isOnDrag = false;
      }
      //True for dragging only for specipic object
      const socialElementIndex = socials.findIndex((s) => s.name === social);
      socials[socialElementIndex].isOnDrag = true;
      this.setState({ socialElements: socials });

      document.addEventListener("mousemove", (e) => {
        const isSocialUsedForDrag = this.state.socialElements.find(
          (s) => s.name === social
        )?.isOnDrag;
        if (this.state.isOnDrag && isSocialUsedForDrag) {
          const clientX = e.clientX;
          const clientY = e.clientY;
          const elementX = document
            .querySelector(`.${social}`)
            ?.getBoundingClientRect().x;
          const elementY = document
            .querySelector(`.${social}`)
            ?.getBoundingClientRect().y;
          if (elementX && elementY) {
            const x = clientX - elementX - 25;
            const y = clientY - elementY - 25;
            const positions = [...this.state.positions];
            const index = positions.findIndex((p) => p.name === social);
            positions[index].left = x;
            positions[index].top = y;
            this.setState({ positions });

            document.addEventListener("click", (e) => {
              if (this.state.isCenterAvailable) {
                const elementNameToCenter = this.state.socialElements.find(
                  (s) => s.name === social
                );
                if (elementNameToCenter) {
                  this.setState({ elementNameToCenter });
                  this.setState({ isOnDrag: false });
                  const updatedPositions = [...this.state.positions];
                  for (const p of updatedPositions) {
                    p.left = -4;
                    p.top = -4;
                  }
                  this.setState({ positions: updatedPositions });
                }
              } else {
                positions[index].left = -4;
                positions[index].top = -4;
                this.setState({ positions });
                document.removeEventListener("mousemove", () => { }, true);
                this.setState({ isOnDrag: false });
                return;
              }
            });
          }
        }
      });
      if (window.screen.width < 600) {
        document.addEventListener("touchmove", (e) => {
          document.body.style.overflow = "hidden";
          const isSocialUsedForDrag = this.state.socialElements.find(
            (s) => s.name === social
          )?.isOnDrag;
          if (this.state.isOnDrag && isSocialUsedForDrag) {
            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;
            const elementX = document
              .querySelector(`.${social}`)
              ?.getBoundingClientRect().x;
            const elementY = document
              .querySelector(`.${social}`)
              ?.getBoundingClientRect().y;

            const centerX = document
              .querySelector(`.handle-social`)
              ?.getBoundingClientRect().x;
            const centerY = document
              .querySelector(`.handle-social`)
              ?.getBoundingClientRect().y;
            if (centerX && centerY) {
              if (((clientX > centerX && clientX < centerX + 100) || (clientX < centerX && clientX > centerX - 50)) &&
                (clientY > centerY && clientY < centerY + 100) || (clientY < centerY && clientY > centerY - 50)) {
                this.setState({ isCenterAvailable: true });
                setTimeout(() => {
                  this.setState({ isCenterAvailable: false });
                }, 2000);
              }
            }

            if (elementX && elementY) {
              const x = clientX - elementX - 25;

              const y = clientY - elementY - 25;
              const positions = [...this.state.positions];
              const index = positions.findIndex((p) => p.name === social);
              positions[index].left = x;
              positions[index].top = y;
              this.setState({ positions });

              document.addEventListener("click", (e) => {
                if (this.state.isCenterAvailable) {
                  const elementNameToCenter = this.state.socialElements.find(
                    (s) => s.name === social
                  );
                  if (elementNameToCenter) {
                    this.setState({ elementNameToCenter });
                    this.setState({ isOnDrag: false });
                    const updatedPositions = [...this.state.positions];
                    for (const p of updatedPositions) {
                      p.left = -4;
                      p.top = -4;
                    }
                    this.setState({ positions: updatedPositions });
                  }
                } else {
                  positions[index].left = -4;
                  positions[index].top = -4;
                  this.setState({ positions });
                  document.removeEventListener("mousemove", () => { }, true);
                  this.setState({ isOnDrag: false });
                  return;
                }
              });

            }
          }
        });
      }
    }
  };

  public touchEnd = (social: string) => (event: any) => {
    document.body.style.overflow = "scroll";

    const positions = [...this.state.positions];
    const index = positions.findIndex((p) => p.name === social);
    if (this.state.isCenterAvailable) {
      const elementNameToCenter = this.state.socialElements.find(
        (s) => s.name === social
      );
      if (elementNameToCenter) {
        this.setState({ elementNameToCenter });
        this.setState({ isOnDrag: false });
        const updatedPositions = [...this.state.positions];
        for (const p of updatedPositions) {
          p.left = -4;
          p.top = -4;
        }
        this.setState({ positions: updatedPositions });
        setTimeout(() => {
          window.open(this.state.elementNameToCenter.url, "_blank");
        }, 1000);
      }
    } else {

      positions[index].left = -4;
      positions[index].top = -4;
      this.setState({ positions });
      document.removeEventListener("touchmove", () => { }, true);
      this.setState({ isOnDrag: false });
      return;
    }
  }

  public openSocial = () => {
    if (this.state.isOnDrag) {
      this.setState({ isCenterAvailable: true });
      setTimeout(() => {
        window.open(this.state.elementNameToCenter.url, "_blank");
      }, 1000);
      setTimeout(() => {
        this.setState({ isCenterAvailable: false });
      }, 2000);
    };
  }

  public openByURl = () => {
    if (!this.state.isOnDrag) {
      const url = this.state.elementNameToCenter.url;
      window.open(url, "_blank");
    }
  };

  public render() {
    return (
      <div
        className="social"
        id="social"
        style={{ cursor: this.state.isOnDrag ? "grabbing" : "" }}
      >
        <h1>
          {this.state.language === 'english' ? 'Find me on social media' : 'מצא אותי ברשתות החברתיות'}
        </h1>

        <div className="circle">
          {this.state.socialElements.map((s) => (
            <div className={"social-border " + s.name} key={s.name}>
              {s.name !== this.state.elementNameToCenter.name && (
                <>
                  <div
                    onDragStart={this.dragSocial(s.name as string)}
                    onTouchStart={this.dragSocial(s.name as string)}
                    onTouchEnd={this.touchEnd(s.name as string)}
                    className="social-circle"
                    style={{
                      left: `${this.state.positions.find((p) => p.name === s.name)
                        ?.left
                        }px`,
                      top: `${this.state.positions.find((p) => p.name === s.name)?.top
                        }px`,
                    }}
                  >
                    <img src={`./assets/images/${s.imgSrc}`} />
                  </div>
                  <span className="social-title">{s.title}</span>
                </>
              )}
            </div>
          ))}
        </div>

        {this.state.elementNameToCenter.name && (
          <div
            className={
              "social-center center-" + this.state.elementNameToCenter.name
            }
            onClick={this.openSocial}
          >
            <div className="social-circle" onClick={this.openByURl}>
              <img
                src={`./assets/images/${this.state.elementNameToCenter.imgSrc}`}
              />
            </div>
            <span className="social-title">
              {this.state.elementNameToCenter.title}
            </span>
          </div>
        )}

        <div className="handle-social" onClick={this.openSocial}>
          <div className="handle-social-inside"></div>
          <div className="handle-social-deep"></div>
          <img className="drag-icon" src="./assets/images/drag.png" />
        </div>
      </div>
    );
  }
}
