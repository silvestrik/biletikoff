import React, { Component } from 'react'
import  PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
// modal
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { changeLanguageAndCurrency } from '../../redux/actions/uiActions'
//currency
import { getPrice } from '../../function/getPrice'
// format language name
import { formatLanguageName } from '../../function/formatData'
//translate
import { translate } from '../../function/translate'

class Header extends Component {

    state = {
        currency: this.props.currency,
        language: this.props.language
    } 

    componentDidMount() {
        if(localStorage.getItem('userCurrency')){
            let userCurrency = JSON.parse(localStorage.getItem('userCurrency'))            
            this.setState({
                currency: userCurrency
            })
            this.props.changeLanguageAndCurrency('userCurrency', userCurrency)
        } else {
            localStorage.setItem('userCurrency', JSON.stringify(this.props.currency))
        }        
        
        if(localStorage.getItem('userLanguage')){
            let userLanguage = JSON.parse(localStorage.getItem('userLanguage'))
            this.setState({
                language: userLanguage
            })            
        } else {
            localStorage.setItem('userLanguage', JSON.stringify(this.props.language))
        }
    }

    handlerChangeCurrency = event => {       
        const value = event.target.value
        this.props.changeLanguageAndCurrency('currency', value)
        this.setState({
            currency: value
        }) 
        localStorage.setItem('userCurrency', JSON.stringify(value)) 
    } 

    handlerChangeLanguage = event => {       
        const value = event.target.value
        this.props.changeLanguageAndCurrency('language', value)

        this.setState({
            language: value
        })
        localStorage.setItem('userLanguage', JSON.stringify(value))
    } 
    
    render() {             
        return (
            <div style={{paddingTop: 20}}> 
                <a  href="/" className="logo">
                    <span className="logo__name">
                        Biletikoff
                    </span>
                    <span className="logo__desc">
                        {translate('quick_flight_search', this.props.language) }                        
                    </span>
                </a>
                <div className="col-md-12" style={{display: "flex", justifyContent: "flex-end", top: 10}}> 
                    <button 
                        className="btn btn-success btn-sm"                                
                        onClick={() => this.refs.modal.open() }
                    >
                    {formatLanguageName(this.state.language)} <span className={'languageIcon c-'+this.state.language.toLowerCase()}></span> 
                    {getPrice(0, this.state.currency).replace('0', '')} {this.state.currency.toUpperCase()}
                    </button>                    
                    <PureModal                                    
                        onClose={()=> {
                            return true
                        }}
                        ref="modal"
                        width="300px"
                    >                     
                    <div className="form-group">
                        <label htmlFor="itemLanguage">Язык</label>
                        <select 
                            className="form-control" 
                            name="itemLanguage" 
                            value={this.state.language}
                            onChange={this.handlerChangeLanguage}                            
                        >
                            <option value="RU">Русский</option>
                            <option value="EN">English</option>                           
                        </select>
                    </div>
                    {this.props.currencies && 
                        <div className="form-group">
                            <label htmlFor="classPassanger">Валюта</label>
                            <select className="form-control" 
                                name="itemCurrency" 
                                value={this.state.currency}
                                onChange={this.handlerChangeCurrency} 
                                >
                                { this.props.currencies.map((item, index) => (
                                    <option key={index} value={item}>{getPrice(0, item).replace('0', '')} {item.toUpperCase()}</option>  
                                    )) 
                                }                                                                 
                            </select>
                        </div>
                    }                                       
                    </PureModal>
                    </div>
            </div>
        )
    }
}

Header.propTypes = {
    currency: PropTypes.string,    
    ticketsLength: PropTypes.number
}


const mapStateToProps = state => ({
    currency: state.UI.currency,
    language: state.UI.language,
    currencies: Object.keys(state.data.currencies),
    ticketsLength: state.data.ticketsLength
})  

const mapDispatchToProps = { changeLanguageAndCurrency }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
