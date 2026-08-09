import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from '../models/User.js'
import { clerkClient } from '@clerk/express'

const getUserRole = (user) => {
    const role = user?.privateMetadata?.role || user?.publicMetadata?.role;
    return typeof role === 'string' ? role.toLowerCase() : undefined;
}

// API to check if user is admin
export const isAdmin = async (req, res) => {
    try {
        const {userId} = req.auth();

        if (!userId) {
            return res.json({success: true, isAdmin: false});
        }

        const user = await clerkClient.users.getUser(userId);
        const role = getUserRole(user);

        res.json({success: true, isAdmin: role === 'admin'});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, isAdmin: false, message: error.message});
    }
}

// API to get dashboard data
export const getdashboardData = async (req, res) => {
    try {
        const bookings = await Booking.find({isPaid: true});
        const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie');

        const totalUsers = await User.countDocuments();

        const dashboardData =  {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
            activeShows,
            totalUsers
        } 

        res.json({success: true, dashboardData});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to get all shows
export const getAllShows = async (req, res) => {
    try {
        const shows = (await Show.find({showDateTime: {$gte: new Date()}}).populate('movie')).sort({showDateTime: 1});

        res.json({success: true, shows});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// API to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate({
            path: "show",
            populate: {path: 'movie'}
        }).sort({createAt: -1});
        
        res.json({success: true, bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
