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

    handlerChange = event => {
        const name = event.target.name       
        const value = event.target.value
        this.props.changeLanguageAndCurrency(name, value)

        if(name==="itemLanguage") {
            this.setState({
                language: value
            })
            localStorage.setItem('userLanguage', JSON.stringify(value))
        } else {
            this.setState({
                currency: value
            }) 
            localStorage.setItem('userCurrency', JSON.stringify(value))           
        }
    } 
    
    render() { 
        return (
            <div> 
                <div className="col-md-12" style={{display: "flex", justifyContent: "flex-end", top: 10}}> 
                    <button 
                        className="btn btn-success btn-sm"                                
                        onClick={() => this.refs.modal.open() }
                    >
                    {formatLanguageName(this.props.language)} <span className={'languageIcon c-'+this.props.language.toLowerCase()}></span> 
                    {getPrice(0, this.props.currency).replace('0', '')} {this.props.currency.toUpperCase()}
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
                        onChange={this.handlerChange}
                        //defaultValue={this.props.currency}
                        >
                            <option value="RU">Русский</option>
                            <option value="EN">English</option>
                            <option value="DE">Deutsch</option>
                            <option value="ES">Español</option>                                            
                        </select>
                    </div> 
                    {this.props.currencies && this.props.ticketsLength >0 &&
                        <div className="form-group">
                            <label htmlFor="classPassanger">Валюта</label>
                            <select className="form-control" 
                            name="itemCurrency" 
                            onChange={this.handlerChange}
                            //defaultValue={this.state.language}
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
