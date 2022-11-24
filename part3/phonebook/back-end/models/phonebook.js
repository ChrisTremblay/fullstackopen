// MONGOOSE //
import mongoose from 'mongoose';

//DOTENV//
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};
connectDB();

const phonebookSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{1,15}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number, accepted xx-xxxxx`,
    },
    minLength: 8,
    required: true,
  },
});
phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Phonebook', phonebookSchema);
