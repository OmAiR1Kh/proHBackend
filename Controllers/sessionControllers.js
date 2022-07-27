const Session = require('../Models/sessions')
const Doctor = require('../Models/doctors')
const createError = require('../utils/error')

const createSession = async (req, res, next) => {
    const docId = req.params.docid
    const newSession = await new Session(req.body)

    try {
        const savedSession = await newSession.save()
        try {
            await Doctor.findByIdAndUpdate(docId, {
                $push: {sessions: savedSession._id}
            })
        } catch (err) {
            next(err)
        }
        res.status(201).json(savedSession)
    } catch (error) {
        next(error)
    }
}

const updateSession = async (req, res, next) => {
    try {
      const updatedSession = await Session.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedSession);    
    } catch (error) {
      next(error);
    }
  };
  
  const deleteSession = async (req, res) => {
    const docId = req.params.docid
    try {
      await Session.findByIdAndDelete(req.params.id);
      res.status(200).json("Session deleted");
      try {
        await Doctor.findByIdAndUpdate(docId, {
            $pull: {sessions: req.params.id}
        })
    } catch (err) {
        next(err)
    }
    } catch (error) {
      next(error);
    }
  };

const getSession = async (req, res, next) => {
    try {
      const session = await Session.findById(req.params.id);
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  };

const getAllSessions = async (req, res, next) => {
    try {
      const sessions = await Session.find();
      res.status(200).json(sessions);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createSession,
    updateSession,
    deleteSession,
    getSession,
    getAllSessions
  }