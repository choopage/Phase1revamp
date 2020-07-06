if(availabilityid) {
    whereClause += `availabilityid = $${i++}`
    values.push(parseInt(availabilityid))
  };
  if(participantid) {
    whereClause += availabilityid ? ` participantid = $${i++}`: `participantid = $${i++}`
  values.push(parseInt(participantid));
  };
    
  if(meetingid) {
  whereClause += participantid ? ` meetingid = $${i++}`: `meetingid = $${i++}`
  values.push(parseInt(meetingid))
  }

if(startTime) {
  whereClause += meetingid ? ` startTime = $${i++}`: `startTime = $${i++}`
  values.push(parseInt(meetingid))
}
if(endTime) {
  whereClause += startTime ? ` endTime = $${i++}`: `endTime = $${i++}`
  values.push(parseInt(meetingid))
}