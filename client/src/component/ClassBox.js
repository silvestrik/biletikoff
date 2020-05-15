import React, { Component } from 'react'
import { setPassData } from '../redux/actions/dataActions'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

class ClassBox extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            passMenu: {
                dropdown: 'dropdown',
                dropdownMenu: 'dropdown-menu'
            },
            menuStatus: false,        
            tripClass: 'Y',
            disableAdultsPlus: false, 
            disableAdultsMinus: false,
            disableChildPlus: false,
            disableChildMinus: false,
            disableBabyPlus: false,
            disableBabyMinus: false
        }        
    }

    componentDidMount(){       
        if(localStorage.hasOwnProperty('passData')){
            let passData = localStorage.getItem('passData')
            let passDataObj = JSON.parse(passData)
            this.props.setPassData('tripClass', passDataObj.tripClass)
            this.props.setPassData('adults', passDataObj.adults)
            this.props.setPassData('baby', passDataObj.baby)
            this.props.setPassData('child', passDataObj.child)                  
        }        
    }

    // меню с пассажирами
    menuHandler = event => {       
        if(this.state.menuStatus === false){
            this.setState({
                menuStatus: true,
                passMenu: {
                    dropdown: 'dropdown show',
                    dropdownMenu: 'dropdown-menu show'
                }
            })            
        } else {
            this.setState({
                menuStatus: false,
                passMenu: {
                    dropdown: 'dropdown',
                    dropdownMenu: 'dropdown-menu'        
                }
            })            
        }
    }

    // закрыть меню с классом и составом пассажиров (по крестику)
    passMenuClick = event => {
        this.setState({
            menuStatus: false
        })
        this.setState({
            passMenu: {
                dropdown: 'dropdown',
                dropdownMenu: 'dropdown-menu'
            }
        })        
    } 

    //расшифровка класса    
    classText = (data) => {
        if(data==='Y'){
            return "эконом"
        } else {
            return "бизнес"
        }
    } 

    //+- button
    handlerCounter = (e, name, value) => {             
        e.preventDefault()        
        if(name==='adults-minus') {               
            this.props.setPassData('adults', value)
        } else if(name==='adults-plus') {           
            this.props.setPassData('adults', value)            
        } else if(name==='child-minus') {           
            this.props.setPassData('child', this.props.passData.child-1)
        } else if(name==='child-plus') {           
            this.props.setPassData('child', this.props.passData.child+1)
        } else if(name==='baby-minus') {           
            this.props.setPassData('baby', this.props.passData.baby-1)    
        } else if(name==='baby-plus') {           
            this.props.setPassData('baby', this.props.passData.baby+1)
        }
    }

    // changeClass
    changeHandler = event => {         
        this.setState({
            [event.target.name]: event.target.value 
        }) 
        this.props.setPassData(event.target.name, event.target.value)
    }

    render() {       
        return (
            <div className="form-group">
            <label htmlFor="class_pass" style={{color: "#fff"}}>Класс и пассажиры</label>
            <div className={this.state.passMenu.dropdown}>
                <button 
                    className="btn btn-secondary dropdown-toggle" 
                    type="button" id="dropdownMenuButton" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                    onClick={this.menuHandler}
                    style={{width: "100%", color: "#6c757d", background: "#fff", textAlign: "left", borderRadius: "0px !important"}}
                >
                {parseInt(this.props.passData.adults) + parseInt(this.props.passData.child) + parseInt(this.props.passData.baby)} пасс., {this.classText(this.state.tripClass)}
                </button> 
                <div className={this.state.passMenu.dropdownMenu} aria-labelledby="dropdownMenuButton"> 
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="alert" 
                        aria-label="Close"
                        style={{color: "#02122c"}}
                        onClick={this.passMenuClick}
                        >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="form-group">
                        <p style={{margin: "0 0 9px 0", fontWeight: "600"}}>Класс</p>
                        <select 
                            className="form-control"                            
                            name="tripClass" 
                            defaultValue={this.state.tripClass}
                            onChange={this.changeHandler}>
                            <option value="Y">Эконом</option>
                            <option value="C">Бизнес</option>                                            
                        </select>
                    </div>
                    <div className="counter-wrapper">    
                        <p className="counter-button-block-name">Взрослые </p>
                        <div className="counter-block">                       
                        <button 
                            disabled={ this.props.passData.adults <=1 ? true : false } 
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'adults-minus', this.props.passData.adults-1)}
                        >
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        -
                                    </div>
                                </div>
                        </button>
                        <div className="counter-value">
                                {this.props.passData.adults}
                        </div>
                        <button 
                            disabled={ this.props.passData.adults >=7 ? true : false } 
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'adults-plus', this.props.passData.adults+1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        +
                                    </div>
                                </div>
                        </button>
                        </div>   
                    </div>
                    <div className="counter-wrapper" style={{marginTop: 5}}>
                        <p className="counter-button-block-name">Дети <span className="counter-value-name">2-11</span></p>
                        <div className="counter-block">                    
                        <button 
                            disabled={ this.props.passData.child <=0 ? true : false }
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'child-minus', this.props.passData.child-1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        -
                                    </div>
                                </div>
                        </button>
                        <div className="counter-value">
                                {this.props.passData.child}
                        </div>
                        <button 
                            disabled={ this.props.passData.child >=7 ? true : false }
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'child-plus', this.props.passData.child+1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        +
                                    </div>
                                </div>
                        </button>
                        </div>
                    </div> 
                    <div className="counter-wrapper" style={{marginTop: 5}}>
                        <p className="counter-button-block-name">Младенцы <span className="counter-value-name">0-2</span></p>               
                        <div className="counter-block">                        
                        <button 
                            disabled={ this.props.passData.baby <=0 ? true : false }
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'baby-minus', this.props.passData.baby-1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        -
                                    </div>
                                </div>
                        </button>
                        <div className="counter-value">
                                {this.props.passData.baby}
                        </div>
                        <button 
                            disabled={ this.props.passData.baby >=7 ? true : false }
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'baby-plus', this.props.passData.baby+1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        +
                                    </div>
                                </div>
                        </button>
                        </div> 
                    </div>
                </div>                            
            </div>
        </div>
        )
    }
}

ClassBox.propTypes = {
    setPassData: propTypes.func.isRequired
}

const mapStateToPops = state => ({
    UI: state.UI,
    passData: state.data.passData
})

const mapDispatchToProps = { setPassData }

export default connect(mapStateToPops, mapDispatchToProps)(ClassBox)
