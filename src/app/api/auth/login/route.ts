import { NextResponse } from 'next/server';
import crypto from 'crypto';

// In a real application, you would use a database to store users
// and proper password hashing like bcrypt
const USERS = {
    'admin': {
        password: 'adminPassword123', // In production, use hashed passwords
        role: 'admin'
    },
    'user': {
        password: 'password', // In production, use hashed passwords
        role: 'user'
    }
};

// Generate a secure token
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Validate input
        if (!username || !password) {
            return NextResponse.json({
                success: false,
                message: 'Username and password are required'
            }, { status: 400 });
        }

        // Check if user exists and password matches
        const user = USERS[username as keyof typeof USERS];
        if (!user || user.password !== password) {
            // Use consistent response time to prevent timing attacks
            await new Promise(resolve => setTimeout(resolve, 500));
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials'
            }, { status: 401 });
        }

        // Generate token
        const token = generateToken();
        const expiration = 3 * 24 * 60 * 60; // 3 days in seconds

        // Create response
        const response = NextResponse.json({
            success: true,
            token: token,
            user: {
                username,
                role: user.role
            }
        });

        // Set secure cookie
        response.cookies.set({
            name: 'new-token',
            value: token,
            path: '/',
            httpOnly: true,
            maxAge: expiration,
            secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
            sameSite: 'strict'
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred during login'
        }, { status: 500 });
    }
}