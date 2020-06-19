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
import { setDate, setCombackDate, setCheckInDate, setCheckOutDate } from '../../redux/actions/dataActions'
//locale for datepicker
registerLocale("ru", ru)

class DtPicker extends Component {

    constructor(props) {      
        super(props)
        //this.setDate = this.setDate.bind(this)
        this.state = {
            date: '',
            dateType: this.props.dateType,
            placeholderText: this.props.placeholderText,
            dtVisible: this.props.dtVisible
        }
    } 

    componentDidMount(){   

        function addDays(dateObj, numDays) {
            dateObj.setDate(dateObj.getDate() + numDays);
            return dateObj;
        }
        
        // если есть в localStorage
        if(localStorage.hasOwnProperty('formData')){  
            let formData = localStorage.getItem('formData')
            var formDataObj = JSON.parse(formData) 
            
            if(formDataObj.date) {
                var date = new Date(formDataObj.date).getTime()     
                this.props.setDate(formDataObj.date)  
                //Автоподстановка даты заезда для отелей
                this.props.setCheckInDate(formDataObj.date)        
            }

            if(formDataObj.combackDate) {
                var combackDate = new Date(formDataObj.combackDate).getTime()
                this.props.setCombackDate(formDataObj.combackDate)
                //Автоподстановка даты выезда для отелей
                this.props.setCheckOutDate(formDataObj.combackDate)
            }            
            
            if(this.state.dateType === 'originDate') {
                this.setState({
                    date: date
                })
                
            } else {
                this.setState({
                    date: combackDate
                })                
            }
        } else {
            if(this.state.dateType === 'originDate') {
                
                // дата туда по умолчанию
                this.setState({
                    date: new Date().setDate(new Date().getDate())+1000*60*60*24*7
                }) 
    
                var plus7days = addDays(new Date(), 7)
                var plus17days = addDays(new Date(), 17)
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
                this.props.setDate(currentDate)
                //для отелей
                //this.props.setCheckInDate(currentDate)  
                // дата обратно по умолчанию

                //console.log('this.props.setCheckInDate(currentDate)', currentDate)

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
                
                
                this.props.setCombackDate(currentDateCompack)
               
                //для отелей 
                this.props.setCheckOutDate(currentDateCompack)

                console.log('this.props.setCheckOutDate(currentDateCompack)', currentDateCompack)


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
       if(this.props.dateType === 'combackDate') {
            this.props.setCombackDate(fDate)
            //для отелей 
            this.props.setCheckOutDate(fDate)
       } else {
            this.props.setDate(fDate)
            //для отелей
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
                    disabled={this.props.oneway}                    
                />                
            </div>
        )
    }
}

DtPicker.propTypes = {
    setDate: propTypes.func.isRequired,
    setCombackDate: propTypes.func.isRequired,
    fDate: propTypes.string,
    dtVisible: propTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI   
})

const mapDispatchToProps = { setDate, setCombackDate, setCheckInDate, setCheckOutDate }

export default connect(mapStateToProps, mapDispatchToProps)(DtPicker)
