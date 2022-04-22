import { useState, useEffect } from 'react';

const h1Style = {
    textAlign: 'center',
    color: 'cornflowerblue',
    textShadow: '1px 1px black'
}

const formStyle = {
    display: 'flex',
    gap: '0.5rem'
}

const inputStyle = {
    width: '7rem',
    boxSizing: 'border-box',
    margin: 'auto',
    border: 0,
    borderRadius: '4px',
    boxShadow: 'none',
    padding: '1rem',
    height: '2.25rem',
    fontSize: '18px'
}

const timeStyle = {
    color: 'white',
    textAlign: 'center',
    textShadow: '1px 1px black'
}

const textStyle = {
    color: 'white',
}

const spanStyle = {
    color: 'cornflowerblue',
    fontStyle: 'italic',
    fontDecoration: 'underline',
    fontSize: '1.25rem',
    textShadow: '1px 1px black'
}

const newTime = () => {
    return new Date().toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).replace(',','');
}

function Time() {
    const [time, setTime] = useState(newTime);

    useEffect(() => {
        setInterval(() => {
            setTime(newTime);
        }, 1000);
    }, []);

    return <div style={timeStyle}>{time.toLocaleString()} </div>;
}

export const Weather = () => {
    const [temp, setTemp] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('Enter Zip Code');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (zip.length >= 5) return;
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${e.target.value}&units=imperial&appid=4f86436e6605f823f920727a07540a70`)
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if (data.message === 'city not found') {
                setCity('City Not Found');
                setTemp('');
            }
            setTemp(data.main.temp);
            setCity(data.name);
        })
    }

    return (
        <div>
            <h1 style={h1Style}>To-Do Dashboard</h1>
            <Time />
            <form
                style={formStyle}
                className='todo-list'
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name='zip'
                    maxLength={5}
                    style={inputStyle}
                    value={zip}
                    placeholder="Zip Code"
                    onChange={(e) => {
                        setZip(e.target.value);
                        if (e.target.value.length === 5) {
                            handleSubmit(e);
                        }
                    }}
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                />
                {
                    city === 'Enter Zip Code' ? <h4 style={textStyle}>Enter 5-Digit Zip Code for Local Temperature</h4> :
                        city === 'City Not Found' ? <h4 style={textStyle}><span style={{color:'red'}}>Invalid Entry</span>: Please enter a valid 5-digit zip code</h4> :
                        <h4 style={textStyle}>Local temperature in <span style={spanStyle} >{city}</span> is <span style={spanStyle}>{temp}&deg;F</span></h4>
                }
            </form>
        </div>
    )

}