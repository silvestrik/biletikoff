import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeFilters, filterChangeArrDepTime } from '../../redux/actions/dataActions'

class Checkbox extends Component {

    constructor(props) {
        super(props)
        this.state = {         
            allChecked: true,           
            limit: 5,            
            BtnStyle: {display: 'block', marginTop: '10px'}
        }
    }

    //показать все
    showAll = () => {
        this.setState({
            limit: 15,
            BtnStyle: {display: 'none', marginTop: '10px'}
        })
    }  

    checkBoxHandler = (e, name, onlyChecked)  => {
        e.stopPropagation()
        this.setState({ allChecked: false })
        this.props.changeFilters(name, onlyChecked)
    }
   
    // выбор всех
    allCheckBoxHandler = (e, name)  => {          
        console.log('allCheckBoxHandler', name )  
        const onlyChecked = 'all'      
        this.props.changeFilters(name, onlyChecked)       
        this.setState({
            allChecked: !this.state.allChecked,
            onlyChecked: false
       })
    }

    render() {         
        return (
            <div className="sidebar_block">
                <h4>{this.props.checkBoxTitle}</h4> 
                <div 
                    className="custom_checkbox"                   
                    onClick={ e=> this.allCheckBoxHandler (e, this.props.checkBoxPrefix + '_all')} 
                >
                    <input type="checkbox" checked={this.state.allChecked} onChange={e => {}}/>
                    <label 
                        className="g-text-overflow" 
                        htmlFor={this.props.checkBoxPrefix + '_all'}
                        >
                        Все
                    </label>
                </div>
                { this.props.data.slice(0, this.state.limit).map((item, index)=> ( 
                        <div                           
                            className="custom_checkbox" 
                            key={index}                         
                            onClick = { e => this.checkBoxHandler(e, this.props.checkBoxPrefix +'_' + item.value, false)}                                                    
                        >
                        <input type="checkbox" checked={item.status} onChange={e => {}}/>                        
                        <label className="g-text-overflow" htmlFor={this.props.checkBoxPrefix +'_' + item.value}>
                                { this.props.subData 
                                ? this.props.filters.arrayAirlinesName[index]                                        
                                : this.props.handler(item.value)}
                        </label>                        
                        <div 
                            className="only-text"                           
                            onClick = { e => this.checkBoxHandler(e, this.props.checkBoxPrefix +'_' + item.value, true)}      
                        >
                            только
                        </div>                        
                        <div>
                            { index === 4 && 
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm"
                                    onClick={this.showAll}
                                    style={this.state.BtnStyle}
                                >
                                    Показать все
                                </button> 
                            }
                        </div>


                    </div>
                    ))                                
                }
            </div>
        )
    }
}

Checkbox.propTypes = {
    filters: PropTypes.object,
    filterBuild: PropTypes.func,
    changeFilters: PropTypes.func,
    filterChangeArrDepTime: PropTypes.func   
}

const mapStateToProps = state => ({
    filters: state.data.filters,
    oneway: state.UI.oneway,
    tickets: state.data.tickets,
    combackDate: state.data.simpleFormParams.segments.combackDate
})


const mapDispatchToProps = {changeFilters, filterChangeArrDepTime}
export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)
