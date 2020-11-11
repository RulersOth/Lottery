import React, { PureComponent } from 'react';
import './style.css';

class Ball extends PureComponent {
    render() {
        const { number } = this.props;
        let background;
        if (number <= 10) {
            background = '#ba68c8';
        } else if (number <= 20) {
            background = '#f47373';
        } else if (number <= 30) {
            background = '#37d67a';
        } else if (number <= 40) {
            background = '#2ccce4';
        } else {
            background = '#dce775';
        }
        return (
        <div className="ball" style={{ background }}>{number}</div>
        );
    }
}

export default Ball;