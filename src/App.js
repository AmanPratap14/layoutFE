import { ReactComponent as Window1Vector } from './assets/window1-vector.svg';
import { ReactComponent as Window2Vector } from './assets/window2-vector.svg';
import { ReactComponent as Window3Vector } from './assets/window3-vector.svg';
import React, { useEffect, useState } from 'react';
import Modal from './modal/Modal';
import GridLayout from "react-grid-layout";
import './App.css';

function App() {
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
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const [selectedAddOption, setSelectedAddOption] = useState('window1');
  const handleAddOptionChange = (event) => {
    setSelectedAddOption(event.target.value);
  };
  //-----------------------------------------//
  
  //------------- Edit modal -------------------//
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const [selectedEditOption, setSelectedEditOption] = useState('window1');
  const handleEditOptionChange = (event) => {
    setSelectedEditOption(event.target.value);
  };
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
          <p>Api Count: 10</p>
          <button onClick={openAddModal}>Add</button>
          <button onClick={openEditModal}>Edit</button>
      </div>
        <div>
          <div>
            <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title={"Add Data"}>
              <div>
                <h3>Select window to add component:</h3>
              </div>
              <div className='form-radio'>
                <label>
                  <input type="radio" value="window1" checked={selectedAddOption === "window1"} onChange={handleAddOptionChange} />
                   <Window1Vector />
                </label>
                <label>
                  <input type="radio" value="window2" checked={selectedAddOption === "window2"} onChange={handleAddOptionChange} />
                   <Window2Vector />
                </label>
                <label>
                  <input type="radio" value="window3" checked={selectedAddOption === "window3"} onChange={handleAddOptionChange} />
                  <Window3Vector />
                </label>
              </div>
              <div>
                <label>
                  <input type="text" name='addInput' placeholder='Enter Text' />
                  <button>Submit</button>
                </label>
              </div>
            </Modal>
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title={"Edit Data"}>
              <div>
                <h3>Select window to Edit component:</h3>
              </div>
              <div>
                <label>
                  <input type="radio" value="window1" checked={selectedEditOption === "window1"} onChange={handleEditOptionChange} />
                  <Window1Vector />
                </label>
                <label>
                  <input type="radio" value="window2" checked={selectedEditOption === "window2"} onChange={handleEditOptionChange} />
                  <Window2Vector />
                </label>
                <label>
                  <input type="radio" value="window3" checked={selectedEditOption === "window3"} onChange={handleEditOptionChange} />
                  <Window3Vector />
                </label>
              </div>
              <div>
                <label>
                  <input type="text" name='updateInput' placeholder='Enter Text' />
                  <button>Submit</button>
                </label>
              </div>
            </Modal>
          </div>
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
        <div id="a" className='windows' key="a">Window 1</div>
        <div id="b" className='windows' key="b">Window 2</div>
        <div id="c" className='windows' key="c">Window 3</div>
      </GridLayout>
    </div>
  );
}

export default App;
