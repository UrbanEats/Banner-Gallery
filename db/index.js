/* eslint-disable no-console */
const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getImagesFromListing = (listingId, cb) => {
  const id = Number(listingId.slice(1));

  connection.query('SELECT * FROM images INNER JOIN listings_images ON images.id = listings_images.image_id WHERE listings_images.listing_id = ? ORDER BY user_submit', [id], (error, results) => {
    if (error) { console.log(error); }
    cb(null, results);
  });
};

module.exports = {
  getImagesFromListing,
};
