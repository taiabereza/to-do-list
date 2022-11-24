import React from "react";
import './components.css';

export default function ListItem({ item, titleValue, listItems, setListItems, setEditItem, setEditItemTitleValue, editItemTitleValue, editItem, descrValue, editItemDescrValue, setEditItemDescrValue }) {
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
		setEditItemTitleValue(item.title);
		setEditItemDescrValue(item.descr);
	}

	function handleSaveEditListItem(id) {
		const updatedListItems = [...listItems].map(elem => {
			if (elem.id === id) {
				elem.title = editItemTitleValue;
				elem.descr = editItemDescrValue;
			}
			return elem;
		})
		setListItems(updatedListItems);
		setEditItem(null);
		setEditItemTitleValue('');
		setEditItemDescrValue('');
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
						onChange={(e) => { setEditItemTitleValue(e.target.value) }}
						value={editItemTitleValue}
						onKeyDown={(e) => handleOnEnterPress(e)}
					/>)
					: (<div className={`list-item list-item-title ${item.status.done ? 'done'
						: !item.status.open ? 'in-progress'
							: ''}`}>
						<span>{titleValue}</span>
					</div>)
				}

				{editItem === item.id ?
					(<textarea className="list-item list-item-descr"
						name="card-descr"
						maxLength={220}
						onChange={(e) => { setEditItemDescrValue(e.target.value) }}
						value={editItemDescrValue}
						onKeyDown={(e) => handleOnEnterPress(e)}
					/>)
					: (<div className={`list-item list-item-descr ${item.status.done ? 'done'
						: !item.status.open ? 'in-progress'
							: ''}`}>
						<span>{descrValue.length > 0 ? `${descrValue}` : '[Без опису]'}</span>
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