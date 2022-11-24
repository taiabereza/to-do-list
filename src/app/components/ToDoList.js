import React from "react";
import './components.css';

import ListItem from "./ListItem";

export default function ToDoList({ listItems, setListItems, setEditItemValue, filteredItems, setEditItem, editItem, editItemValue }) {
	return (
		<div className="list-items-container">
			<ul className="list-items">
				{filteredItems.map(item => (
					<ListItem listItems={listItems}
										setListItems={setListItems}
										setEditItemValue={setEditItemValue}
										editItemValue={editItemValue}
										setEditItem={setEditItem}
										editItem={editItem}
										item = {item}
										titleValue={item.title}
										descrValue={item.descr}
										key={item.id} />
				))}
			</ul>
		</div>
	);
}