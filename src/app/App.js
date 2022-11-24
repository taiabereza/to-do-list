import React, {useState, useEffect} from 'react';
import './App.css';
import ListForm from './components/ListForm';
import ToDoList from './components/ToDoList';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [listItems, setListItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredItems, setfilteredItems] = useState([]);
  const [editItem, setEditItem] = useState(null); 
  const [editItemValue, setEditItemValue] = useState('');

  useEffect(() => {
    getLocalListItems();
  }, [])
  
  useEffect(()=> {
    handleFilterItems();
    setLocalListItems();
  }, [listItems, filterStatus]);
  
  const handleFilterItems = () => {
    switch(filterStatus){
      case 'open':
        setfilteredItems(listItems.filter(item => item.status.open === true && item.status.done === false));
        break;
      case 'in-progress':
        setfilteredItems(listItems.filter(item => item.status.open === false && item.status.done === false));
        break;
      case 'done':
        setfilteredItems(listItems.filter(item => item.status.done === true));
        break;
      default:
        setfilteredItems(listItems);
        break;
    }
  };

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
        <h2>СПИСОК СПРАВ</h2>
      </header>

      <ListForm inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                listItems={listItems}
                setListItems={setListItems}
                setFilterStatus={setFilterStatus}
                />

      <ToDoList listItems={listItems}
                setListItems={setListItems}
                filteredItems={filteredItems}
                setEditItem={setEditItem}
                editItem={editItem}
                setEditItemValue={setEditItemValue}
                editItemValue={editItemValue}
                />
      </div>
    </div>
  );
}

export default App;
