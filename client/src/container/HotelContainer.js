import React, { Component } from 'react'
import HotelInputAutocomplete from '../component/UI/HotelInputAutocomplete'
import HotelClassBox from '../component/UI/HotelClassBox'
import HotelDtPicker from '../component/UI/HotelDtPicker'
import { connect } from 'react-redux'
import { preHotelSearch, hotelToggleForm } from '../redux/actions/dataActions'
//convert Date
import { formatDateTopForm } from '../function/formatDate'
//translate
import { translate } from '../function/translate'
import HotelFilter from '../component/HotelFilter'
import FilterSkeleton from '../component/FilterSkeleton'
import HotelSearchResult from '../component/HotelSearchResult'
//modal window
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'


class HotelContainer extends Component {
    
    //отправка запроса + конвертация даты       
    formSubmit = event => {       
        event.preventDefault()        
        this.props.preHotelSearch()   
        //console.log(this.props.formData)
        localStorage.setItem('hotelData', JSON.stringify(this.props.formData))        
    }

    // видимость формы поиска
    handlerVisibleForm = e => {
        const data = !this.props.hotelParams.hotelFormVisible
        this.props.hotelToggleForm(data)
    }

    render() { 
        return (
            <div>
                {this.props.hotelParams.hotelInfoboardVisible && 
                    <div style={{width: "100%"}} onClick={this.handlerVisibleForm}>
                        <div className="searchFormTop">
                            <div className="col-md-12" style={{paddingLeft:0}}> 
                                <div className="searchFormTopText">
                                <span className="searchIcon"></span>
                                <span style={{paddingRight: 5, paddingLeft: 35}}>                                
                                    { this.props.formData.cityOrHotelData.fullName ? this.props.formData.cityOrHotelData.fullName : '' }
                                    { this.props.formData.cityOrHotelData.label ? this.props.formData.cityOrHotelData.label : '' }
                                </span>                                |
                                <span style={{paddingLeft: 5, color: '#fff'}}>
                                    <span>{ this.props.formData.checkInDate ? formatDateTopForm(this.props.formData.checkInDate) : '' }</span>
                                    <span>{ this.props.formData.checkOutDate ? ' - ' + formatDateTopForm(this.props.formData.checkOutDate) : '' } </span> 
                                    |
                                    <span style={{paddingLeft: 5}}> 
                                        { this.props.formData
                                            ? this.props.formData.adults 
                                            : ''
                                        } взрослый
                                    </span>
                                    { this.props.formData.children && this.props.formData.children.length >0 &&
                                        <span style={{paddingLeft: 5}}> 
                                        , { this.props.formData.children.length } детей.
                                    </span>   
                                    } 

                                </span>

                                { this.props.hotelParams.loadingHotel &&
                                    <span className="smSpinerContainer">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                }
                                { this.props.hotelParams.hotelsLength !== 0 && 
                                    <span style={{paddingLeft: 25}}> <strong>{ this.props.hotelParams.hotelsLength } {translate('options', this.props.language) }</strong></span>
                                }

                                </div>
                            </div> 
                        </div> 
                    </div>
                }                
                { this.props.hotelParams.hotelFormVisible &&
                <div className="searchFormHeader" style={{paddingTop: 33}}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <HotelInputAutocomplete />
                        </div>                                     
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                            <label htmlFor="date-from" className="searchFormLabel">Заезд</label> 
                            <HotelDtPicker placeholderText="Дата заезда" dateType="checkIn" />                  
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                        <label htmlFor="date-comback" className="searchFormLabel">Выезд</label>                       
                        <HotelDtPicker placeholderText="Дата выезда" dateType="checkOut" />                  
                        </div>   
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">
                            <HotelClassBox/> 
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
                                Найти отель
                            </button> 
                        </div>
                    </div>                
                </div>
                }
                {/* { this.props.hotelParams.loadingHotel && 
                    <div className="col-12" style={{paddingTop: 16, textAlign: "center", minHeight: 50}}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                } */}

                <div className="row" style={{marginTop: 10}}>                    
                    { this.props.hotelParams.hotelResultIsEmpty && 
                        <div className="col-12">
                            <div style={{textAlign: "center"}} className="alert alert-primary" role="alert">
                                Ничего на найдено. Попробуйте изменить даты
                            </div>
                        </div>                      
                    }
                    { this.props.hotelParams.errorHotelMessage && this.props.hotelParams.errorHotelMessage !=='' &&
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                               {this.props.hotelParams.errorHotelMessage}
                            </div>
                        </div>
                    }                      
                    
                    
                    <div className="col-md-3 col-lg-3 col-xl-3 d-none d-sm-none d-md-block" style={{paddingRight: 0}}>                    
                        { this.props.hotelParams.loadingHotel && this.props.hotelParams.hotelsLength === 0 
                           ?  <FilterSkeleton/>  
                           :  <HotelFilter/>
                        }
                    </div> 

                    { this.props.hotelParams.hotelsLength ===0 &&
                        <>
                        <div className="col-12 col-sm-12 d-md-none d-lg-none d-xs-none d-sm-block d-block" style={{margin: "7px 0 12px 0"}}>
                            <button 
                                className="btn btn-success" 
                                onClick={() => this.refs.modal.open() }
                                style={{width: "100%"}}
                            >
                            Фильтры
                            </button>    
                            <PureModal
                                header="Фильтры"                              
                                onClose={() => {                    
                                    return true;
                                }}               
                                ref="modal" 
                                width="350px"
                                >
                                <HotelFilter/>
                            </PureModal>
                        </div>                      
                        </>                        
                    }
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12">
                        <HotelSearchResult/>      
                    </div>
                </div>
            </div>            
        )
    }
}


const mapStateToProps = state => ({
    formData: state.data.hotelParams.formData, 
    hotelParams: state.data.hotelParams,
    language: state.UI.language
})

const mapDispatchToProps = {preHotelSearch, hotelToggleForm}

export default connect(mapStateToProps, mapDispatchToProps)(HotelContainer)
