import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Users
    const user1 = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: 'user1@example.com',
        username: 'user1',
        password: await bcrypt.hash('password123', 10),
        fullName: 'User One',
        gender: 'M',
        dob: new Date('1990-01-01'),
        role: 'user',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: 'user2@example.com',
        username: 'user2',
        password: await bcrypt.hash('password123', 10),
        fullName: 'User Two',
        gender: 'F',
        dob: new Date('1995-05-05'),
        role: 'user',
      },
    });

    // Seed Posts
    const post1 = await prisma.post.create({
      data: {
        id: uuidv4(),
        image: 'post1.jpg',
        title: 'First Post',
        description: 'This is the first post',
        authorId: user1.id,
      },
    });

    const post2 = await prisma.post.create({
      data: {
        id: uuidv4(),
        title: 'Second Post',
        description: 'This is the second post',
        authorId: user2.id,
      },
    });

    // Seed Comments
    const comment1 = await prisma.comment.create({
      data: {
        id: uuidv4(),
        content: 'This is a comment on the first post',
        postId: post1.id,
        authorId: user2.id,
      },
    });

    const comment2 = await prisma.comment.create({
      data: {
        id: uuidv4(),
        content: 'This is a comment on the second post',
        postId: post2.id,
        authorId: user1.id,
      },
    });

    console.log('Seed data successfully inserted.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
