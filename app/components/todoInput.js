import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from 'material-ui/Snackbar';
import AutoComplete from 'material-ui/AutoComplete';

class TodoInput extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      message: 'Item added to your ToDo List',
      open: false,
    };
    this.timer = undefined;
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

      this.handleSnackBarTrigger();
      this.setState({inputText: ''});
    }
  }
  componentWillUnMount() {
    clearTimeout(this.timer);
  }
  handleSnackBarTrigger() {
    this.setState({
      open: true,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  handleUndoAction() {
    this.props.handleUndo();
  }
  render() {
    return(
      <div>
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
        <Snackbar
          open={ this.state.open }
          message={ this.state.message }
          action="undo"
          onActionTouchTap={ () => this.handleUndoAction() }
          autoHideDuration={ 4000 }
          onRequestClose={ () => this.handleRequestClose() }
        />
      </div>
    );
  }
};

export default TodoInput;