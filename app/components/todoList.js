import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const checkbox_status = {
  strike: {
  	textDecoration: 'line-through',
  	color: '#cbcbcb'
  },
  none: {
  	textDecoration: 'none'
  }
};

class TodoList extends React.Component {
  itemStatus(e, checked) {

  	if (checked) {
  		e.checked = true;
  	} else {
  		e.checked = false;
  	}

  	this.props.storage.setItem(e.key, JSON.stringify(e));
  	this.props.updateStatus(this.props.data);
  }
  render() {
	var items = this.props.data.map( (item) => {
		
		// parse localstorage item and convert string back to JSON
		//let todo = JSON.parse(item);

		console.log(item.checked);

		return (
			<ListItem
			    leftCheckbox={<Checkbox defaultChecked={item.checked} onCheck={ (e, checked) => this.itemStatus(item, checked) } />}
			    primaryText={item.text}
			    secondaryText={item.subtext}
			    key={item.key}
			    style={ item.checked ? checkbox_status.strike : checkbox_status.none }
		    />
	    );
	});

	return (
		<div className='container'>
		      <List>
		      	{items}
		      </List>
		 </div>
		);
	}
};

export default TodoList;