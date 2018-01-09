import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import businessTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import HeaderBadge from './components/headerBadge';
import TodoList from './components/todoList';
import TodoInput from './components/todoInput';
import DeleteButton from './components/deleteButton';
import hash from 'object-hash';

const todoTheme = getMuiTheme(businessTheme);

var storage = localStorage;

let data = [], fuzzySearch = [ '' ];

//storage.clear();

class App extends React.Component {
	state = {
		data: [],
		fuzzySearch: [],
		oldState: { data: {}, lastKey: '' },
	};

	componentDidMount() {
		const injectTapEventPlugin = require('react-tap-event-plugin');
		injectTapEventPlugin();

		for (let item in storage) {
			if (item !== 'FUZZY_SEARCH') {
				let obj = JSON.parse(storage.getItem(item));
				obj && data.push(obj);
			}
		}

		if (storage.getItem('FUZZY_SEARCH') !== null) {
			let fuzzy_storage = storage.getItem('FUZZY_SEARCH').split(',');

			for (let item of fuzzy_storage) {
				if (item != '') {
					fuzzySearch.push(item);
				}
			}

			storage.setItem('FUZZY_SEARCH', fuzzySearch);
		} else {
			storage.setItem('FUZZY_SEARCH', fuzzySearch);
		}

		if (typeof Storage !== 'undefined') {
			this.setState({
				data: data,
				fuzzySearch: fuzzySearch,
				oldState: { data: {}, lastKey: '' },
			});
		} else {
			// if browser doesn´t know about localStorage
		}
	}

	syncStorage(local_storage, tmp_data_storage, fuzzy_storage) {
		for (let item in local_storage) {
			if (item !== 'FUZZY_SEARCH') {
				let obj = JSON.parse(local_storage.getItem(item));
				obj && tmp_data_storage.push(obj);
			} else if (fuzzy_storage !== 'undefined') {
				storage.setItem('FUZZY_SEARCH', fuzzy_storage);

				for (let item of fuzzy_storage) {
					fuzzySearch.push(item);
				}
			}
		}
	}
	addItem(e) {
		let oldState = this.state.data;

		let textArr = e;

		let item = {
			key: hash(e),
			text: textArr.indexOf('#') == -1 ? e : textArr.split('#')[0].trim(),
			subtext: textArr.indexOf('#') == -1 ? '' : textArr.split('#')[1].trim(),
			checked: false,
		};

		let updateData = [];
		let updateFuzzySearch = [];

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
			updateFuzzySearch.splice(1, 1);
		}

		// update localstorage and FUZZY_SEARCH storage
		this.syncStorage(storage, updateData, updateFuzzySearch);

		this.setState({
			data: updateData,
			fuzzySearch: updateFuzzySearch,
			oldState: { data: oldState, lastKey: item.key },
		});
	}
	updateStatus(data) {
		let updateData = [];

		for (let item of data) {
			updateData.push(item);
		}

		this.setState({ data: updateData });
	}
	render() {
		return (
			<div className="container">
				<div className="col-md-2" />
				<div className="col-md-8">
					<MuiThemeProvider muiTheme={todoTheme}>
						<div className="app-head">
							<HeaderBadge count={this.state.data.length} />
							<h1>Get it done!</h1>
							<h2>Hey, seems like you have something to do</h2>
						</div>
					</MuiThemeProvider>
					<MuiThemeProvider muiTheme={todoTheme}>
						<TodoList
							data={this.state.data}
							storage={storage}
							updateStatus={data => this.updateStatus(this.state.data)}
						/>
					</MuiThemeProvider>
					<MuiThemeProvider muiTheme={todoTheme}>
						<TodoInput addItem={e => this.addItem(e)} fuzzySearch={this.state.fuzzySearch} />
					</MuiThemeProvider>
					<MuiThemeProvider muiTheme={todoTheme}>
						<DeleteButton data={this.state.data} storage={storage} updateStatus={data => this.updateStatus(data)} />
					</MuiThemeProvider>
				</div>
				<div className="col-md-2" />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
