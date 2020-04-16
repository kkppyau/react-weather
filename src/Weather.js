import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import GridContainer from 'components/GridContainer.js';
import GridItem from 'components/GridItem.js';
import WeatherIcon from 'components/WeatherIcon.js';

const useStyles = makeStyles((theme) => ({
	small: {
		fontSize: '65%',
		fontWeight: '400',
		lineHeight: '1.5',
		color: '#777',
	},
	cardPadding: {
		padding: 15,
	},
	weatherPadding: {
		paddingBottom: 15,
	},
	forecastItem: {
		textAlign: 'center',
	},
	horizontalList: {
		flexDirection: 'row',
		paddingTop: 15,
	},
	hiddenScroll: {
		padding: 20,
		textAlign: 'center',
		overflowX: 'hidden',
		overflowY: 'hidden',
	},
}));

export default function Weather(props) {
	const classes = useStyles();
	const [weatherData, setWeatherData] = useState({});
	const [forecastData, setForecastData] = useState({});

	useEffect(() => {
		props.onGetIp().then((data) => {
			props.onGetWeather(data.lat, data.lon).then((result) => {
				setWeatherData({ ...result });
			});
			props.onGetForecast(data.lat, data.lon).then((result) => {
				setForecastData({ ...result });
			});
		});
	}, []);

	if (
		Object.keys(weatherData).length > 0 &&
		Object.keys(forecastData).length > 0
	) {
		return (
			<Card className={classes.cardPadding}>
				<GridContainer justify='center' className={classes.weatherPadding}>
					<GridItem xs={10} sm={10} md={8}>
						<WeatherIcon
							id={weatherData.weather[0].id}
							size={160}
							float='right'
						/>
						<Typography variant='h5' gutterBottom>
							{weatherData.name}
						</Typography>
						<Typography variant='h2' gutterBottom>
							{Math.round(weatherData.main.temp)}&deg;C
						</Typography>
						<Typography variant='h2' gutterBottom className={classes.small}>
							{Math.round(weatherData.main.temp_max)}&deg;C/{' '}
							{Math.round(weatherData.main.temp_min)}
							&deg;C
						</Typography>
						<Typography variant='h2' gutterBottom className={classes.small}>
							Humidity: {weatherData.main.humidity}%
						</Typography>
					</GridItem>
				</GridContainer>
				<Divider />
				<GridContainer
					justify='center'
					alignItems='center'
					className={classes.horizontalList}
				>
					{Object.keys(forecastData).map((item) => (
						<GridItem xs={12} sm={2} md={2} key={item}>
							<GridContainer
								direction='row'
								justify='center'
								alignItems='center'
								className={classes.forecastItem}
							>
								<GridItem xs={4} sm={12} md={12}>
									<Typography
										variant='h5'
										gutterBottom
										className={classes.small}
									>
										{moment(forecastData[item].dateTime).format('dddd')}
									</Typography>
								</GridItem>
								<GridItem xs={4} sm={12} md={12}>
									<WeatherIcon id={forecastData[item].weather} size={40} />
								</GridItem>
								<GridItem xs={4} sm={12} md={12}>
									<Typography
										variant='h5'
										gutterBottom
										className={classes.small}
									>
										{Math.round(forecastData[item].maxTemp)}&deg;C/{' '}
										{Math.round(forecastData[item].minTemp)}
										&deg;C
									</Typography>
								</GridItem>
							</GridContainer>
						</GridItem>
					))}
				</GridContainer>
			</Card>
		);
	} else {
		return (
			<Card className={classes.cardPadding}>
				<GridContainer justify='center'>
					<CircularProgress />
				</GridContainer>
			</Card>
		);
	}
}
