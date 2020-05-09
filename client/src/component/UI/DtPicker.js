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
import { setDate, setCombackDate } from '../../redux/actions/dataActions'
//locale for datepicker
registerLocale("ru", ru)

class DtPicker extends Component {

    constructor(props) {      
        super(props)
        this.setDate = this.setDate.bind(this)
        this.state = {
            date: '',
            dateType: this.props.dateType,
            placeholderText: this.props.placeholderText,
            dtVisible: this.props.dtVisible
        }
    } 

    componentDidMount(){        
        if(this.state.dateType === 'originDate') {
            this.setState({
                date: new Date().setDate(new Date().getDate()+3)
            })       
        } else {
            this.setState({
                date: new Date().setDate(new Date().getDate()+10)
            })
        }
    }        

    setDate = event => {        
        this.setState({
            date: event
        })
       const fDate = formatDate(event)       
       if(this.props.dateType === 'combackDate') {
            this.props.setCombackDate(fDate)
       } else {
            this.props.setDate(fDate)
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

const mapDispatchToProps = { setDate, setCombackDate }

export default connect(mapStateToProps, mapDispatchToProps)(DtPicker)
