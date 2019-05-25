/* eslint-disable func-names */
const Conversation = require('./../models/Conversation.model');
const Message = require('./../models/Message.model');
const User = require('./../../user/models/user.model');

exports.getConversations = async (req, res, next) => {
  console.log('user object &&');
  console.log(req.user);
  // Only return one message from each conversation to display as snippet
  await Conversation.find({
      participants: req.user._id,
    })
    .select('_id')
    .exec((err, conversations) => {
      if (err) {
        console.log('error happen 2');
        res.json({
          error: err,
        });
        // return next(err);
      }

    //   console.log('ffff');
    //   res.json({
    //     conversations,
    //   });

      // Set up empty array to hold conversations + most recent message
      const fullConversations = [];
      conversations.forEach(async (conversation) => {
        await Message.find({
            conversationId: conversation._id,
          })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'name email',
          })
          .exec((err_, message) => {
            if (err_) {
              console.log('error happen 1');
              res.json({
                error: err_,
              });
              //   return next(err_);
            } else {
              fullConversations.push(message);
              console.log('this is true');
              res.status(200).json({
                conversations: fullConversations,
              });
            }
          });
      });
    });
};


exports.newConversation = (req, res, next) => {
  if (!req.params.recipient) {
    res.status(422).send({
      error: 'Please choose a valid recipient for your message.',
    });
    return next();
  }

  if (!req.body.composedMessage) {
    res.status(422).send({
      error: 'Please enter a message.',
    });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.recipient],
  });

  conversation.save((err, newConversation) => {
    if (err) {
      res.send({
        error: err,
      });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      author: req.user._id
    });

    message.save((err_, newMessage) => {
      if (err_) {
        res.send({
          error: err_,
        });
        return next(err_);
      }

      res.status(200).json({
        message: 'Conversation started!',
        conversationId: conversation._id,
      });
      return next();
    });
  });
};

exports.sendReply = (req, res, next) => {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.user._id,
  });

  reply.save((err, sentReply) => {
    if (err) {
      res.send({
        error: err,
      });
      return next(err);
    }

    res.status(200).json({
      message: 'Reply successfully sent!',
      sentReply,
    });
    return (next);
  });
};


// DELETE Route to Delete Conversation
exports.deleteConversation = function (req, res, next) {
  Conversation.findOneAndRemove({
    $and: [{
      _id: req.params.conversationId,
    }, {
      participants: req.user._id,
    }],
  }, (err) => {
    if (err) {
      res.send({
        error: err,
      });
      return next(err);
    }

    res.status(200).json({
      message: 'Conversation removed!',
    });
    return next();
  });
};


// PUT Route to Update Message
exports.updateMessage = (req, res, next) => {
  Conversation.find({
    $and: [{
      _id: req.params.messageId,
    }, {
      author: req.user._id,
    }],
  }, (err, message) => {
    if (err) {
      res.send({
        error: err,
      });
      return next(err);
    }

    message.body = req.body.composedMessage;

    message.save((err_, updatedMessage) => {
      if (err_) {
        res.send({
          error: err_,
        });
        return next(err_);
      }

      res.status(200).json({
        message: 'Message updated!',
        updatedMessage,
      });
      return next();
    });
  });
};
