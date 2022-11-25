import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import ListForm from './components/ListForm';
import ToDoList from './components/ToDoList';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [listItems, setListItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('creation-older');
  const [editItem, setEditItem] = useState(null);
  const [editItemTitleValue, setEditItemTitleValue] = useState('');
  const [editItemDescrValue, setEditItemDescrValue] = useState('');

  useEffect(() => {
    getLocalListItems();
  }, [])


  useEffect(() => {
    setLocalListItems();
  }, [listItems, filterStatus, filterDate]);



  const handleFilterItems = (items) => {
    switch (filterStatus) {
      case 'open':
        return items.filter(item => item.status.open === true && item.status.done === false);
      case 'in-progress':
        return items.filter(item => item.status.open === false && item.status.done === false);
      case 'done':
        return items.filter(item => item.status.done === true);
      default:
        return items;
    }
  };

  const handleFilterItemsByDate = (items) => {
    switch (filterDate) {
      case ('creation-newer'):
        return items.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
      case ('update-older'):
        return items.sort((a, b) => new Date(a.updateDate) - new Date(b.updateDate));
      case ('update-newer'):
        return items.sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
      default:
        return items.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    }
  }


  const filteredItems = useMemo(() => {
    let res = listItems;
    res = handleFilterItems(res);
    res = handleFilterItemsByDate(res);
    return res;
  }, [listItems, filterStatus, filterDate])

  const setLocalListItems = () => {
    if (listItems.length > 0) {
      localStorage.setItem('listItems', JSON.stringify(listItems));
    }
  }

  const getLocalListItems = () => {
    if (localStorage.getItem('listItems') === null) {
      localStorage.setItem('listItems', JSON.stringify([]));
    } else {
      let localListItems = JSON.parse(localStorage.getItem('listItems'));
      setListItems(localListItems);
    }
  }

  return (
    <div className='app'>
      <div className="app-container">
        <header>
          <h2>&gt;——СПИСОК СПРАВ——&gt;</h2>
        </header>

        

        <ListForm inputValue={inputValue}
          setInputValue={setInputValue}
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          listItems={listItems}
          setListItems={setListItems}
          setFilterStatus={setFilterStatus}
          setFilterDate={setFilterDate}
        />

        <ToDoList listItems={listItems}
          setListItems={setListItems}
          filteredItems={filteredItems}
          setEditItem={setEditItem}
          editItem={editItem}
          setEditItemTitleValue={setEditItemTitleValue}
          editItemTitleValue={editItemTitleValue}
          editItemDescrValue={editItemDescrValue}
          setEditItemDescrValue={setEditItemDescrValue}
        />
      </div>
    </div>
  );
}

export default App;
