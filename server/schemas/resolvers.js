const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__V -password')
            .populate('books')

            return userData;
            }
        

        throw new AuthenticationError('Not logged in');
        },
        user: async (parent, { username }) => {
            return User.findOne()
            .select('-__v -password')
            .populate('books')
        }
    },
    Mutation: {}
};

module.exports= resolvers;