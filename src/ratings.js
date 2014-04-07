/** @jsx React.DOM */

var Stars = React.createClass({
    render: function(){
        var i, clickHandler, icons = [], options = [], me = this;
        var max = this.props.labels.length;
        var star = function(is_full){
            return <i className={'fa fa-star' + (is_full ? '' : '-o')}></i>;
        }
        for(i=1; i<=5; ++i){
            clickHandler = this.props.handleRating.bind(null, i);
            icons.push(
                <li onClick={ clickHandler }>{ star(this.props.rating && this.props.rating >= i) }</li>
            );
        }
        for(i=0; i<this.props.labels.length; ++i){
            options.push(<option value={ max - i }>{ this.props.labels[max - i - 1] }</option>);
        }
        var changeHandler = function(e){
            me.props.handleRating(e.target.value);
        };
        return (
            <div>
                <ul className="stars">{ icons }</ul>
                <p className="rating-label">{ this.props.rating && this.props.labels[this.props.rating - 1] }</p>
                <select name={ this.props.name + '-rating' } className="form-control hidden" onChange={ changeHandler } value={ this.props.rating }>{ options }</select>
            </div>
        );
    }
});

var RatingBox = React.createClass({
    getInitialState: function(){
        return {
            rating: undefined,
        };
    },
    handleRatingChange: function(rating){
        if( !this.props.readonly ){
            this.setState({rating: rating});
        }
    },
    render: function(){
        return (
            <div className="rating">
                <Stars name={ this.props.name } rating={ this.state.rating } labels={ this.props.labels } handleRating={ this.handleRatingChange }/>
            </div>
        );
    }
});
