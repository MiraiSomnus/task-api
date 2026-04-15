import prisma from '../config/db.js';

export async function findAll({ completed, search, sortBy, order, offset, limit }) {
  const conditions= {};
  
  if (completed !== undefined) {
   conditions.completed = completed === 'true';
  }


  if (search) {
    conditions = [{title:{contains: search, mode: 'insensitive'}}];
  }

  const tasks =await prisma.task.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return tasks;
}

// Create a new task
export async function create(data) {
  return prisma.task.create({
    data,
  });
}
