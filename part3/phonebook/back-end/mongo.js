//DOTENV//
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://chrisDev:${password}@cluster0.tvpzgqq.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
};

try {
  await connectDB();
  if (process.argv.length == 3) {
    const allEntries = await Phonebook.find({});
    console.log('Phonebook:');
    allEntries.forEach((entry) => {
      console.log(`${entry.name}: ${entry.phone}`);
    });
  } else {
    const phonebook = new Phonebook({
      name: process.argv[3],
      phone: process.argv[4],
    });
    await phonebook.save();
  }
} catch (err) {
  console.log('Not saved..', err);
}
mongoose.connection.close();
