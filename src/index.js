import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  state = {
    selectedLocation: "",
    london: [],
    newcastle: [],
    manchester: [],
    "san francisco": [],
    showTable: false
  };

  componentDidMount() {
    // fetch(
    //   `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=london`
    // ).then(response => response.json())
    // .then(data => {
    //   fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${data[0].woeid}/`
    // )
    // .then(response => response.json())
    // .then(weather => this.setState({ london: weather }))
    // })
    this.getWeatherDetails("london");
    this.getWeatherDetails("newcastle");
    this.getWeatherDetails("manchester");
    this.getWeatherDetails("san francisco");
  }

  selectLocation = event => {
    this.setState({
      selectedLocation: event.target.value,
      showTable: true
    });
  };

  getWeatherDetails = (locationName = "") => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${locationName
        .split(" ")
        .join("+")}`
    )
      .then(response => response.json())
      .then(data => {
        this.getWeather(data[0].woeid, locationName);
      });
  };

  getWeather = (woeid, locationName) => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
    )
      .then(response => response.json())
      .then(weatherForLocation =>
        this.setState({
          [locationName]: weatherForLocation
        })
      );
  };

  getWeatherGif = locationName => {
    let weather = this.state[locationName];
    if (weather) {
      switch (
        this.state[locationName].consolidated_weather[0].weather_state_abbr
      ) {
        case "sn":
          return "https://media.giphy.com/media/12wteMTXxjLaVO/giphy.gif";
          break;
        case "sl":
          return "https://media.giphy.com/media/l41Yq6xnFirZUUDv2/giphy.gif";
          break;
        case "hail":
          return "https://media1.tenor.com/images/aff91e4a1750e98906316f6b9a5f814b/tenor.gif?itemid=5320352";
          break;
        case "t":
          // return 'http://i.kinja-img.com/gawker-media/image/upload/t_original/1462610882824795971.gif'
          return "https://i.pinimg.com/originals/ac/50/19/ac501913ebf72f75898e7d5c32e09c17.gif";
          break;
        case "hr":
          return "https://media3.giphy.com/media/5torEEM8QnR95Cqg11/giphy.gif?cid=3640f6095c7ea68462626d4d5528ea65";
          // return 'https://media2.giphy.com/media/eMb8kkoJpCRLa/source.gif'
          break;
        case "lr":
          return "https://media0.giphy.com/media/xT9GEIc1nQ7bVQQ54Q/giphy.gif?cid=3640f6095c7ea5ef326374752ec1f661";
          break;
        case "s":
          return "https://cdn.dribbble.com/users/199340/screenshots/2146877/rainy-800x600.gif";
          // return 'https://media1.tenor.com/images/72d1cc75c4def238452d091448fc0f83/tenor.gif?itemid=5045597'
          break;
        case "hc":
          return "https://media0.giphy.com/media/Cn46Wi1Fvh11S/giphy.gif?cid=3640f6095c7eaa2e426c4a34322e4d02";
          break;
        case "lc":
          return "https://thumbs.gfycat.com/DeadlyEmotionalArcherfish-size_restricted.gif";
          // return 'https://thumbs.gfycat.com/InnocentMediumJohndory-small.gif'
          break;
        case "c":
          return "https://thumbs.gfycat.com/RingedConfusedAfricanbushviper-small.gif";
          break;
        default:
          return "";
      }
    } else {
      return null;
    }
  };

  render() {
    const { selectedLocation } = this.state;
    return (
      <div
        style={{
          backgroundImage: `url(${this.getWeatherGif(
            this.state.selectedLocation
          )})`
        }}
        className="wrapper"
      >
        <div
          className="outside-wrapper"
          style={this.state[selectedLocation] ? { color: "white" } : null}
        >
          <h1>Weather App</h1>
          <select onChange={this.selectLocation}>
            <option hidden>Pick a location</option>
            <option value="london">London</option>
            <option value="san francisco">San Francisco</option>
            <option value="newcastle">Newcastle</option>
            <option value="manchester">Manchester</option>
          </select>
          {this.state.showTable ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <td>Properties</td>
                    <td>Details</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Weather</td>
                    <td>
                      {this.state[selectedLocation].consolidated_weather ? (
                        <img
                          className="background-gif"
                          src={`https://www.metaweather.com/static/img/weather/png/64/${
                            this.state[selectedLocation].consolidated_weather[0]
                              .weather_state_abbr
                          }.png`}
                        />
                      ) : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      {this.state[selectedLocation].consolidated_weather
                        ? this.state[selectedLocation].consolidated_weather[0]
                            .applicable_date
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Temp</td>
                    <td>
                      {this.state[selectedLocation].consolidated_weather
                        ? `${Math.ceil(
                            this.state[selectedLocation].consolidated_weather[0]
                              .the_temp
                          )}°C`
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Wind Speed</td>
                    <td>
                      {this.state[selectedLocation].consolidated_weather
                        ? Math.floor(
                            this.state[selectedLocation].consolidated_weather[0]
                              .wind_speed
                          )
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Region</td>
                    <td>{this.state[selectedLocation].title}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
