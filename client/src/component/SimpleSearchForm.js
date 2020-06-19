import React, { Component } from 'react'
import InputAutocomplete from './UI/InputAutocomplete'
import DtPicker from './UI/DtPicker'
import ClassBox from './ClassBox'
import { connect } from 'react-redux'
import { preSimpleSearch}  from '../redux/actions/dataActions'
import { geoIp, setStorageDataToForm } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'

class SimpleSearchForm extends Component  { 

    constructor(props) {       
        super(props)        
        this.state = {          
            origin: '',
            originIata: '', 
            destination: '',
            destinationIata: '',
            status: false
        }
    }

    componentDidMount() {       
        if(localStorage.hasOwnProperty('formData')){           
            this.props.setStorageDataToForm()
        } else { 
           this.props.geoIp()
        }        
    }
    //scrollForm
    componentDidUpdate(prevProps) {
        if(localStorage.hasOwnProperty('formData')){
            console.log(this.props.formData)
            
            if(this.props.formData.origin){                
                if(this.props.formData.origin.name !== this.state.origin) { 
                    this.setState({
                        origin: this.props.formData.origin.name,
                        originIata: this.props.formData.origin.code,                    
                        status: !this.state.status                       
                    })                    
                }               
            }

            if(this.props.formData.destination){                
                if(this.props.formData.destination.name !== this.state.destination) { 
                    this.setState({                        
                        destination: this.props.formData.destination.name,
                        destinationIata: this.props.formData.destination.code,
                        status: !this.state.status                       
                    })                    
                }               
            }

        } else {
            if(prevProps.geoData.name !== this.props.geoData.name) {
                //console.log(prevProps.geoData.name, this.props.geoData.name)
                this.setState({
                    origin: this.props.geoData.name,
                    originIata: this.props.geoData.iata,
                    status: !this.state.status                   
                })                
            }             
        }        
    }
  
    //отправка запроса + конвертация даты       
    formSubmit = event => {       
        event.preventDefault()        
        this.props.preSimpleSearch()   
        console.log('preSimpleSearch', this.props.formData, this.props.passData)
        localStorage.setItem('formData', JSON.stringify(this.props.formData))
        localStorage.setItem('passData', JSON.stringify(this.props.passData))
    }
    
    render () {          
        const { origin, originIata, destination, destinationIata } = this.state            
        return (             
            <div>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">                   
                        { this.state.status === false && 
                            <InputAutocomplete 
                                city = { origin }
                                iata = { originIata }
                                label = "Откуда"
                                placeholder = "Пункт вылета"
                                cityType = "origin"
                            /> 
                        }  
                        { this.state.status === true && 
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
                        { this.state.status === true && 
                            <InputAutocomplete 
                                city = { destination }
                                iata = { destinationIata }
                                label = "Куда"
                                placeholder = "Пункт назначения"
                                cityType = "destination"
                            />
                        
                        }
                        { this.state.status === false && 
                        
                            <InputAutocomplete 
                                city = { destination }
                                iata = { destinationIata }
                                label = "Куда"
                                placeholder = "Пункт назначения"
                                cityType = "destination"
                            />
                        } 
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
                <div className="row" style={{textAlign: "right", marginTop: 15}} > 
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
    setStorageDataToForm: PropTypes.func.isRequired,
    proposals: PropTypes.array,
    localStorageStatus: PropTypes.bool
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
    passData: state.data.passData,
    currency: state.UI.currency,
    language: state.UI.language,
    localStorageStatus: state.data.localStorageStatus
})

// передачи события
const mapDispatchToProps = { geoIp, setStorageDataToForm, preSimpleSearch }

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSearchForm) 
