import { NextResponse } from 'next/server';
import { admin } from '@/firebase/admin'; // Adjust the import path as necessary

export async function GET() {
  try {
    // For example, let's list the first user
    const listUsersResult = await admin.auth().listUsers(10);
    const user = listUsersResult.users[0];

    // Return the first user's info as a JSON response
    return NextResponse.json({ user });
  } catch (error) {
    // Return error details if something goes wrong
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
