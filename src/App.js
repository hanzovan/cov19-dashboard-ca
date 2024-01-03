// A. Import
import React from "react";
import Card from "./summaryCard";
import Select from "react-select";
import "./App.css";

// B. App function
function App() {

  // I. Define variables

    // 1. Summary data variable
  const [summaryData, setSummaryData] = React.useState({
    cases: 1697,
    deaths: 117
  })

    // 2. Active location variable
      // 2.1. location list
  const locationList = [
    {value: "AB", label: "Alberta"},
    {value: "BC", label: "British Columbia"},
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" }
  ]
      // 2.2. active location
  const [activeLocation, setActiveLocation] = React.useState("AB");

    // 3. New default value after chosen by user
  const newDefaultValue = locationList.filter(
    option => option.value === activeLocation
  );
    // 4. Date update variable
  const [lastUpdated, setLastUpdated] = React.useState("");

  // II. Define functions
    // 1. Update summary data variable via API call
      // 1.1 base Url
  const baseUrl = "https://api.opencovid.ca";
  
      // 1.2 Function that update summary data
  const getSummaryData = async() => {
    let res = await fetch(`${baseUrl}/summary?loc=${activeLocation}`);
    let resJson = await res.json();
    let data = resJson.data[0];
    let formattedData = {};

    // Mapping data
    Object.keys(data).map(
      (key) => formattedData[key] = data[key].toLocaleString()
    );

    console.log(formattedData);
    setSummaryData(formattedData);
  }
      // 1.3 Function that update active location variable
  function updateActiveLocation(selectedOption) {
    setActiveLocation(selectedOption.value);
  }
      // 1.4 Function that update version
  const getLastUpdated = async() => {
    let res = await fetch(`${baseUrl}/version`);
    let resJson = await res.json();
    setLastUpdated(resJson.timeseries);
  }

  // III. Call functions
  React.useEffect(() => {
    getSummaryData();
    getLastUpdated();
  }, [activeLocation])
  

  // IV. Return statement
  return (
    <div className="App">
      <h1>COVID19 Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-menu">
          <Select
            options={locationList}
            onChange={updateActiveLocation}
            defaultValue={newDefaultValue}
            className="dashboard-select"
          />
          <p className="update-date">Last Updated :{lastUpdated}</p>
        </div>

        {/* Display summary information */}
        <div className="dashboard-summary">
          <Card title="Total Cases" value={summaryData.cases}/>
          <Card title="Total Test" value={summaryData.tests_completed}/>
          <Card title="Total Deaths" value={summaryData.deaths}/>
          <Card title="Total Vaccinated" value={summaryData.vaccine_administration_total_doses}/>
        </div>
      </div>
    </div>
  )
}

export default App