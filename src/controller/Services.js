import axios from 'axios';
const apiService = {
  getCount: async () => {
    let getCountConf = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:3000/api/v1/count',
    headers: { }
    };
    try {
      const response = await axios.request(getCountConf);
      return response.data.count;
    } catch (error) {
      console.error('Error fetching count:', error);
      throw error;
    }
  },

  getWindowData: async () => {
    let getWindowDataConf = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:3000/api/v1/data',
        headers: { }
        };

    try {
      const response = await axios.request(getWindowDataConf);
      return response.data;
    } catch (error) {
      console.error('Error fetching card data:', error);
      throw error;
    }
  },

  addData: async (windowId, content) => {
    let data = {"windowId": windowId, "content": content};
    let addDataConf = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:3000/api/v1/data',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(data)
    };
    console.log(JSON.stringify(data));
    try{
      const response = await axios.request(addDataConf);
      return response;}
    catch (error) {
      console.error('Error adding data:', error);
      throw error;
    }
  },

  editData: async (windowId, content) => {
    let data = { "content": content};
    let editDataConf = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:3000/api/v1/data/'+windowId,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(data)
    };
    console.log(JSON.stringify(data));
    try{
      const response = await axios.request(editDataConf);
      return response;}
    catch (error) {
      console.error('Error adding data:', error);
      throw error;
    }
  }
};

export default apiService;
