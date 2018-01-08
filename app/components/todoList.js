import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const checkbox_status = {
	strike: {
		textDecoration: 'line-through',
		color: '#cbcbcb',
	},
	none: {
		textDecoration: 'none',
	},
};

class TodoList extends React.Component {
	itemStatus(item) {
		item.checked = !item.checked;

		this.props.storage.setItem(item.key, JSON.stringify(item));
		this.props.updateStatus(this.props.data);
	}
	render() {
		let items = this.props.data.map((item, i) => {
			console.log(item);
			return item &&
				<ListItem
					leftCheckbox={<Checkbox defaultChecked={item.checked} onCheck={e => this.itemStatus(item)} />}
					primaryText={item.text}
					secondaryText={item.subtext}
					key={i}
					style={item.checked ? checkbox_status.strike : checkbox_status.none}
				/>;
		});

		return (
			<div>
				<List>
					{items}
				</List>
			</div>
		);
	}
}

export default TodoList;
