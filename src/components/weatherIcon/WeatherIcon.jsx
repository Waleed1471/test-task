import React from 'react';

function WeatherIcon({ conditionText }) {
    const renderIcon = (text) => {
        switch (text) {
            case 'clear':
                return <img src="/assets/images/sun_icon.svg" alt="" />;
            case 'Partly cloudy':
                return <img src="/assets/images/cloudy_icon.svg" alt="" />;
            case 'Sunny':
                return <img src="/assets/images/sun_icon.svg" alt="" />;
            case 'Moderate rain':
                return <img src="/assets/images/cloudy_icon.svg" alt="" />;
            case 'Patchy rain nearby':
                return <img src="/assets/images/cloudy_icon.svg" alt="" />;
            case 'Light rain shower':
                return <img src="/assets/images/raining_icon.svg" alt="" />;
            default:
                return <img src="/assets/images/sun_icon.svg" alt="" />;;
        }
    };

    return renderIcon(conditionText);
}

export default WeatherIcon;