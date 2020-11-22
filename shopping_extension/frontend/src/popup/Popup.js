import React from 'react';
import './Popup.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'restaurant',
      data: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.populateList = this.populateList.bind(this);
  }

  handleSelect(event) {
    this.setState({category: event.target.value});
  }

  populateList() {
    fetch('http://localhost:8080/getByCategory?category=' + this.state.category)
      .then(response => response.json())
      .then(responseData => {
        this.setState({data: responseData});
      });    
  }

  render() {
    return(
      <div className="popup">
        <h1><b>Go Local</b></h1>
        <div>
          <select className="button" value={this.state.category} onChange={this.handleSelect}>
            <option value="restaurant">Restaurants</option>
            <option value="retail">Retail</option>
            <option value="entertainment">Entertainment</option>
            <option value="fitness">Fitness</option>
          </select>
          <button className="button" onClick={this.populateList}>Search</button>
        </div>

        <div className="shop-list">
          {
            this.state.data.map((item) => (
              <div className="shop-card">
                <img className="shop-image" src={item.imageLink}/>
                <div className="shop-info">
                  <h2><a className="shop-link" href={item.website} target='_blank'>{item.storeName}</a></h2>
                  <h4 className="shop-info-text">Location: {item.location}</h4>
                  <h4 className="shop-info-text">Distance: {item.distance}</h4>
                </div>
              </div>)
            )
          }
        </div>
      </div>
    );
  }
}

export default Popup;
