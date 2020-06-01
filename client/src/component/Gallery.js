import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'

class Gallery extends Component {
   
    render() {
        const id = this.props.hotelId      
        const imageArray = []
            if(this.props.photosHotel) {
                // eslint-disable-next-line
                this.props.photosHotel[id].map(item => { 
                imageArray.push({
                original: `https://photo.hotellook.com/image_v2/limit/${item}/800/520.auto`,
                thumbnail: `https://photo.hotellook.com/image_v2/limit/${item}/250/150.auto`
                })
            })  
        }
        console.log(imageArray)
        return (     
            <div>   
                <ImageGallery 
                    items={imageArray} 
                    showBullets = {true}
                    showIndex = {true}                   
                />
            </div>     
        )
    }
}

export default Gallery
