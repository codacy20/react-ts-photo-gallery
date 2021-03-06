import React, { Component } from "react";
import "./photo-gallery.css";
import { photos, Photo } from "./model";

export default class PhotoGallery extends Component<{}, { current: number }> {
  preLoadedPhotos = photos;
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  toggle(input: number) {
    this.setState({
      current: input
    });
  }

  like() {
    this.preLoadedPhotos[this.state.current].liked = !this.preLoadedPhotos[
      this.state.current
    ].liked;
    this.forceUpdate();
  }

  swipe(input: number) {
    let counter;
    if (this.state.current >= 0 && this.state.current <= 3) {
      counter = this.state.current;
      if (input === 0 && counter > 0) counter--;
      if (input === 1 && counter < 3) counter++;
      this.setState({
        current: counter
      });
    }
  }

  componentDidMount() {
    this.preLoadedPhotos.forEach(picture => {
      const img = new Image();
      img.src = picture.url;
    });
  }

  render() {
    let status: Element = null;
    let navs = [];

    if (this.preLoadedPhotos[this.state.current].liked) {
      status = <i class="material-icons">favorite</i>;
    } else {
      status = <i class="material-icons">favorite_border</i>;
    }

    for (let i = 0; i < 4; i++) {
      navs.push(
        <div
          className={this.state.current == i ? "rectangle active" : "rectangle"}
          onClick={() => this.toggle(i)}
        />
      );
    }

    return (
      <div className="container-image">
        <div className="swipe left" onClick={() => this.swipe(0)} />
        <div className="heart" onClick={() => this.like()}>
          {status}
        </div>

        <img
          src={this.preLoadedPhotos[0].url}
          className={this.state.current == 0 ? "show" : "hide"}
        />
        <img
          src={this.preLoadedPhotos[1].url}
          className={this.state.current == 1 ? "show" : "hide"}
        />
        <img
          src={this.preLoadedPhotos[2].url}
          className={this.state.current == 2 ? "show" : "hide"}
        />
        <img
          src={this.preLoadedPhotos[3].url}
          className={this.state.current == 3 ? "show" : "hide"}
        />

        <div className="nav">{navs}</div>
        <div className="swipe right" onClick={() => this.swipe(1)} />
      </div>
    );
  }
}
