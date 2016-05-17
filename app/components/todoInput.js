import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/AutoComplete';

class TodoInput extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
    };
  }
  handleUpdate(e) {
    this.setState({inputText: e});
  }
  handleSubmit(e, i) {
    if ( i == -1 ) {
      let item = e.trim();

      if (item !== '') {
        this.props.addItem(item);
      } else {
        return null;
      }

      // necessary because of not clearing textfield when input is selected from autocomplete list
      // seems like onUpdateInput has a slight delay
      // setTimeout( () => this.setState({inputText: ''}), 350);
      this.setState({inputText: ''});
    }
  }
  render() {
    return(
      <AutoComplete
        floatingLabelText="what should I add?"
        filter={ AutoComplete.fuzzyFilter }
        dataSource={ this.props.fuzzySearch }
        maxSearchResults={ 5 }
        fullWidth={ true }
        searchText={ this.state.inputText }
        onUpdateInput={ (e) => this.handleUpdate(e) }
        onNewRequest={ (e, i) => this.handleSubmit(e, i) }
        menuCloseDelay={ 0 }
      />
    );
  }
};

export default TodoInput;