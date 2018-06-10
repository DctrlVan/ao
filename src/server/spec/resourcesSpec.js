import utils from './utils'
import validators from './validators'
import events from '../events'
import state from '../state'

module.exports = function(req,res, next){
  switch (req.body.type){
      case 'resource-created':
          specResourceCreated(req, res, next)
          break
      case 'resource-used':
          specResourceUsed(req, res, next)
          break
      case 'resource-stocked':
          specResourceStocked(req, res, next)
          break
      default:
          next()
  }
}

function specResourceCreated(req, res, next){
  let errRes = []
  if (
    validators.isNewResourceId(req.body.resourceId, errRes) &&
    validators.isNotes(req.body.name, errRes) &&
    validators.isAmount(req.body.charged, errRes) &&
    validators.isNotes(req.body.secret, errRes)
  ){
    events.resourcesEvs.resourceCreated(
      req.body.resourceId,
      req.body.name,
      req.body.charged,
      req.body.secret,
			utils.buildResCallback(res)
    )
  } else {
    res.status(200).send(errRes)
  }
}

function specResourceUsed(req, res, next){
  let errRes = []
  if (
    validators.isMemberId(req.body.memberId, errRes) &&
    validators.isResourceId(req.body.resourceId, errRes) &&
    validators.isAmount(req.body.amount, errRes) &&
    validators.isAmount(req.body.charged, errRes) &&
    validators.isNotes(req.body.notes, errRes)

  ){
    events.resourcesEvs.resourceUsed(
      req.body.resourceId,
      req.body.memberId,
      req.body.amount,
      req.body.charged,
      req.body.notes,
      utils.buildResCallback(res)
    )
  } else {
    res.status(200).send(errRes)
  }
}

function specResourceStocked(req, res, next){
  let errRes = []
  if (
    validators.isResourceId(req.body.resourceId, errRes) &&
    validators.isMemberId(req.body.memberId, errRes) &&
    validators.isAmount(req.body.amount, errRes) &&
    validators.isAmount(req.body.paid, errRes) &&
    validators.isNotes(req.body.notes, errRes)
  ){
    events.resourcesEvs.resourceStocked(
      req.body.resourceId,
      req.body.memberId,
      req.body.amount,
      req.body.paid,
      req.body.notes,
      utils.buildResCallback(res)
    )
  } else {
    res.status(200).send(errRes)
  }
}
