import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/app/(auth)/auth';
import { 
  userProfiles,
  userInterests,
  userGoals,
  personalityTraits,
  socialConnections
} from '@/lib/db/schema/user-context';
import { eq } from 'drizzle-orm';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;

  const [
    profile,
    interests,
    goals,
    traits,
    connections
  ] = await Promise.all([
    db.select().from(userProfiles).where(eq(userProfiles.userId, userId)),
    db.select().from(userInterests).where(eq(userInterests.userId, userId)),
    db.select().from(userGoals).where(eq(userGoals.userId, userId)),
    db.select().from(personalityTraits).where(eq(personalityTraits.userId, userId)),
    db.select().from(socialConnections).where(eq(socialConnections.userId, userId))
  ]);

  return NextResponse.json({
    profile: profile[0] || null,
    interests,
    goals,
    traits,
    connections
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id;
  const data = await req.json();

  if (data.profile) {
    await db
      .insert(userProfiles)
      .values({ ...data.profile, userId })
      .onConflictDoUpdate({
        target: [userProfiles.userId],
        set: data.profile
      });
  }

  if (data.interests) {
    await db.delete(userInterests).where(eq(userInterests.userId, userId));
    if (data.interests.length > 0) {
      await db.insert(userInterests).values(
        data.interests.map((interest: string) => ({
          userId,
          interest
        }))
      );
    }
  }

  if (data.goals) {
    await db.delete(userGoals).where(eq(userGoals.userId, userId));
    if (data.goals.length > 0) {
      await db.insert(userGoals).values(
        data.goals.map((goal: string) => ({
          userId,
          goal,
          completed: false
        }))
      );
    }
  }

  if (data.traits) {
    await db.delete(personalityTraits).where(eq(personalityTraits.userId, userId));
    if (data.traits.length > 0) {
      await db.insert(personalityTraits).values(
        data.traits.map((trait: string) => ({
          userId,
          trait
        }))
      );
    }
  }

  if (data.connections) {
    await db.delete(socialConnections).where(eq(socialConnections.userId, userId));
    if (data.connections.length > 0) {
      await db.insert(socialConnections).values(
        data.connections.map((connection: any) => ({
          userId,
          ...connection
        }))
      );
    }
  }

  return new NextResponse('OK');
} 