import React from 'react'

const CompositeForm = () => {
    return (
        <div>
            
            
            
            <div className="row" style={{marginTop: 20, flexWrap: "inherit" }}>
                <div className="col-4">
                    <label htmlFor="from" className="searchFormLabel">Откуда</label>
                    <input type="text" name="from" className="form-control" placeholder="Город вылета"/>               
                </div>
                <div className="col-4">
                    <label htmlFor="to" className="searchFormLabel">Куда</label>
                    <input type="text" name="to" className="form-control" placeholder="Город прибытия"/>                
                </div>
                <div className="col-3">
                    <label htmlFor="date-from" className="searchFormLabel">Дата</label>
                    <input type="text" name="date-from" className="form-control" placeholder="Дата вылета"/> 
                </div>
                <div className="col-1" style={{paddingTop: 40}}>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            






            <div className="row" style={{marginTop: 20}}>
                <div className="col-sm-4">
                    <button type="button" className="btn btn-secondary" style={{width: "100%"}}>Добавить перелет</button>  
                </div>                    
            </div>   
            <div className="row" style={{marginTop: 20}}>
                <div className="col-sm-4">
                    <div className="form-group">
                            <label htmlFor="class_pass">Класс и пассажиры</label>
                            <select className="form-control" id="class_pass">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div> 
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <button type="button" className="btn btn-info" style={{width: "100%", marginTop: 35}}>Найти билеты</button>     
                </div>
            </div>         
        </div>
    )
}

export default CompositeForm
