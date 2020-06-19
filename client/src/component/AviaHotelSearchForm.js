import React, { Component } from 'react'
import InputAutocomplete from './UI/InputAutocomplete'
import DtPicker from './UI/DtPicker'
import ClassBox from './ClassBox'
import { connect } from 'react-redux'
import { preSimpleSearch, preHotelSearch}  from '../redux/actions/dataActions'
import { geoIp, setStorageDataToForm, aviaHotelToggleForm } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'
import { getHotelAutocomplete } from '../function/hotelAutocomplete'
//convert Date
import { formatDateTopForm } from '../function/formatDate'
//translate
import { translate } from '../function/translate'

class AviaHotelSearchForm extends Component  { 

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
            if(this.props.formData.origin && this.props.formData.destination){                
                if(this.props.formData.origin.name !== this.state.origin) {                    
                    this.setState({
                        origin: this.props.formData.origin.name,
                        originIata: this.props.formData.origin.code,
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
        this.props.preHotelSearch()   
       
        console.log(this.props.formData, this.props.passData, this.props.hotelData)
        // localStorage.setItem('formData', JSON.stringify(this.props.formData))
        // localStorage.setItem('passData', JSON.stringify(this.props.passData))   
        //localStorage.setItem('aviaHotel', JSON.stringify(this.props.formData)) 

        //var destinationIata = 
        

        if(this.props.formData.destination) {
            //console.log(this.props.formData.destination.code)
            var cityDapartureIata = this.props.formData.destination.code   
        getHotelAutocomplete(cityDapartureIata)
            .then( response => { 
                const cityData = response.data.results.locations
                //console.log(cityData) 
                cityData.map(item => {
                    if(item.iata.includes(cityDapartureIata) === true){
                        localStorage.setItem('formData', JSON.stringify(this.props.formData))
                        localStorage.setItem('passData', JSON.stringify(this.props.passData)) 
                        localStorage.setItem('aviaHotel', JSON.stringify(item)) 
                        //console.log(item)
                    }
                   
                })
                
            })   
            .catch(error => {
                console.log(error)
            }) 
        }
    }

      
    // видимость формы поиска
    handlerVisibleForm = e => {
        const data = !this.props.aviaHotelFormVisible
        this.props.aviaHotelToggleForm(data)
    }

    
    render () {          
        const { origin, originIata, destination, destinationIata } = this.state            
        return (
            <div>
                {this.props.aviaHotelInfoboardVisible &&     
                    <div style={{width: "100%"}} onClick={this.handlerVisibleForm}>
                        <div className="searchFormTop" style={{padding: 0}}>
                            <div className="col-md-12" style={{paddingLeft:0}}> 
                                <div className="searchFormTopText">
                                <span className="searchIcon"></span>
                                <span style={{paddingRight: 5, paddingLeft: 35}}>{ this.props.formData.origin ? this.props.formData.origin.name : '' }</span>
                                <span> ({ this.props.formData.origin ? this.props.formData.origin.code : '' })</span>
                                <span> - { this.props.formData.destination ? this.props.formData.destination.name : '' }</span>
                                <span style={{paddingRight: 5}}> ({ this.props.formData.destination ? this.props.formData.destination.code : '' })</span>
                                |
                                <span style={{paddingLeft: 5, color: '#fff'}}>
                                    <span>{ this.props.formData.date ? formatDateTopForm(this.props.formData.date) : '' }</span>
                                    <span>{ this.props.formData.combackDate ? ' - ' + formatDateTopForm(this.props.formData.combackDate) : '' } </span> 
                                    |
                                    <span style={{paddingLeft: 5}}> 
                                        { this.props.passData 
                                            ? this.props.passData.adults + this.props.passData.child + this.props.passData.baby
                                            : ''
                                        } чел.
                                    </span>
                                </span>
                                { this.props.loading && this.props.searchStatus === true &&
                                    <span className="smSpinerContainer">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                }
                                {/* { this.props.ticketsLength !== 0 && 
                                    <span style={{paddingLeft: 25}}> <strong>{ this.props.ticketsLength } {translate('options', this.props.language) }</strong></span>
                                } */}
                                </div>
                            </div> 
                        </div> 
                    </div>
                }
                { this.props.aviaHotelFormVisible &&            
                <>
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
                </>    
                }  
            </div>                
        )
    }    
}

AviaHotelSearchForm.propTypes = {
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
    localStorageStatus: state.data.localStorageStatus,
    aviaHotelFormVisible: state.data.aviaHotelFormVisible,
    aviaHotelInfoboardVisible: state.data.aviaHotelInfoboardVisible,
    hotelData: state.data.hotelParams.formData  
})

// передачи события
const mapDispatchToProps = { geoIp, setStorageDataToForm, preSimpleSearch, preHotelSearch, aviaHotelToggleForm  }

export default connect(mapStateToProps, mapDispatchToProps)(AviaHotelSearchForm) 
