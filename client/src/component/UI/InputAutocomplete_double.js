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
            cityBlock:  {display: "none"},
            loading: false,
            city: this.props.city,
            iata: this.props.iata,
            label: this.props.label,
            placeholder: this.props.placeholder,
            cityType: this.props.cityType
        }        
        this.cityInput = React.createRef()     
        this.listRefs = []  
    }   
    
    // 1. фокус на первом input
    componentDidMount() {
        if(this.props.cityType === 'origin') {
            this.cityInput.current.focus()
        }       
    }

    // 2. выбор всего в поле    
    handleFocus = (event) => event.target.select()

    // 3. очистка поля при  нажатии backspace 
    handleInputKeyDown = event => {        
        if(event.keyCode === 8) {
            console.log('8')
            this.setState({              
                city: '',
                iata: ''                   
            })  
            if(this.props.cityType === 'origin') {          
                this.props.autocompleteOrigin('') 
            } else if(this.props.cityType === 'destination') {           
                this.props.autocompleteDestination('')
            }
            // tab on input box 
        } else if (event.keyCode === 40) {
            if(this.state.cityData.length >0 ) {
                console.log(this.listRefs[0])
                this.listRefs[0] && this.listRefs[0].focus()
            }
            
        }
    } 
    
    // 4. Вывод списка городов
    handleChange = event => {
        const term = event.target.value 
        
        if(term.trim() === '') {                  
            this.setState({
                cityData: [],
                cityBlock: {display: "none"},
                city: '',
                iata: ''                   
            })          
        } else {
            this.setState({
                city: term
            })
            if(term.length>1) {
                getAutocomplete(term)
                .then( response => {
                    this.setState({
                        cityBlock: {display: "block", zIndex: "100"},
                        cityData: response.data
                    })                    
                })
                .catch(error=> {
                    console.error(error)
                })
            }
            
        }
    }

    // 5. Фиксируем город
    handlerClickCity = (event, cityTitle, cityData) => { 
        this.setState({
            city: cityTitle,            
            cityBlock: {display: "none"}
        })
        if(this.props.cityType === 'origin') {          
            this.props.autocompleteOrigin(JSON.parse(`${cityData}`)) 
        } else if(this.props.cityType === 'destination') {           
            this.props.autocompleteDestination(JSON.parse(`${cityData}`))
        }    
    }    

    // 6. Перемещение по списку
    handleListKeyDown = event => {
        // up arrow 
        if(event.keyCode === 38){
            console.log('up')
        // down arrow    
        } else if(event.keyCode === 40) {
            console.log('down')
        // enter    
        } else if (event.keyCode === 13) {
            console.log('enter')
        }
    }


   

       

    render() { 
        return (
            <>
                <label htmlFor="city" className="searchFormLabel">{this.state.label}</label>
                <input 
                    type="text"                        
                    className="form-control" 
                    autoComplete="off"
                    placeholder={this.state.placeholder}                      
                    value={this.state.city}
                    ref={this.cityInput}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleInputKeyDown}
                />
                <div className="card" style={this.state.cityBlock}>
                    <div className="cardBody">
                        <ul style={{padding: 0}} >
                            { this.state.cityData && this.state.cityData.length>0 &&                                     
                                // eslint-disable-next-line
                                this.state.cityData.map((item, index) => {                                                                      
                                    if(index <= 4) {
                                        return (                                  
                                            <li className="autoCompleteLi" 
                                                key = {index}
                                                name = {item.name}
                                                value = {JSON.stringify(item)}
                                                onClick = {e => this.handlerClickCity(e, item.name, JSON.stringify(item))}
                                                ref={ ref => this.listRefs[index] = ref}
                                                //id={index}
                                                onKeyDown={this.handleListKeyDown}                                              
                                            >
                                        <span className="autocompleteCity">{item.name}</span> ({item.code}) <br/>
                                        <span className="autocompleteCountry">{item.country_name}</span>
                                        </li>
                                        )
                                    }
                                })                                    
                            }
                        </ul> 
                    </div>
                </div>
                <input 
                    type="hidden"  
                    id={this.props.cityType}                       
                    className="form-control" 
                    value={this.state.iata}                      
                />                
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
