import React, { Component } from 'react'
import { setPassData } from '../redux/actions/dataActions'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

class ClassBox extends Component {

    state = {
        passMenu: {
            dropdown: 'dropdown',
            dropdownMenu: 'dropdown-menu'
        },
        menuStatus: false,
        form: {
            tripClass: 'Y',
            adults: 1,
            child: 0,
            baby: 0
        },
        passCount: [1, 2, 3, 4, 5, 6, 7] 
    }

    // меню с пассажирами
    menuHandler = event => {
        console.log(this.state.menuStatus)
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

    //состояние в редьюсер
    changeHandler = event => { 
        const fieldName = event.target.name
        const fieldValue = event.target.value 
        this.props.setPassData(fieldName, fieldValue)
    }

    render() {
        return (
            <div className="form-group">
            <label htmlFor="class_pass">Класс и пассажиры</label>                        
            <div className={this.state.passMenu.dropdown}>
                <button 
                    className="btn btn-secondary dropdown-toggle" 
                    type="button" id="dropdownMenuButton" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                    onClick={this.menuHandler}
                    style={{width: "100%", color: "#6c757d", background: "#fff"}}
                >
                {this.state.form.adults} пасс., {this.classText(this.state.form.tripClass)}
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
                        <label htmlFor="classPassanger">Класс</label>
                        <select className="form-control" id="tripClass" name="tripClass" onChange={this.changeHandler}>
                            <option value="Y">Эконом</option>
                            <option value="C">Бизнес</option>                                            
                        </select>
                    </div>                                
                    <div className="form-group">
                        <label htmlFor="adults">Взрослые</label>
                        <select className="form-control" id="adults" name="adults" onChange={this.changeHandler}>
                            { this.state.passCount.map((index, item) =><option key={index} value={item+1}>{item+1}</option>) }
                        </select>
                    </div> 
                    <div className="form-group">
                        <label htmlFor="child">Дети</label>
                        <select className="form-control" id="child" name="child" onChange={this.changeHandler}>
                            { this.state.passCount.map((index, item) =><option key={index} value={item}>{item}</option>) }
                        </select>
                    </div> 
                    <div className="form-group">
                        <label htmlFor="baby">Младенцы</label>
                        <select className="form-control" id="baby" name="baby" onChange={this.changeHandler}>
                            { this.state.passCount.map((index, item) =><option key={index} value={item}>{item}</option>) }
                        </select>
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
    UI: state.UI
})

const mapDispatchToProps = { setPassData }


export default connect(mapStateToPops, mapDispatchToProps)(ClassBox)
