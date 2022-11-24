import React from "react";
import './components.css';

export default function ListItem({ item, titleValue, listItems, setListItems, setEditItem, setEditItemValue, editItemValue, editItem, descrValue }) {
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
		setEditItemValue(item.title);

	}

	function handleSaveEditListItem(id) {
		const updatedListItems = [...listItems].map(elem => {
			if (elem.id === id) {
				elem.title = editItemValue;
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
			<li className="card">
				{editItem === item.id ?
					(<input autoFocus
						className="list-item list-item-title"
						type="text"
						name="card-title"
						maxLength={80}
						onChange={(e) => { setEditItemValue(e.target.value) }}
						value={editItemValue}
						onKeyDown={(e) => handleOnEnterPress(e)}
					/>)
					: (<div className={`list-item list-item-title ${item.status.done ? 'done'
						: !item.status.open ? 'in-progress'
							: ''}`}>
						<span>{titleValue}</span>
					</div>)
				}

				{editItem === item.id ?
					(<textarea autoFocus
						className="list-item"
						name="card-descr"
						maxLength={220}
						onChange={(e) => { setEditItemValue(e.target.value) }}
						value={editItemValue}
						onKeyDown={(e) => handleOnEnterPress(e)}
					/>)
					: (<div className={`list-item ${item.status.done ? 'done'
						: !item.status.open ? 'in-progress'
							: ''}`}>
						<span>{descrValue}</span>
					</div>)
				}
			</li>



			<div className="btns">
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
		</div>
	);
}