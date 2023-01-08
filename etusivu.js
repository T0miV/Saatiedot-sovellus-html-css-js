let weather = {
    apiKey: "f49a95cf04768be88f7b07a59df7c5f9",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

 displayWeather: function(data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity,speed)
    document.querySelector(".city").innerText = "Säätiedot " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Ilmankosteus: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Tuulennopeus: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("ladataan");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function(){
   this.fetchWeather( document.querySelector(".search-bar").value )

  }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();

})