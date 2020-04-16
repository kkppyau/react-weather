import React from 'react';
import {
	WiNightThunderstorm,
	WiRain,
	WiDayRain,
	WiSnowflakeCold,
	WiFog,
	WiCloudy,
	WiDaySunny,
} from 'weather-icons-react';

export default function WeatherIcon(props) {
	const { id, size, float } = props;

	switch (id) {
		case 200:
		case 201:
		case 202:
		case 210:
		case 211:
		case 212:
		case 221:
		case 230:
		case 231:
		case 232:
			return (
				<WiNightThunderstorm
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
		case 300:
		case 301:
		case 302:
		case 310:
		case 312:
		case 313:
		case 314:
		case 321:
		case 520:
		case 521:
		case 522:
		case 531:
			return (
				<WiRain
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
		case 500:
		case 501:
		case 502:
		case 503:
		case 504:
			return (
				<WiDayRain
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
		case 511:
		case 600:
		case 601:
		case 602:
		case 611:
		case 612:
		case 613:
		case 615:
		case 616:
		case 620:
		case 621:
		case 622:
			return (
				<WiSnowflakeCold
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
		case 701:
		case 711:
		case 721:
		case 731:
		case 741:
		case 751:
		case 761:
		case 762:
		case 771:
		case 781:
			return (
				<WiFog
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
		case 801:
		case 802:
		case 803:
		case 804:
			return (
				<WiCloudy
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
		default:
			return (
				<WiDaySunny
					size={size}
					color='#777'
					style={{ float: float === 'right' ? 'right' : 'center' }}
				/>
			);
	}
}
