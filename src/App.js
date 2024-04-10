import { ReactComponent as Window1Vector } from './assets/window1-vector.svg';
import { ReactComponent as Window2Vector } from './assets/window2-vector.svg';
import { ReactComponent as Window3Vector } from './assets/window3-vector.svg';
// import axios from 'axios';
import apiService from './controller/Services';

import React, { useEffect, useState } from 'react';
import Modal from './modal/Modal';
import GridLayout from "react-grid-layout";
import './App.css';


function App() {
  //-----------------get data on load-------------//

let [count,setCount] = useState("0") 
let [window1Content,setWindow1Content] = useState("Data is Loading");
let [window2Content,setWindow2Content] = useState("Data is Loading");
let [window3Content,setWindow3Content] = useState("Data is Loading");

useEffect(() => {
  apiService.getCount()
    .then(count => setCount(count))
    .catch(error => console.error('Error setting count:', error));
  apiService.getWindowData()
    .then(data => {
      setEditTextareaValue(JSON.stringify(data[0].content));
      setWindow1Content(JSON.stringify(data[0].content));
      setWindow2Content(JSON.stringify(data[1].content));
      setWindow3Content(JSON.stringify(data[2].content));
    })
    .catch(error => console.error('Error setting Window data:', error));
}, []);

//=======================add Data =================//
  const handleAddData = (event) => {
    event.preventDefault();
    apiService.addData(selectedAddOption,addTextareaValue)
    .then(data => {
      console.log(data);
      if(data.status===200)
      {
        setCount(count+1);
        switch(selectedAddOption) {
          case '1':
            
            return setWindow1Content(addTextareaValue);
          case '2':
            
            return setWindow2Content(addTextareaValue);
          case '3':
            
            return setWindow3Content(addTextareaValue);
          default:
            return true;
        }
      }
    })
    .catch(error => console.error('Error:', error));
    setSelectedAddOption('1');
    setAddTextareaValue('');
    setIsAddModalOpen(false);
  };



  const handleEditData = (event) => {
    event.preventDefault();
    apiService.editData(selectedEditOption,editTextareaValue)
    .then(data => {
      console.log(data);
      if(data.status===200)
      {
        setCount(count+1);
        switch(selectedEditOption) {
          case '1':
            return setWindow1Content(editTextareaValue);
          case '2':
            return setWindow2Content(editTextareaValue);
          case '3':
            return setWindow3Content(editTextareaValue);
          default:
            return true;
        }
      }
    }).catch(error => console.error('Error:', error));
    setIsEditModalOpen(false);
  };

//--------------------------------------------------//
  //--------------------layout config--------------//
  const resizeDirections = ['s','n','e','w'];
  const [layout, setLayout] =  useState([
    { i: "a", x: 0, y: 0, w: 3, h: 8 },
    { i: "b", x: 4, y: 0, w: 6, h: 8 },
    { i: "c", x: 0, y: 1, w: 9, h: 5 }
  ]);

  const handleResize = (layout, oldItem, newItem) => {
    // Find the index of the resized item
    const resizedIndex = layout.findIndex(item => item.i === newItem.i);
    
    // Calculate new sizes for neighbors
    const newLayout = layout.map((item, index) => {
      if (index === resizedIndex - 1) {
        // Update left neighbor
        return { ...item, w: item.w + oldItem.w - newItem.w };
      } else if (index === resizedIndex + 1) {
        // Update right neighbor
        return { ...item, w: item.w + oldItem.w - newItem.w };
      } else if (index === resizedIndex) {
        // Update resized item
        return { ...item, w: newItem.w };
      } else {
        return item;
      }
    });
    setLayout(newLayout);
  };

  //----------------------------------------------//
  //------------- Add modal -------------------//
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [addTextareaValue, setAddTextareaValue] = useState("");

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const [selectedAddOption, setSelectedAddOption] = useState('1');
  const handleAddOptionChange = (event) => {
    setSelectedAddOption(event.target.value);
  };
  const handleAddTextareaValue = (event) => {
    setAddTextareaValue(event.target.value);
  };
  //-----------------------------------------//
  
  //------------- Edit modal -------------------//
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTextareaValue, setEditTextareaValue] = useState("");

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const [selectedEditOption, setSelectedEditOption] = useState('1');
  const handleEditOptionChange = (event) => {
    setSelectedEditOption(event.target.value);
    switch(event.target.value) {
      case '1':
        return setEditTextareaValue(window1Content)
      case '2':
        return setEditTextareaValue(window2Content)
      case '3':
        return setEditTextareaValue(window3Content)
      default:
        return true;
    }
  };
  const handleEditTextareaChange = (event) => {
    setEditTextareaValue(event.target.value);
  }

//-----------------------------------------//
  //------------width responsive----------------//
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
//----------------------------------------------------------//
  return (
    <div className="App">
      <div className='nav-bar'>
          <p>Device width: {width}px</p>
          <p>Api Count: {count}</p>
          <button onClick={openAddModal}>Add</button>
          <button onClick={openEditModal}>Edit</button>
      </div>
        <div>
          <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title={"Add Data"}>
          <form onSubmit={handleAddData}>
            <div>
              <h3>Select window to add component:</h3>
            </div>
            <div className='form-radio'>
              <label>
                <input type="radio" value="1" checked={selectedAddOption === "1"} onChange={handleAddOptionChange} />
                  <Window1Vector />
              </label>
              <label>
                <input type="radio" value="2" checked={selectedAddOption === "2"} onChange={handleAddOptionChange} />
                  <Window2Vector />
              </label>
              <label>
                <input type="radio" value="3" checked={selectedAddOption === "3"} onChange={handleAddOptionChange} />
                <Window3Vector />
              </label>
            </div>
            <div>
              <label>
              <textarea
            value={addTextareaValue}
            onChange={handleAddTextareaValue}
            rows={4}
            cols={50}
            placeholder="Enter your text here"
            />
                <button on>Submit</button>
              </label>
            </div>
            </form>
          </Modal>
          <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title={"Edit Data"}>
          <form onSubmit={handleEditData}>
            <div>
              <h3>Select window to Edit component:</h3>
            </div>
            <div>
              <label>
                <input type="radio" value="1" checked={selectedEditOption === "1"} onChange={handleEditOptionChange} />
                <Window1Vector />
              </label>
              <label>
                <input type="radio" value="2" checked={selectedEditOption === "2"} onChange={handleEditOptionChange} />
                <Window2Vector />
              </label>
              <label>
                <input type="radio" value="3" checked={selectedEditOption === "3"} onChange={handleEditOptionChange} />
                <Window3Vector />
              </label>
            </div>
            <div>
              <label>
                <textarea name='updateInput'  value={editTextareaValue}  onChange={handleEditTextareaChange} rows={4} cols={50}/>
                <button type='submit'>Submit</button>
              </label>
            </div>
            </form>
          </Modal>
        </div> 


      <GridLayout
        className="layout"
        layout={layout}
        cols={9}
        rowHeight={30}
        width={width}
        onResize={handleResize}
        resizeHandles={resizeDirections}
      >
        <div id="a" className='windows' key="a">{window1Content}</div>
        <div id="b" className='windows' key="b">{window2Content}</div>
        <div id="c" className='windows' key="c">{window3Content}</div>
      </GridLayout>
    </div>
  );
}

export default App;
