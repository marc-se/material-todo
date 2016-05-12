import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class TodoInput extends React.Component {
  handleSubmit(e) {
    let item = e.trim();

    if (item !== "") {
      this.props.addItem(item);
    } else {
      return null;
    }
  }
  render() {

    return(
      <AutoComplete
        floatingLabelText="what should I add?"
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.props.fuzzySearch}
        maxSearchResults={5}
        fullWidth={true}
        onNewRequest={ (e) => this.handleSubmit(e) }
      />
    );
  }
};

export default TodoInput;