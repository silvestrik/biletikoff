import React, { Component } from 'react'
import InputAutocomplete from './UI/InputAutocomplete'
import DtPicker from './UI/DtPicker'
import ClassBox from './ClassBox'
import { connect } from 'react-redux'
import { preSimpleSearch}  from '../redux/actions/dataActions'
import { geoIp } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'
import { setDate } from '../redux/actions/dataActions'
import { formatDate } from '../function/formatDate'

class SimpleSearchForm extends Component  { 

    constructor(props) {       
        super(props)        
        this.state = {          
            origin: '',
            originIata: '', 
            destination: '',
            destinationIata: '',
            geoIndex: false           
        } 
    }

    componentDidMount() { 
        this.props.geoIp()
        const currentDate = new Date()      
        setDate(formatDate(currentDate))
    }    
   
    //geoip + auto_origin
    componentDidUpdate(prevProps) {        
        if(prevProps.geoData.name !== this.props.geoData.name) {     
            //console.log(prevProps.geoData.name, this.props.geoData.name)       
            this.setState({
                origin: this.props.geoData.name,
                originIata: this.props.geoData.iata,
                geoIndex: true 
            })
        }
    }
  
    //отправка запроса + конвертация даты       
    formSubmit = event => {       
        event.preventDefault()  
        //console.log(this.props.formData)
        this.props.preSimpleSearch()
    }
    
    render () {          
        const { origin, originIata, destination, destinationIata, geoIndex} = this.state        
        return (             
            <div>   
                <div className="row" >
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">                        
                           {geoIndex === false && 
                            <InputAutocomplete 
                                city = { origin }
                                iata = { originIata }
                                label = "Откуда"
                                placeholder = "Пункт вылета"
                                cityType = "origin"                           
                            />
                        }
                        {geoIndex === true && 
                            <InputAutocomplete 
                                city = { origin }
                                iata = { originIata }
                                label = "Откуда"
                                placeholder = "Пункт вылета"
                                cityType = "origin"
                            />
                        }
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6"> 
                        <InputAutocomplete 
                            city = { destination }
                            iata = { destinationIata }
                            label = "Куда"
                            placeholder = "Пункт назначения"
                            cityType = "destination"
                        />
                    </div>                  
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="date-from" className="searchFormLabel">Дата</label> 
                        <DtPicker placeholderText="Дата вылета" dateType="originDate" dtVisible={false} />                  
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                       <label htmlFor="date-comback" className="searchFormLabel">Обратно</label>                       
                       {!this.props.oneway 
                       ? <DtPicker placeholderText="Дата возврата" dateType="combackDate"  dtVisible={this.props.oneway}/>
                       :
                       <input 
                            type="text"                        
                            className="form-control" 
                            autoComplete="off"
                            disabled={true}                              
                        />                        
                       }
                    </div>   
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                        <ClassBox/> 
                    </div>
                </div> 
                <div className="row" style={{textAlign: "right"}}>
                    <div className="col-xl-8 col-lg-8"></div>      
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <button 
                            type="submit" 
                            onClick={this.formSubmit} 
                            className="btn btn-info" 
                            style={{width: "100%"}}>
                            Найти билеты
                        </button> 
                    </div>
                </div>                                 
            </div>
        )
    }    
}

SimpleSearchForm.propTypes = {
    geoIp: PropTypes.func.isRequired,
    proposals: PropTypes.array
}   

// чтение состояния
const mapStateToProps = state => ({
    currencies: state.data.currencies,        
    routeType: state.UI.routeType,
    multiForm: state.UI.multiForm,
    oneway: state.UI.oneway,
    geoData: state.data.geoData,
    proposals: state.data.proposals,
    formData: state.data.simpleFormParams.segments,
    passData: state.data.passData
})

// передачи события
const mapDispatchToProps = { geoIp, preSimpleSearch }

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSearchForm) 
