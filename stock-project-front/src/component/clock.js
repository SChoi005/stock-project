import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(),
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: new Date(),
            });
        }, 1000);
    }

    render() {
        const hour = this.state.currentTime.getHours();
        const minute = this.state.currentTime.getMinutes();
        const second = this.state.currentTime.getSeconds();
        return (
            <div>
                현재시간 : {hour} : {minute} : {second}
            </div>
        );
    }
}

export default Clock;