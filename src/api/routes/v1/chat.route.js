const express = require('express');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const chatRoutes = express.Router();

const ChatController = require('./../../chat/controller/chat.controller');

// Set chat routes as a subgroup/middleware to apiRoutes


// View messages to and from authenticated user
chatRoutes.get('/', authorize(LOGGED_USER), ChatController.getConversations);

// Retrieve single conversation
chatRoutes.get('/:conversationId', authorize(LOGGED_USER), ChatController.getConversations);

// Send reply in conversation
chatRoutes.post('/:conversationId', authorize(LOGGED_USER), ChatController.sendReply);

// Start new conversation
chatRoutes.post('/new/:recipient', authorize(LOGGED_USER), ChatController.newConversation);

module.exports = chatRoutes;
