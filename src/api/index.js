import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

// fetch("https://covid-193.p.rapidapi.com/statistics", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "covid-193.p.rapidapi.com",
// 		"x-rapidapi-key": "d6fd086b37mshb212f6ae49c73edp166dd3jsn6fbed0c9d20e"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });

export const fetchData = async (country) => {
	let changeURL =url;

	if(country){
		changeURL= `${url}/countries/${country}`
	}
    try {
        const {data} = await axios.get(changeURL);
		
		const modifiedData ={
			confirmed: data.confirmed,
			recovered: data.recovered,
			deaths: data.deaths,
			lastUpdate: data.lastUpdate

		}
		return modifiedData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
	try {
		const {data} = await axios.get(`${url}/daily`);

		const modifiedData = data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}))
		return modifiedData;

	} catch (error) {
		console.log(error);
	}
}

export const fetchCountries = async () => {
	try {
		const {data : {countries}} = await axios.get(`${url}/countries`);
		return countries.map((country) => country.name);

	} catch (error) {
		console.log(error);
	}
}