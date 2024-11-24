import mongoose from 'mongoose';

const DashboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL of the profile picture
  },
  coverPicture: {
    type: String, // URL of the cover picture
  },
  razorpayId: {
    type: String,
  },
  razorpaySecret: {
    type: String,
  },
}, {
  timestamps: true,  // To keep track of when the dashboard data is created/updated
});

const Dashboard = mongoose.models.Dashboard || mongoose.model('Dashboard', DashboardSchema);

export default Dashboard;
