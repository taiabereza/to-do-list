import React from "react";
import './components.css';

export default function ListItem({ item, value, listItems, setListItems, setEditItem, setEditItemValue, editItemValue, editItem }) {
	const toggleDeleteItem = () => {
		setListItems(listItems.filter(elem => elem.id !== item.id));
	}

	const toggleDoneItem = () => {
		setListItems(
			listItems.map(elem => {
				if (elem.id === item.id) {
					return {
						...item,
						status: { done: !elem.status.done, open: elem.status.open },
					};
				}
				return elem;
			}))
	};

	const toggleInProgressItem = () => {
		setListItems(
			listItems.map(elem => {
				if (elem.id === item.id) {
					return {
						...item,
						status: { done: elem.status.done, open: !elem.status.open },
					}
				}
				return elem;
			})
		)
	}

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

	const handleOnEnterPress = (e) => {
		if (e.key === 'Enter') {
			handleSaveEditListItem(item.id);
		}
	}

	return (
		<div className="list-item-wrapper">
			{editItem === item.id ?
				(<input autoFocus
					className="list-item"
					type="text"
					onChange={(e) => { setEditItemValue(e.target.value) }}
					value={editItemValue}
					onKeyDown={(e) => handleOnEnterPress(e)}
				/>)
				: (<li className={`list-item ${item.status.done ? 'done'
					: !item.status.open ? 'in-progress'
						: ''}`}>
					<span>{value}</span>
				</li>)
			}

			{editItem === item.id ?
				(<button className="btn-save-edit"
					title="Зберегти"
					onClick={() => { handleSaveEditListItem(item.id) }}>
					&#128190;
				</button>)
				: (<button className="btn-edit"
					title="Редагувати"
					onClick={handleEditListItem}>
					&#128397;
				</button>)
			}

			<button className="btn-in-progress"
				title="Виконується"
				onClick={toggleInProgressItem}>
				&#128338;
			</button>

			<button className="btn-done"
				title="Виконано"
				onClick={toggleDoneItem}>
				&#10004;
			</button>

			<button className="btn-delete"
				title="Видалити"
				onClick={toggleDeleteItem}>
				&#10006;
			</button>
		</div>
	);
}