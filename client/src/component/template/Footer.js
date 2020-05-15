import React, { Component } from 'react'
import ScrollToTop from 'react-scroll-up'

class Footer extends Component {    

    render() {
        const scroolStyle = {
            position: 'fixed',
            bottom: 7,
            right: 40,
            cursor: 'pointer',
            border: '2px solid #fff',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'linear',
            transitionDelay: '0s',
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: `#ffc107 url(./img/scroll-top.png) no-repeat center`,
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px'
        }

        return (
            <div className="col-md-12">
                <div>
                <ScrollToTop 
                    showUnder={160}
                    duration={500}
                    style={scroolStyle}
                >           
                </ScrollToTop>
                    <p>footer</p>
                </div>
            </div>            
        )
    }
}

export default Footer
