import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/app/(auth)/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  try {
    const [
      profileResult,
      interestsResult,
      goalsResult,
      traitsResult,
      connectionsResult
    ] = await Promise.all([
      sql`SELECT * FROM user_profiles WHERE user_id = ${userId}`,
      sql`SELECT * FROM user_interests WHERE user_id = ${userId}`,
      sql`SELECT * FROM user_goals WHERE user_id = ${userId}`,
      sql`SELECT * FROM personality_traits WHERE user_id = ${userId}`,
      sql`SELECT * FROM social_connections WHERE user_id = ${userId}`
    ]);

    return NextResponse.json({
      profile: profileResult.rows[0] || null,
      interests: interestsResult.rows,
      goals: goalsResult.rows,
      traits: traitsResult.rows,
      connections: connectionsResult.rows
    });
  } catch (error) {
    console.error('Failed to fetch user context:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;
  const data = await req.json();

  try {
    if (data.profile) {
      await sql`
        INSERT INTO user_profiles (user_id, name, age, location, language, occupation, background)
        VALUES (
          ${userId},
          ${data.profile.name},
          ${data.profile.age},
          ${data.profile.location},
          ${data.profile.language},
          ${data.profile.occupation},
          ${data.profile.background}
        )
        ON CONFLICT (user_id)
        DO UPDATE SET
          name = ${data.profile.name},
          age = ${data.profile.age},
          location = ${data.profile.location},
          language = ${data.profile.language},
          occupation = ${data.profile.occupation},
          background = ${data.profile.background},
          updated_at = NOW()
      `;
    }

    if (data.interests) {
      await sql`DELETE FROM user_interests WHERE user_id = ${userId}`;
      if (data.interests.length > 0) {
        await sql`
          INSERT INTO user_interests (user_id, interest)
          SELECT * FROM jsonb_to_recordset(${JSON.stringify(
            data.interests.map((interest: string) => ({
              user_id: userId,
              interest
            }))
          )}::jsonb) AS t(user_id uuid, interest text)
        `;
      }
    }

    if (data.goals) {
      await sql`DELETE FROM user_goals WHERE user_id = ${userId}`;
      if (data.goals.length > 0) {
        await sql`
          INSERT INTO user_goals (user_id, goal, completed)
          SELECT * FROM jsonb_to_recordset(${JSON.stringify(
            data.goals.map((goal: string) => ({
              user_id: userId,
              goal,
              completed: false
            }))
          )}::jsonb) AS t(user_id uuid, goal text, completed boolean)
        `;
      }
    }

    if (data.traits) {
      await sql`DELETE FROM personality_traits WHERE user_id = ${userId}`;
      if (data.traits.length > 0) {
        await sql`
          INSERT INTO personality_traits (user_id, trait)
          SELECT * FROM jsonb_to_recordset(${JSON.stringify(
            data.traits.map((trait: string) => ({
              user_id: userId,
              trait
            }))
          )}::jsonb) AS t(user_id uuid, trait text)
        `;
      }
    }

    if (data.connections) {
      await sql`DELETE FROM social_connections WHERE user_id = ${userId}`;
      if (data.connections.length > 0) {
        await sql`
          INSERT INTO social_connections (user_id, name, relationship, details)
          SELECT * FROM jsonb_to_recordset(${JSON.stringify(
            data.connections.map((connection: any) => ({
              user_id: userId,
              name: connection.name,
              relationship: connection.relationship,
              details: connection.details || {}
            }))
          )}::jsonb) AS t(user_id uuid, name text, relationship text, details jsonb)
        `;
      }
    }

    return new NextResponse('OK');
  } catch (error) {
    console.error('Failed to update user context:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 