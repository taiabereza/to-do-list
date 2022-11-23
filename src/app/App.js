import React, {useState, useEffect} from 'react';
import './App.css';
import ListForm from './components/ListForm';
import ToDoList from './components/ToDoList';

function App() {

  const [inputValue, setInputValue] = useState('');
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
        setfilteredItems(listItems.filter(item => item.open === true && item.done === false));
        break;
      case 'in-progress':
        setfilteredItems(listItems.filter(item => item.open === false && item.done === false));
        break;
      case 'done':
        setfilteredItems(listItems.filter(item => item.done === true));
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
    <div className='App'>
      <header>
        <h2>СПИСОК СПРАВ</h2>
      </header>

      <ListForm inputValue={inputValue}
                setInputValue={setInputValue}
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
  );
}

export default App;
