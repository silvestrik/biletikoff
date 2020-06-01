import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton'

class HotelListSkeleton extends Component {
    render() {
        return (
            <div>
                <div className="result-item">            
                    <div className="result-head" style={{background: '#e1e8ec', color: "#e1e8ec"}}>skeleton</div>
                    <Skeleton  height={197}/>               
                </div>
                <div className="result-item">            
                    <div className="result-head" style={{background: '#e1e8ec', color: "#e1e8ec"}}>skeleton</div>
                    <Skeleton  height={197}/>               
                </div>                
            </div>
                        
        )
    }
}

export default HotelListSkeleton
