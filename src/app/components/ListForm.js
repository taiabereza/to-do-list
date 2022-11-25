import React from "react";
import './components.css';

export default function ListForm({ inputValue, setInputValue, listItems, setListItems, setFilterStatus, textareaValue, setTextareaValue, setFilterDate }) {

	const handleInputValue = (e) => {
		document.getElementsByClassName('input-title')[0].classList.remove('alert');
		setInputValue(e.target.value);
	};

	const handleTextareaValue = (e) => {
		setTextareaValue(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim().length === 0) {
			document.getElementsByClassName('input-title')[0].classList.add('alert');
		} else {
			setListItems([
				...listItems,
				{
					title: inputValue.trim(),
					descr: textareaValue.trim(),
					status: { done: false, open: true },
					id: Math.random() * 1000,
					creationDate: new Date().toISOString(),
					updateDate: new Date().toISOString(),
				}
			])
			setInputValue('');
			setTextareaValue('');
		}
	}

	const handleFilterStatusChange = (e) => {
		setFilterStatus(
			e.target.value
		);
	}

	const handleFilterDateChange = (e) => {
		setFilterDate(
			e.target.value
		);
	}

	return (
		<form className="list-form">
			<input value={inputValue}
				className="input-title"
				maxLength={80}
				onChange={handleInputValue} type="text"
				placeholder="Що заплануємо?"
			/>
			<div className="form-wrapper">
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

				<div className="list-select">
					<select name="date"
						id="date"
						onChange={handleFilterDateChange}>
						<option value="creation-older">Спочатку старіші (за датою створення)</option>
						<option value="creation-newer">Спочатку новіші (за датою створення)</option>
						<option value="update-older">Спочатку старіші (за датою оновлення)</option>
						<option value="update-newer">Спочатку новіші (за датою оновлення)</option>
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