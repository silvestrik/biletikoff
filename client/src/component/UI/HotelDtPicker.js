import React, { Component } from 'react'
import propTypes from 'prop-types'
//DatePicker
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from "date-fns/locale/ru"
import "react-datepicker/dist/react-datepicker.css"
import { subDays } from 'date-fns'
//конвертация даты для API
import { formatDate } from '../../function/formatDate' 
import { connect } from 'react-redux'
// actions
//import { setDate, setCombackDate } from '../../redux/actions/dataActions'
import { setCheckInDate, setCheckOutDate } from '../../redux/actions/dataActions'
//locale for datepicker
registerLocale("ru", ru)

class HotelDtPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dateType: this.props.dateType,
            placeholderText: this.props.placeholderText,
            date: ''
        }
    }

    componentDidMount(){   

        //прибавляем к дате нужно количество дней
        function addDays(dateObj, numDays) {
            dateObj.setDate(dateObj.getDate() + numDays);
            return dateObj;
        }
        
        // если есть в localStorage
        if(localStorage.hasOwnProperty('hotelData')){  
            let hotelParams = localStorage.getItem('hotelData')
            var hotelParamsObj = JSON.parse(hotelParams) 
            
            if(hotelParamsObj.checkInDate) {
                var checkInDate = new Date(hotelParamsObj.checkInDate).getTime()     
                this.props.setCheckInDate(hotelParamsObj.checkInDate)          
            }

            if(hotelParamsObj.checkOutDate) {
                var checkOutDate = new Date(hotelParamsObj.checkOutDate).getTime()
                this.props.setCheckOutDate(hotelParamsObj.checkOutDate)
            }            
            
            if(this.state.dateType === 'checkIn') {
                this.setState({
                    date: checkInDate
                })
                
            } else {
                this.setState({
                    date: checkOutDate
                })                
            }
        } else {
            
            if(this.state.dateType === 'checkIn') {
                
                // дата туда по умолчанию
                this.setState({
                    date: new Date().setDate(new Date().getDate())+1000*60*60*24*7
                }) 
    
                var plus7days = addDays(new Date(), 7)
                var plus17days = addDays(new Date(), 10)
                var d = plus7days.getDate()
                if (d < 10) { 
                    d = "0" + d; 
                }
                var m = plus7days.getMonth()+1                     
                if (m < 10) { 
                    m = "0" + m; 
                }
                const y = plus7days.getFullYear()   
                const currentDate = `${y}-${m}-${d}`
                this.props.setCheckInDate(currentDate)
                // дата обратно по умолчанию
                var d1 = plus17days.getDate()
                if (d1 < 10) { 
                    d1 = "0" + d1; 
                }
                var m1 = plus17days.getMonth()+1                     
                if (m1 < 10) { 
                    m1 = "0" + m1; 
                }
                const y1 = plus17days.getFullYear()   
                const currentDateCompack = `${y1}-${m1}-${d1}`            
                this.props.setCheckOutDate(currentDateCompack)                
            } else {
                this.setState({
                    date: new Date().setDate(new Date().getDate())+1000*60*60*24*17
                })
            }
        }        
    }        

    setDate = event => {        
        this.setState({
            date: event
        })
       const fDate = formatDate(event)       
       if(this.props.dateType === 'checkOut') {
            this.props.setCheckOutDate(fDate)
       } else {
            this.props.setCheckInDate(fDate)
       }       
    }

    render() {
        return (
            <div>      
                <DatePicker
                    className="form-control" 
                    showPopperArrow={false}
                    selected={this.state.date}
                    dateFormat="dd.MM.yyyy"
                    locale="ru"
                    minDate={subDays(new Date(), 0)}
                    onChange={date => this.setDate(date)} 
                    isClearable    
                    placeholderText={this.state.placeholderText}                                   
                />                
            </div>
        )
    }
}

HotelDtPicker.propTypes = {
    setCheckInDate: propTypes.func.isRequired,
    setCheckOutDate: propTypes.func,
    fDate: propTypes.string    
}

const mapStateToProps = state => ({
    hotelParams: state.data.hotelParams
})

const mapDispatchToProps = { setCheckInDate, setCheckOutDate }

export default connect(mapStateToProps, mapDispatchToProps)(HotelDtPicker)
