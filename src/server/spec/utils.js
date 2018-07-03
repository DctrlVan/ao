const state = require('../state')

// we use this function to build a callback for auto response to db create attempt
function buildResCallback(res){
    return (err, dbResponse) => {
        if (err) {
            console.log('build res error', {err})
            res.status(500).send('db err')
        } else {
            console.log('res 201', {dbResponse})
            res.status(201).send(dbResponse)
        }
    }
}

function memberIdFromFob(fob){
  let memberId
  // TODO: hide fob in server side state
  state.serverState.members.filter(m => m.active > 0).forEach(member => {
      if (member.fob == fob){
          memberId = member.memberId
      }
  })
  return memberId
}

function memberFromFob(fob){
  let m
  state.serverState.members.filter(m => m.active > 0).forEach(member => {
      if (member.fob == fob){
          m = member
      }
  })
  return m
}

function taskFromFob(fob){
  let task
  state.serverState.tasks.forEach(t => {
      if (t.fob == fob){
          task = t
      }
  })
  return task
}

function getResource(resourceId){
  let resource
  state.serverState.resources.forEach(r => {
      if (r.resourceId == resourceId){
          resource = r
      }
  })
  return resource
}

module.exports = {
  buildResCallback,
  memberIdFromFob,
  memberFromFob,
  taskFromFob,
  getResource
}
