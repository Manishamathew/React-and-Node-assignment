import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb+srv://manisha:N8SiAVOzr9EL4UQT@test.pldosjn.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
