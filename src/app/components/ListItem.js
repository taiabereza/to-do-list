import React from "react";
import './components.css';

export default function ListItem({ item, value, listItems, setListItems, setEditItem, setEditItemValue, editItemValue, editItem }) {
	const handleDeleteItem = () => {
		setListItems(listItems.filter(elem => elem.id !== item.id));
	}

	const handleDoneItem = () => {
		setListItems(
			listItems.map(elem => {
				if (elem.id === item.id) {
					return {
						...item,
						done: !elem.done,
					};
				}
				return elem;
			}))
	};

	const handleEditListItem = () => {
		setEditItem(item.id);
		setEditItemValue(item.text);
		
	}

	function handleSaveEditListItem(id) {
		const updatedListItems = [...listItems].map(elem => {
			if (elem.id === id) {
				elem.text = editItemValue;
			}
			return elem;
		})
		setListItems(updatedListItems);
		setEditItem(null);
		setEditItemValue('');
	}

	return (
		<div className="list-item-wrapper">
			{editItem === item.id ?
				(<input autoFocus
								className="list-item"
								type="text"
								onChange={(e) => { setEditItemValue(e.target.value) }}
								value={editItemValue}
								/>)
				: (<li className={`list-item ${item.done ? 'done' : ''}`}>
						{value}
					</li>)
			}

			{editItem === item.id ?
				(<button className="btn-save-edit"
					onClick={() => { handleSaveEditListItem(item.id) }}>
					&#128190;
				</button>)
				: (<button className="btn-edit"
					onClick={handleEditListItem}>
					&#128397;
				</button>)
			}

			<button className="btn-done"
				onClick={handleDoneItem}>
				&#10004;
			</button>
			<button className="btn-delete"
				onClick={handleDeleteItem}>
				&#10006;
			</button>
		</div>
	);
}