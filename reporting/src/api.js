import API from 'claudia-api-builder'

import AWS from 'aws-sdk'
const api = new API()
const db = new AWS.RDSDataService();
const data = require('data-api-client')({
  secretArn: 'arn:aws:secretsmanager:us-west-2:817309612200:secret:rds-db-credentials/cluster-ONEHAAJ7P3XJLOBSF3YH3VV4ME/admin-65h5dV',
  resourceArn: 'arn:aws:rds:us-west-2:817309612200:cluster:duckfeedrdb',
  database: 'duckfeeding' // default database
})

// put  payload into DB

api.post(
  '/duckdbsave',
  async function (request) {
    console.log(request)
    const req = JSON.parse(request.body)
    console.log(req.data.payload)

    //feedtime DATETIME NOT NULL,
    // food VARCHAR(255) NOT NULL,
    //   amount INT UNSIGNED NOT NULL,
    //     latitude DECIMAL(10, 8) NOT NULL,
    //       longitude DECIMAL(11, 8) NOT NULL,
    //         timezone VARCHAR(255) NOT NULL
    let insert = await data.query(
      `INSERT INTO duckreports (feedtime,food, amount, latitude,longitude, timezone) VALUES(:feedtime,:food, :amount,:latitude, :longitude, :timezone)`,
      req.data.payload
    )

      return insert
  },
  { success: 201 }
) // returns HTTP status 201 - Created if successful



module.exports = api
