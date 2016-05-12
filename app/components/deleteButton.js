import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { grey100 } from 'material-ui/styles/colors';

const styles = {
  button: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 0,
    marginBottom: 12,
    float: 'right',
  },

};

class DeleteButton extends React.Component {
  handleDelete(data) {
  	console.log("delete!");
  	var updateData = [];

  	// deletes checked items and 
  	// returns array with all unchecked items
  	for (let item of data) {
  		if (!item.checked) {
  			updateData.push(item);
  		} else {
  			// update localstorage
  			this.props.storage.removeItem(item.key);
  		}
  	}

  	console.log("BEFORE UPDATE:", data);
  	console.log("AFTER UPDATE:", updateData);

  	this.props.updateStatus(updateData);
  }
  render() {
    return(
      <div>
	    <RaisedButton
	      label="delete selected items"
	      linkButton={false}
	      onClick={ (e) => this.handleDelete(this.props.data) }
	      style={styles.button}
	      icon={<FontIcon className="material-icons">delete</FontIcon>}
	      backgroundColor={grey100}
	    />
      </div>
    );
  }
};

export default DeleteButton;