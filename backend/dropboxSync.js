const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');
require('dotenv').config()
const xlsx = require('xlsx');
const mysql = require('mysql');
const con = require('./connection')
const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch
});


const uploadFileToDropbox = async (buffer) => {
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
          const response = await dbx.filesUpload({
            path: '/MyProjectData/formData.xlsx', // specify the path here
            contents: buffer,
            mode: { '.tag': 'overwrite' },
          });
          console.log('File uploaded successfully:', response);
          return;
        } catch (error) {
          if (error.status === 429) {
            attempt++;
            const waitTime = Math.pow(2, attempt) * 1000; // exponential backoff
            alert(`Rate limit hit. Retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          } else {
            console.error('Error uploading file:', error);
            return;
          }
        }
      }
      alert('Max retries reached. Could not upload the file .Please try after sometime');
};

const syncData = async () => {

  con.query('SELECT * FROM phonedata', async (error, results) => {
    if (error) {
      console.error('Error fetching data from MySQL:', error);
    //   con.end();
      return;
    }

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(results);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'FormData');

    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    await uploadFileToDropbox(buffer);
    // con.end();
  });
};

module.exports = syncData;
