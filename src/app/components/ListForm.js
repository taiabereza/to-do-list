import React from "react";
import './components.css';

export default function ListForm({ inputValue, setInputValue, listItems, setListItems, setFilterStatus, textareaValue, setTextareaValue }) {

	const handleInputValue = (e) => {
		setInputValue(e.target.value);
	};

	const handleTextareaValue = (e) => {
		setTextareaValue(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setListItems([
			...listItems,
			{
				title: inputValue, descr: textareaValue, status: { done: false, open: true }, id: Math.random() * 1000
			}
		])
		setInputValue('');
		setTextareaValue('');
	}

	const handleFilterStatusChange = (e) => {
		setFilterStatus(
			e.target.value
		);
	}

	return (
		<form className="list-form">
			<div className="form-wrapper">
				<input value={inputValue}
					maxLength={80}
					onChange={handleInputValue} type="text"
					placeholder="Що заплануємо?"
					/>
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
			</div>
			<textarea name="descr"
				maxLength={220}
				rows={5}
				placeholder="Опис замітки"
				value={textareaValue}
				onChange={handleTextareaValue}
				></textarea>
			<button onClick={handleSubmit}>&#128397;</button>

		</form>
	);
}