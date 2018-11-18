const Profile = require('../models/profile');
const sort = { date: -1 };

exports.createProfile = (req, res, next) => {
  const profile = new Profile({
    avatar: req.body.avatar,
    displayName: req.body.displayName,
    motivation: req.body.motivation,
    creator: req.userData.userId
  });
  // saves to db
  profile
    .save()
    .then(createdProfile => {
      res.status(201).json({
        message: 'Profile added successfully',
        profileId: createdProfile._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a profile failed!'
      });
    });
};

exports.updateProfile = (req, res, next) => {
  const profile = new Profile({
    _id: req.body.id,
    avatar: req.body.avatar,
    displayName: req.body.displayName,
    motivation: req.body.motivation,
    creator: req.userData.userId
  });
  Profile.updateOne({ _id: req.params.id }, profile)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate profile!"
      });
    });
};

exports.getProfiles = (req, res, next) => {
  const creator = req.userData.userId;
  Profile.find({ creator: creator })
    .limit(1)
    .then(documents => {
      res.status(200).json({
        message: 'Profile fetched successfully!',
        profiles: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching profile failed!'
      });
    });
};

exports.getProfile = (req, res, next) => {
  Profile.findById(req.params.id)
    .then(profile => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: 'Log not found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching profile failed!'
      });
    });
};

exports.deleteProfile = (req, res, next) => {
  Profile.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Deletion successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting profile failed!'
      });
    });
};
