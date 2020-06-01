import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { autocompleteOrigin, autocompleteDestination } from '../../redux/actions/dataActions' 
import { getAutocomplete } from '../../function/autocomplete'

class InputAutocomplete extends Component {

    constructor(props) {
        super(props)       
        this.state = {      
            cityData: [],
            city: this.props.city,
            iata: this.props.iata,
            label: this.props.label,
            placeholder: this.props.placeholder,
            cityType: this.props.cityType,          
            activeCity: 0,         
            showCityList: false,
            userInput: this.props.city
        }
        this.cityInput = React.createRef() 
    }   

    componentDidMount() {
        if(this.props.cityType === 'origin') {
            this.cityInput.current.focus()
        }       
    }
  
    // выбор всего в поле    
    handleFocus = (event) => event.target.select()  

    onChange = e => {
        const userInput = e.target.value
        this.setState({
            userInput: userInput
        })
        if(userInput.length>1) {
            getAutocomplete(userInput)
            .then( response => {              
                this.setState({
                    activeCity: 0,                  
                    showCityList: true,
                    userInput,
                    cityData: response.data
                })               
            })            
            .catch(error=> {
                console.error(error)
            })
        }        
    }    

    onClick = (event, cityTitle, cityData) => {         
        this.setState({
            city: cityTitle,
            activeCity: 0, 
            showCityList: false,
            userInput: cityTitle
        })
        if(this.props.cityType === 'origin') {          
            this.props.autocompleteOrigin(JSON.parse(`${cityData}`)) 
        } else if(this.props.cityType === 'destination') {           
            this.props.autocompleteDestination(JSON.parse(`${cityData}`))
        }    
    }

    onKeyDown = e => {
        const { activeCity, cityData } = this.state        
        if (e.keyCode === 13) { 
                if(cityData[activeCity]) {
                    const cityTitle = cityData[activeCity].name               
                    this.setState({
                        activeCity: 0,
                        showCityList: false,
                        userInput: cityTitle,
                        city: cityTitle,
                    })
                    if(this.props.cityType === 'origin') {          
                        this.props.autocompleteOrigin(cityData[activeCity]) 
                    } else if(this.props.cityType === 'destination') {           
                        this.props.autocompleteDestination(cityData[activeCity])
                    } 
                }
          } else if (e.keyCode === 38) {               
                    if (activeCity === 0) {
                    return
                }      
                this.setState({ activeCity: activeCity - 1 })
          }  else if (e.keyCode === 40) {                
                    if (activeCity - 1 === cityData.length) {
                    return
                }      
                this.setState({ activeCity: activeCity + 1 })
          }
    }

    render() {
        
        const { 
            onChange, onClick, onKeyDown,
            state: {
                userInput, showCityList, activeCity
            }
         } = this

        let cityListComponent;

        if(this.state.cityData && this.state.cityData.length>0 && showCityList) {
            cityListComponent = (
                <ul className="cityList" >
                {    // eslint-disable-next-line    
                    this.state.cityData.map((item, index) => { 
                        if(index <= 4) {
                            let className

                            if (index === activeCity) {
                                className = "cityList-active";
                            }
                  
                            return (                                  
                                <li className={className}
                                    key = {index}                                   
                                    name = {item.name}
                                    value = {JSON.stringify(item)}
                                    onClick = {e => onClick(e, item.name, JSON.stringify(item))} 
                                >
                                <span className="autocompleteCity">{item.name}</span> ({item.code}) <br/>
                                <span className="autocompleteCountry">{item.country_name}</span>
                                </li>
                            )   
                        } 
                    })                                    
                }
                </ul>
            )
        }                             
      
        return (
            <>  
            <label htmlFor="city" className="searchFormLabel">{this.state.label}</label>
            <input
                className="form-control" 
                autoComplete="off"
                placeholder={this.state.placeholder}
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={this.handleFocus}
                value={userInput}
                ref={this.cityInput}                
            />
            {cityListComponent}
            </>
        )
    }
}

InputAutocomplete.propTypes = {   
    autocompleteOrigin: propTypes.func.isRequired,
    autocompleteDestination: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    UI: state.UI
})

const mapDispatchToProps = { autocompleteOrigin, autocompleteDestination }
export default connect(mapStateToProps, mapDispatchToProps)(InputAutocomplete)
