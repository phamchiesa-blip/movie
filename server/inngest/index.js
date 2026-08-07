// Thay vì code CRUD truyền thống thì mk dùng thư viện clerk và inngest
import { User } from "../models/User.js";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({id: 'movie-ticket-booking'});

// Inngest Function to save user data to a db
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async({event}) => {
        const {id, first_name, last_name, email_address, image_url} = event.data;
        const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + " " + last_name,
            image: image_url
        }
        await User.create(userData);
    }
);

// Inngest () to delete user from db
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async({event}) => {
        const {id} = event.data;
        await User.findByIdAndDelete(id);
    }
);

// Inngest () to update user from db
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async({event}) => {
        const {id, first_name, last_name, email_address, image_url} = event.data;
         const userData = {
            _id: id,
            email: email_address[0].email_address,
            name: first_name + " " + last_name,
            image: image_url
        }
        await User.findByIdAndUpdate(id, userData);
    }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];