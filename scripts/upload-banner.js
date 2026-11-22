const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const token = process.env.BOT_TOKEN;
const chatId = process.env.ADMIN_TELEGRAM_ID;
const bannerPath = path.join(__dirname, '..', 'public', 'uwed_fis_banner.png');

async function uploadBanner() {
  const form = new FormData();
  form.append('chat_id', chatId);
  form.append('photo', fs.createReadStream(bannerPath));
  form.append('caption', '🏛 <b>UWED FIS Rasmiy Banneri</b>');
  form.append('parse_mode', 'HTML');

  try {
    const res = await axios.post(`https://api.telegram.org/bot${token}/sendPhoto`, form, {
      headers: form.getHeaders()
    });
    const photoArray = res.data.result.photo;
    const highestResPhoto = photoArray[photoArray.length - 1];
    console.log('PHOTO_FILE_ID:' + highestResPhoto.file_id);
  } catch (err) {
    console.error('Xato:', err.response?.data || err.message);
  }
}

uploadBanner();
