const { Client } = require('pg');
const CONNECTION_STRING =
  "postgres://ihigwtmr:jpl5UtVsaEXnloL7-rXQ-F0t0c5N2-Vx@ruby.db.elephantsql.com:5432/ihigwtmr";

function connect() {
  const client = new Client({
    connectionString: CONNECTION_STRING,
  });
  client.connect();
  return client;
}

function createTable() {
  const client = connect();
  const query = `
  CREATE TABLE information (
    id SERIAL PRIMARY KEY,
    availabilityid INTEGER,
    participantid INTEGER,
    meetingid INTEGER,
    startTime INTEGER,
    endTime INTEGER
    );
    `;
  client.query(query, (err, res) => {
    console.log(err, res);
    client.end();
  });
}

function insertData(information, callback){
  let i = 1;
  const template = information.map(information => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(', ');
  const values = information.reduce((reduced, information) => [...reduced, information.availabilityid, information.participantid, information.meetingid, information.startTime, information.endTime], [])
  const query = `INSERT INTO information (availabilityid, participantid, meetingid, startTime, endTime) VALUES ${template};`;
  const client = connect()
  client.query(query, values, (err, result)=> {
callback(err, result)
    client.end
  });

}

function getData(availabilityid, participantid, meetingid, startTime, endTime, page, pageSize, callback){
  let whereClause;
  let i = 1;
  const values = []
  // if (!availabilityid, !participantid, !meetingid, !startTime && !endTime ) whereClause = ' ';
  if (!participantid && !meetingid) whereClause = ' ';
  else{
    whereClause = 'WHERE ';
    if (participantid){
      whereClause += `participantid = $${i++}`;
      values.push(parseInt((participantid)))
    }
    if (meetingid){
      whereClause += participantid ? ` AND meetingid = $${i++}` : `meetingid = $${i++}`;
      values.push(parseInt((meetingid)))
    }
 
 
  }
  

  let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`
  values.push(parseInt(pageSize))
  values.push(parseInt(page) * parseInt(pageSize))
  
  const query = `SELECT * From information ${whereClause} ${limitOffsetClause} `
  
  const client = connect()
  client.query(query, values,function(err,result){
    callback(err, result)
    client.end()
    
  })
    // console.log(query, values)
}




module.exports = {
  createTable,
  insertData,
  getData,
};
/*
DROP TABLE IF EXISTS information
    CREATE TABLE information (
        id SERIAL PRIMARY KEY,
        availabilityid INTEGER,
        participantid INTEGER,
        meetingid INTEGER,
        startTime INTEGER,
        endTime INTEGER,
 */
// availabilityid=$1,participantid=$2,meetingid=$3,startTime=$4 AND endTime=$5 LIMIT $6 OFFSET $7
