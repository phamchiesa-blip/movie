import { clerkClient } from "@clerk/express";

const getUserRole = (user) => {
    const role = user?.privateMetadata?.role || user?.publicMetadata?.role;
    return typeof role === 'string' ? role.toLowerCase() : undefined;
}

export const protectAdmin = async (req, res, next) => {
    try {
        const {userId} = req.auth();

        const user = await clerkClient.users.getUser(userId);
        const role = getUserRole(user);

        // Check if not admin => user can't access to dashboard feature
        if (role !== 'admin') {
            return res.json({success: false, message: "Not Authorized!"});
        }

        next();
    } catch(error) {
        return res.json({success: false, message: "Not Authorized!"});
    }
}