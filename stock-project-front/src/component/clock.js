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
        var hour = this.state.currentTime.getHours();
        var minute = this.state.currentTime.getMinutes();
        var second = this.state.currentTime.getSeconds();

        if(hour<10)
            hour = '0'+hour;
        
        if(minute<10)
            minute = '0'+minute;
        
        if(second<10)
            second = '0'+second;
        
        return (
            <div className="clock">
                현재시간 : {hour} : {minute} : {second}
            </div>
        );
    }
}

export default Clock;