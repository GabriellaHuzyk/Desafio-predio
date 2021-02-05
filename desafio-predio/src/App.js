import React, { Component, Fragment } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";

class Predio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayButton: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };
    this.changeState = this.changeState.bind(this);
    this.changeAllWindows = this.changeAllWindows.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (location) => {
      const response = await axios.get(
        "https://api.sunrise-sunset.org/json?lat=" +
          location.coords.latitude +
          "&lng=" +
          location.coords.longitude
      );
      const sunrise = response.data.results.sunrise;
      const actualTime = moment();
      const check = actualTime.isAfter(sunrise);
      console.log(moment().format("h:mm:ss A"));
    });
  }

  changeState(index) {
    let newArray = this.state.arrayButton;
    newArray[index] = !newArray[index];
    this.setState({ arrayButton: newArray });
  }

  changeAllWindows() {
    const newMode = !this.state.mode;
    this.setState({ mode: newMode });

    let newArray = [];
    this.state.arrayButton.map((button, index) => {
      if (button !== newMode) {
        newArray.push(!button);
      } else {
        newArray.push(button);
      }
    });
    this.setState({ arrayButton: newArray });
  }

  render() {
    return (
      <>
        <div className="main-build">
          {this.state.arrayButton.map((button, index) => {
            return (
              <div
                className={button ? "onWindow" : "offWindow"}
                onClick={() => {
                  this.changeState(index);
                }}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => {
            this.changeAllWindows();
          }}
        >
          {!this.state.mode ? "Acender" : "Apagar"}
        </button>
      </>
    );
  }
}

export default Predio;
