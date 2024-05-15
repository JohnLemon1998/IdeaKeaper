const axios = require('axios');
// 送信するデータ
const userData = {
  name: 'testuser',
  password: 'testpassword'
};

// APIエンドポイント
const url = 'http://localhost:3000/api/user'; // エンドポイントのURLに適宜変更してください

// POSTリクエストを送信
axios.post(url, userData)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  })
