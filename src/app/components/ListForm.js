import React from "react";
import './components.css';

export default function ListForm({ inputValue, setInputValue, listItems, setListItems, setFilterStatus }) {
	const handleInputValue = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setListItems([
			...listItems,
			{
				text: inputValue, done: false, open: true, id:Math.random() * 1000
			}
		])
		setInputValue('');
	}

	const handleFilterStatusChange = (e) => {
		setFilterStatus(
			e.target.value
		);
	}

	return (
		<form className="list-form">
			<input value={inputValue} onChange={handleInputValue} type="text" placeholder="Що заплануємо?" />
			<button onClick={handleSubmit}>&#128397;</button>
			<div className="list-select">
				<select name="status"
						id="status"
						onChange={handleFilterStatusChange}>
					<option value="all">Всі</option>
					<option value="open">Відкриті</option>
					<option value="in-progress">Виконуються</option>
					<option value="done">Виконані</option>
				</select>
			</div>
		</form>
	);
}