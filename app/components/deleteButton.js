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
  handleDelete(e) {
  	console.log("delete!");
  }
  render() {
    return(
      <div>
	    <RaisedButton
	      label="delete selected items"
	      linkButton={false}
	      onClick={ (e) => this.handleDelete(e) }
	      style={styles.button}
	      icon={<FontIcon className="material-icons">delete</FontIcon>}
	      backgroundColor={grey100}
	    />
      </div>
    );
  }
};

export default DeleteButton;