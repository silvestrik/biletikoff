import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAdultData, setChildrenData } from '../../redux/actions/dataActions'

class HotelClassBox extends Component {

    constructor(props) {
        super(props)

        this.state = {
            passMenu: {
                dropdown: 'dropdown',
                dropdownMenu: 'dropdown-menu'
            },
            menuStatus: false,
            child: 0,
            children:[ 7, 7, 7 ]
        }
    }


    componentDidMount(){       
        if(localStorage.hasOwnProperty('hotelData')){
            let hotelData = localStorage.getItem('hotelData')
            let hotelDataObj = JSON.parse(hotelData)
            //console.log(hotelDataObj)
            this.props.setAdultData(hotelDataObj.adults)
            this.props.setChildrenData(hotelDataObj.children)
        }        
    }


    // меню с гостями
    menuHandler = () => {       
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

    //+- button, set adults age
    handlerCounter = (e, name, value) => { 
        //console.log(name)            
        e.preventDefault()        
        if(name==='adults-minus') { 
            this.props.setAdultData(value)
        } else  if(name==='adults-plus') { 
            this.props.setAdultData(value)
        } else if(name==='child-minus') {                   
            this.setState({
                child: value
            })
            this.props.setChildrenData(this.state.children.slice(0, this.state.child-1))
        } else if(name==='child-plus') {                   
            this.setState({
                child: value
            })
            this.props.setChildrenData(this.state.children.slice(0, this.state.child+1))
        }
    }    

    //set children ahe
    handlerAge = (e, index, item) => {
        //change state
        const newItems = [...this.state.children]        
        newItems[index] = item
        this.props.setChildrenData(newItems.slice(0, this.state.child))
        this.setState({ children:newItems })        
    }

    render() {
        //console.log(this.state.children.slice(0, this.state.child))
        return (
            <div className="form-group">
            <label htmlFor="class_pass" style={{color: "#fff"}}>Гости</label>
                <div className={this.state.passMenu.dropdown}>
                    <button 
                        className="btn btn-secondary dropdown-toggle" 
                        type="button" id="dropdownMenuButton" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                        onClick={this.menuHandler}
                        style={{width: "100%", color: "#6c757d", background: "#fff", textAlign: "left", borderRadius: "0px !important"}}
                    >
                    {this.props.hotelParams.adults + this.state.child } гостей
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
                   
                    <div className="counter-wrapper">    
                        <p className="counter-button-block-name">Взрослые </p>
                        <div className="counter-block">                       
                        <button 
                            disabled={ this.props.hotelParams.adults <=1 ? true : false } 
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'adults-minus', this.props.hotelParams.adults-1)}
                        >
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        -
                                    </div>
                                </div>
                        </button>
                        <div className="counter-value">
                                {this.props.hotelParams.adults}
                        </div>
                        <button 
                            disabled={ this.props.hotelParams.adults >=4 ? true : false } 
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'adults-plus', this.props.hotelParams.adults+1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        +
                                    </div>
                                </div>
                        </button>
                        </div>   
                    </div>

                    <div className="counter-wrapper">    
                        <p className="counter-button-block-name">Дети </p>
                        <div className="counter-block">                       
                        <button 
                            disabled={ this.state.child <=0 ? true : false } 
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'child-minus', this.state.child-1)}
                        >
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        -
                                    </div>
                                </div>
                        </button>
                        <div className="counter-value">
                                {this.state.child}
                        </div>
                        <button 
                            disabled={ this.state.child >=3 ? true : false } 
                            className="counter-button" 
                            onClick={e => this.handlerCounter(e, 'child-plus', this.state.child+1)}>
                                <div className="counter-button-text-container">
                                    <div className="counter-button-text-container-text">
                                        +
                                    </div>
                                </div>
                        </button>
                        </div>   
                    </div>
                    {
                        this.state.child> 0 && 
                        <div style={{paddingTop: 5, background: '#e8edf1', borderRadius: '0.25rem'}}>
                            <p className="counter-button-block-name">Возраст (1-17)</p>
                            {this.state.children.slice(0, this.state.child).map((item, index) => {
                                return (
                                    
                                    <div className="counter-block" key={index} style={{padding: 10}}>                       
                                        <button 
                                            disabled={ this.state.children[index] <=1 ? true : false } 
                                            className="counter-button"
                                            style={{background: '#fff'}} 
                                            onClick={e => this.handlerAge(e, index, item-1)}
                                        >
                                                <div className="counter-button-text-container">
                                                    <div className="counter-button-text-container-text">
                                                        -
                                                    </div>
                                                </div>
                                        </button>
                                        <div className="counter-value">
                                                {this.state.children[index]}
                                        </div>
                                        <button 
                                            disabled={ this.state.children[index] >=17 ? true : false } 
                                            className="counter-button" 
                                            style={{background: '#fff'}} 
                                            onClick={e => this.handlerAge(e, index, item+1)}
                                            >
                                                <div className="counter-button-text-container">
                                                    <div className="counter-button-text-container-text">
                                                        +
                                                    </div>
                                                </div>
                                        </button>
                                    </div>  



                                )
                            })}
                        </div>
                    }                    
                    </div>
                </div>            
            </div>
        )
    }
}

HotelClassBox.propTypes = {
    setAdultData: propTypes.func.isRequired,
    setChildrenData: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    hotelParams: state.data.hotelParams.formData
})

const mapDispatchToProps = { setAdultData, setChildrenData  }

export default connect(mapStateToProps, mapDispatchToProps)(HotelClassBox)
