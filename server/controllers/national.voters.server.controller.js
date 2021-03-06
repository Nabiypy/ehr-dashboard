/**
 * Created by hanso on 01/02/2019.
 * International Passport server controller
 */

'use strict';
var config = require('../config'),
  request = require('request'),
  db = require('../models/database'),
  VotersCard = require('../models/nhis'),
  VotersServiceController = {};

// Save passport information
VotersServiceController.saveVotersCard = function (req, res) {
  var body = req.body;
  console.log("nhis request body >>>", body);

  db.sync().then(function () {
    var newVotersCard = {
    userId: req.body.userId,
    bioInfoId: req.body.bioInfoId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    idType: req.body.idType,
    idNumber: req.body.idNumber,
    expiredDate: req.body.expiredDate

    };

    return VotersCard.create(newVotersCard).then(function () {
      res.status(201)
         .json({message: 'new newVotersCard info saved successfully'});
    });
  }).catch(function (error) {
    console.log(error);
    res.status(403).json({ message: 'an error occured saving newVotersCard details' });
  });
}

// Read all Biological Info
VotersServiceController.getAllSavedVotersCard = function (req, res) {
  VotersCard.findAll()
    .then(function (nhisInfos) {
      res.status(200)
        .json(nhisInfos);
      console.info('find all Nhis saved ~ ');
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//Read Biological info
VotersServiceController.getNhisInfo = function (req, res) {
  VotersCard.findById(req.params.id)
    .then(function (nhisInfo) {
      res.status(200)
         .json(nhisInfo);
      console.log('error: false ', 'message: read single nhis post ~', nhisInfo);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
// Update Biological info
VotersServiceController.updateNhistInfo = function (req, res) {
  VotersCard.update(req.body, {
    where: { id: req.params.id }
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
      console.log('updateRecords >>', updatedRecords)
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}

//delete Biological info
VotersServiceController.removeNhisInfo = function (req, res) {
  VotersCard.destroy({
    where: { id: req.params.id }
  })
    .then(function (deletedRecords) {
      res.status(200)
        .json(deletedRecords);
      console.log('error: false', 'message: deletedRecords ~ ', deletedRecords);
    })
    .catch(function (error) {
      res.status(500)
        .json(error);
      console.log('error: true ', 'message: ', error)
    });
}

module.exports = VotersServiceController;
