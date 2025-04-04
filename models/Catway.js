const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catwaySchema = new Schema({
  catwayNumber: {
    type: Number,
    required: true,
    unique: true
  },
  catwayType: {
    type: String,
    enum: ['long', 'short'],
    required: true
  },
  catwayState: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Catway', catwaySchema);
