import React, { Component } from 'react'
import SimpleSearchForm from '../component/SimpleSearchForm'
import CompositeForm from '../component/CompositeForm'
import PropTypes from 'prop-types'
//redux
import { connect } from 'react-redux'
import { searchFormType } from '../redux/actions/uiActions'
import SearchResult from '../component/SearchResult'
import Filter from '../component/Filter'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
//convert Date
import { formatDateTopForm } from '../function/formatDate'
//переключение формы-табло
import { toggleForm } from '../redux/actions/dataActions'
import FilterSkeleton from '../component/FilterSkeleton'
//translate
import { translate } from '../function/translate'

class  Search extends Component {    
    constructor(props) {        
        super(props)
        this.state = {
            routeType: 'round',
            multiForm: false,
            oneway: false,
            proposalsLength: 0,
            loading: false,
            //
            allChecked: true            
        }        
        this.typeHandler = this.typeHandler.bind(this)        
    }  

    typeHandler = event => {      
        
        const type = event.target.value         
        this.props.searchFormType(type)
        
        if(type === 'composite' ) { 
           this.props = ({
                multiForm: true,
                oneway: false,
                routeType: 'composite'               
            })           
        } else if(type === 'oneway' ) { 
            this.props = ({
                multiForm: false,
                oneway: true,
                routeType: 'oneway'                
            })           
        } else if(type === 'round' ) { 
            this.props = ({
                multiForm: false,
                oneway: false,
                routeType: 'round'               
            })           
        }              
    }
    // видимость формы поиска
    handlerVisibleForm = e => {
        const data = !this.props.formVisible
        this.props.toggleForm(data)
    }
    render () {
        if(this.props.ticketsLength && this.props.ticketsLength > 0) {
            var divStyle = {marginTop: 40}
        }
        return (            
            <div className="col-md-12" style={{padding: "0 15px 0 15px", minHeight: 500 }}> 
                <div className="searchFormWrapper" style={divStyle}>                
                {this.props.infoboardVisible &&     
                    <div style={{width: "100%"}} onClick={this.handlerVisibleForm}>
                        <div className="searchFormTop">
                            <div className="col-md-12" style={{paddingLeft: 50}}> 
                                <div className="searchFormTopText">
                                <span>{ this.props.formData.origin ? this.props.formData.origin.name : '' }</span>
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
                                        } пасс.
                                    </span>
                                </span>
                                { this.props.loading && this.props.searchStatus === true &&
                                    <span className="smSpinerContainer">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </span>
                                }
                                { this.props.ticketsLength !== 0 && 
                                    <span style={{paddingLeft: 25}}> <strong>{ this.props.ticketsLength } {translate('options', this.props.language) }</strong></span>
                                }
                                </div>
                            </div> 
                        </div> 
                    </div>
                }   
                { this.props.formVisible &&
                    <form className="searchFormHeader" onChange={this.typeHandler} >                
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions"                         
                                value="round"                        
                                defaultChecked={this.props.routeType === 'round'}    
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">Туда-обратно</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions"                        
                                value="oneway"                        
                                defaultChecked={this.props.routeType === 'oneway'}                   
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">В одну сторону</label>
                        </div>
                        <div className="form-check form-check-inline" style={{display: 'none'}}>
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions"                         
                                value="composite"                           
                                defaultChecked={this.props.routeType === 'composite'}                     
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">Сложный маршрут</label>
                        </div>     
                        { this.props.multiForm ?  <CompositeForm/> :  <SimpleSearchForm props = {this.props.oneway} />}          
                    </form>                 
                }  
                </div>                 
                { this.props.loading && this.props.ticketsLength === 0 &&
                    <div className="col-12" style={{paddingTop: 16, textAlign: "center", minHeight: 50}}>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                <div className="row" style={{marginTop: 10}}>
                    { this.props.resultIsEmpty && 
                        <div className="col-12">
                            <div style={{textAlign: "center"}} className="alert alert-primary" role="alert">
                                Ничего на найдено. Попробуйте изменить даты
                            </div>
                        </div>                      
                    }
                    { this.props.errorMessage && this.props.errorMessage !=='' &&
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                               {this.props.errorMessage}
                            </div>
                        </div>
                    }                      
                    <div className="col-md-3 col-lg-3 col-xl-3 d-none d-sm-none d-md-block" style={{paddingRight: 0}}>
                        { this.props.loading === true &&  this.props.ticketsLength === 0 
                           ?  <FilterSkeleton/>  
                           :  <Filter/>
                        }
                    </div> 

                    { this.props.ticketsLength !==0 &&
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
                                <Filter/>
                            </PureModal>
                        </div>                      
                        </>                        
                    }
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12">
                        <SearchResult/>      
                    </div>
                </div>                
            </div>                        
        )
    }    
}

Search.propTypes = {   
    searchFormType: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    currencies: PropTypes.object,
    routeType: PropTypes.string.isRequired,
    multiForm: PropTypes.bool.isRequired,
    oneway: PropTypes.bool.isRequired,
    proposals: PropTypes.array,
    loading: PropTypes.bool,
    ticketsLength: PropTypes.number 
}

const mapStateToProps = state => ({
    currencies: state.data.currencies,        
    routeType: state.UI.routeType,
    multiForm: state.UI.multiForm,
    oneway: state.UI.oneway,
    proposals: state.data.proposals,
    loading: state.data.loading,
    resultIsEmpty: state.data.resultIsEmpty,
    errorMessage: state.data.errorMessage,
    ticketsLength: state.data.ticketsLength,
    scrollForm: state.data.scrollForm,
    formData: state.data.simpleFormParams.segments,
    passData: state.data.passData,
    infoboardVisible: state.data.infoboardVisible,
    formVisible: state.data.formVisible,
    searchStatus: state.data.searchStatus,
    language: state.UI.language
})

const mapDispatchToProps = {searchFormType, toggleForm}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
