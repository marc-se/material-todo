import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoList from './components/todoList';
import TodoInput from './components/todoInput';
import DeleteButton from './components/deleteButton';
import hash from 'object-hash';
//var hash = require('object-hash');

var storage = localStorage;

// var item1 = {key: 0, text: "Wäsche waschen", subtext: "aber noch heute", newItem: true, checked: false};
// var item2 = {key: 1, text: "Irgendwas neues lernen", subtext: "morgen gleich", newItem: true, checked: false};
// var item3 = {key: 2, text: "Hoffentlich klappt das alles", subtext: "juhu!", newItem: true, checked: false};

// storage.setItem(hash(item1), JSON.stringify(item1));
// storage.setItem(hash(item2), JSON.stringify(item2));
// storage.setItem(hash(item3), JSON.stringify(item3));

var data = [],
	fuzzySearch = [''];

//storage.clear();

class App extends React.Component {
    constructor() {
        super();

        var injectTapEventPlugin = require("react-tap-event-plugin");
		injectTapEventPlugin();

		for (let item in storage) {
			if (item !== "FUZZY_SEARCH") {
				data.push(JSON.parse(storage.getItem(item)));
			} 
		}

		if (storage.getItem('FUZZY_SEARCH') !== null) {
			let fuzzy_storage = storage.getItem('FUZZY_SEARCH').split(',');

			for (let item of fuzzy_storage) {
				if (item != "") {
					fuzzySearch.push(item);
				}
			}

			storage.setItem('FUZZY_SEARCH', fuzzySearch);
		} else {
			storage.setItem('FUZZY_SEARCH', fuzzySearch);
		}

        if(typeof(Storage) !== "undefined") {
            this.state = {
                data: data,
                fuzzySearch: fuzzySearch
            };
        } else {
            // if browser doesn´t know about localStorage
        }
    }
    syncStorage(local_storage, tmp_data_storage, fuzzy_storage) {
		for (let item in local_storage) {
			if (item !== "FUZZY_SEARCH") {
				tmp_data_storage.push(local_storage.getItem(item));
			} else if (fuzzy_storage !== 'undefined'){
				// fuzzy_storage = storage.getItem('FUZZY_SEARCH').split(',');
				storage.setItem('FUZZY_SEARCH', fuzzy_storage);

				for (let item of fuzzy_storage) {
					fuzzySearch.push(item);
				}
			}
		}
    }
    addItem(e) {
    	// todo: function that seperates text from subtext (indicate subtext via "#")
    	let textArr = e;

    	let item = {
    			key: hash(e),
    			text: textArr.indexOf('#') == -1 ? e : (textArr.split('#'))[0].trim(),
    			subtext: textArr.indexOf('#') == -1 ? "" : (textArr.split('#'))[1].trim(),
    			checked: false
    		};

    	var updateData = [];
    	var updateFuzzySearch = [];

    	storage.setItem(item.key, JSON.stringify(item));

    	// update FUZZY_SEARCH storage
    	updateFuzzySearch = storage.getItem('FUZZY_SEARCH').split(',');

    	// add new item and avoid duplicate entries
    	updateFuzzySearch.push(e);
		updateFuzzySearch = updateFuzzySearch.filter(function(item, pos) {
		    return updateFuzzySearch.indexOf(item) == pos;
		});

    	// autocomplete field holds max 11 items minus dummy element ''
    	if (updateFuzzySearch.length > 11) {
			updateFuzzySearch.splice(1,1);
		}

    	// update localstorage and FUZZY_SEARCH storage
		this.syncStorage(storage, updateData, updateFuzzySearch);

		this.setState({data: updateData, fuzzySearch: updateFuzzySearch});
    }
    updateStatus(data, checked) {
    	var updateData = [];

    	for (let item of data) {
    		updateData.push(item);
    	}

    	this.setState({data: updateData});
    }
    render() {
		return (
			<div className='container'>
				<div className="col-md-2"></div>
		    	<div className="col-md-8">
					<MuiThemeProvider muiTheme={ getMuiTheme() } >
				    	<TodoList data={ this.state.data } storage={storage} updateStatus={ (data, checked) => this.updateStatus(this.state.data, checked)} />
				  	</MuiThemeProvider>
				  	<MuiThemeProvider muiTheme={ getMuiTheme() } >
				    	<TodoInput addItem={ (e) => this.addItem(e) } fuzzySearch={ this.state.fuzzySearch } />
				  	</MuiThemeProvider>
				  	<MuiThemeProvider muiTheme={ getMuiTheme() } >
				  		<div>TOOLBAR</div>
				  	</MuiThemeProvider>
			  	</div>
			  	<div className="col-md-2"></div>
		  	</div>
		);
    }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);