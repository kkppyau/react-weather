import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Weather from 'Weather.js';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: '10vh',
		paddingRight: '15px',
		paddingLeft: '15px',
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '90%',
		'@media (min-width: 576px)': {
			maxWidth: '540px',
		},
		'@media (min-width: 768px)': {
			maxWidth: '720px',
		},
		'@media (min-width: 992px)': {
			maxWidth: '960px',
		},
		'@media (min-width: 1200px)': {
			maxWidth: '960px',
		},
	},
	title: {
		textAlign: 'center',
		paddingBottom: 15,
	},
}));

export default function App() {
	const classes = useStyles();

	const getIpData = () => {
		return fetch('https://ipapi.co/json/')
			.then((res) => res.json())
			.then((result) => {
				return { lat: result.latitude, lon: result.longitude };
			});
	};

	const getWeatherData = (lat, lon) => {
		return fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid={API_KEY}`
		)
			.then((res) => res.json())
			.then((result) => {
				return result;
			});
	};

	const getForecastData = (lat, lon) => {
		return fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid={API_KEY}`
		)
			.then((res) => res.json())
			.then((result) => {
				let data = [];
				for (let i = 0; i < result.list.length; i += 8) {
					let maxIndex =
							i + 9 >= result.list.length ? result.list.length - 1 : i + 9,
						minIndex =
							i + 6 >= result.list.length ? result.list.length - 1 : i + 6;
					data.push({
						maxTemp:
							result.list[maxIndex].main.temp > result.list[minIndex].main.temp
								? result.list[maxIndex].main.temp
								: result.list[minIndex].main.temp,
						minTemp:
							result.list[minIndex].main.temp < result.list[maxIndex].main.temp
								? result.list[minIndex].main.temp
								: result.list[maxIndex].main.temp,
						weather: result.list[i + 4].weather[0].id,
						dateTime: result.list[i + 4].dt * 1000,
					});
				}
				return data;
			});
	};

	return (
		<div className={classes.root}>
			<Typography variant='h3' gutterBottom className={classes.title}>
				Simple Weather
			</Typography>
			<Weather
				onGetIp={getIpData}
				onGetWeather={getWeatherData}
				onGetForecast={getForecastData}
			/>
		</div>
	);
}
