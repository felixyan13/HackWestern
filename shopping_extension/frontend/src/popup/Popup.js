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
        Shopping Locally
        {this.state.category}

        <select value={this.state.category} onChange={this.handleSelect}>
          <option value="restaurant">Restaurants</option>
          <option value="retail">Retail</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button onClick={this.populateList}>Search</button>
        
        {
          this.state.data.map((item) => (<div>
            <p>{item.storeName}</p>
            <p>Location: {item.location}</p>
            <p>Website:<a href={item.location}>{item.website}</a></p>
            <p>Distance: {item.distance}</p>
            <img className="shop-image" src={item.imageLink}/>
          </div>))
        }
      </div>
    );
  }
}

export default Popup;
