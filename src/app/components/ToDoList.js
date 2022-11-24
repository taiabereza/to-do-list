import React from "react";
import './components.css';

import ListItem from "./ListItem";

export default function ToDoList({ listItems, setListItems, setEditItemTitleValue, filteredItems, setEditItem, editItem, editItemTitleValue, editItemDescrValue, setEditItemDescrValue }) {
	return (
		<div className="list-items-container">
			<ul className="list-items">
				{filteredItems.map(item => (
					<ListItem listItems={listItems}
						setListItems={setListItems}
						editItem={editItem}
						setEditItem={setEditItem}
						editItemTitleValue={editItemTitleValue}
						setEditItemTitleValue={setEditItemTitleValue}
						editItemDescrValue={editItemDescrValue}
						setEditItemDescrValue={setEditItemDescrValue}
						item={item}
						titleValue={item.title}
						descrValue={item.descr}
						key={item.id} />
				))}
			</ul>
		</div>
	);
}