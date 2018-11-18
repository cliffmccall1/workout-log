const Log = require('../models/log');
const sort = { date: -1 };

exports.createLog = (req, res, next) => {
  const log = new Log({
    date: req.body.date,
    title: req.body.title,
    content: req.body.content,
    duration: req.body.duration,
    creator: req.userData.userId
  });
  // saves to db
  log
    .save()
    .then(createdLog => {
      res.status(201).json({
        message: 'Log added successfully',
        logId: createdLog._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a log failed!'
      });
    });
};

exports.updateLog = (req, res, next) => {
  const log = new Log({
    _id: req.body.id,
    date: req.body.date,
    title: req.body.title,
    content: req.body.content,
    duration: req.body.duration,
    creator: req.userData.userId
  });
  Log.updateOne({ _id: req.params.id }, log)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate log!"
      });
    });
};

exports.getLogs = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fetchedLogs;
  const creator = req.userData.userId;
  const logQuery = Log.find({ creator: creator }).sort(sort);
  if (pageSize && currentPage) {
    logQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  logQuery
    .then(logs => {
      fetchedLogs = logs;
      return Log.find({ creator: creator }).countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Logs fetched successfully!',
        logs: fetchedLogs,
        maxLogs: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching posts failed!'
      });
    });
};

exports.getLog = (req, res, next) => {
  Log.findById(req.params.id)
    .then(log => {
      if (log) {
        res.status(200).json(log);
      } else {
        res.status(404).json({ message: 'Log not found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching log failed!'
      });
    });
};

exports.deleteLog = (req, res, next) => {
  Log.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
        message: 'Deleting log failed!'
      });
    });
};
