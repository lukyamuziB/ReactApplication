import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateCategory from './categories/createCategory'
import * as category from '../../actions/categoryCreation'
import { Link } from 'react-router-dom';


class FirstDisplay extends React.Component{
    constructor(props){
        super(props)
        this.props.actions.ViewCategory(1);
        this.state = {
            page: 1
        }
        this.reload
        
    }
    nextPage = (e) => {
        e.preventDefault()
        if  (this.props.has_next === true) {
            this.props.actions.ViewCategory(this.props.nextPage.substr(this.props.nextPage.length - 1))
        }else{
            this.props.actions.ViewCategory(Number(this.props.previousPage.substr(this.props.previousPage.length-1)) + 1)
        }
    }
    previousPage = (e) => {
        e.preventDefault()
        if (this.props.has_prev === true){
            this.props.actions.ViewCategory(this.props.previousPage.substr(this.props.previousPage.length - 1))
        }else{
            this.props.actions.ViewCategory(this.state.page)
        }
    }
    render(){
        const {category , has_next, has_prev} = this.props;      
        return(
        <div>
            <nav className="navbar navbar-light " id="navCat">
                <form className="form-inline">
                    <input  id="CategorySearch"className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button id="CategorySearchBut" className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
                <Link to='/createcategory'>   
            <button type="button" id="addcategory" className="btn btn-outline-primary">
                Add Category
            </button>
            </Link>
            </nav>
            <div class="container">
            <div class="row">
                {category && has_next === false ?
                    <div id="paginateCat">
                        <button onClick={this.previousPage
                        } id="previousButton"type="button" className="btn btn-light">Previous</button>
                    </div>
                        : <div> </div>
                }
                    { category && has_next !== false ?
                    <div id="paginateCat">
                        <button onClick={this.previousPage
                        } id="previousButton"type="button" className="btn btn-light">Previous</button>
                        <button onClick={this.nextPage}
                        id="nextButton" type="button" className="btn btn-light">Next</button>
                    </div>
                        : <div> </div>
                    }
                    {category && category.length > 0 ? 
                    category.map((item) => 
                    <div key={item.category_id}>
                    <div className="col-sm card" id="categoryCard">
                        <img className="card-img-top" src={"https://images.unsplash.com/photo-1473269712320-f24ce5aa6e5d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c430457ffc05dd273db3a437b0b20b97&auto=format&fit=crop&w=1951&q=80"} alt="Card image cap"/>
                        <div className="card-body" id="cardBodyCat">
                            <h5 className="card-title">{item.category_name}</h5>       
                    <button  type="button"  id="categorybutton"className="btn btn-outline-primary"> 
                    <Link id="link" to={`/${item.category_name}/${item.category_id}/recipies`}>
                    More Details...
                    </Link>
                    </button>

                        </div>
                    </div>
                        </div>)

                        : <div id ="nocategory" className="alert alert-primary" role="alert">
                        No Categories
                        </div>}
                        
            </div>
            </div>
            
            </div>
        );
    }
}
function mapStateToProps (state, ownProps){
    return {
        category: state.categories.categories,
        has_next: state.categories.has_next,
        has_prev: state.categories.has_prev,
        nextPage: state.categories.next_page,
        previousPage: state.categories.previous_page
    };
}
function mapDispatchToProps (dispatch) {
    return{
        actions: bindActionCreators(category, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (FirstDisplay);