import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Election, IElectionDoc } from '../src/models/election.model';

async function seedElections(count: number = 10) {
  try {
    await mongoose.connect('mongodb://localhost:27017/voting_app');

    await Election.deleteMany({});

    const elections: IElectionDoc[] = [];

    for (let i = 0; i < count; i++) {
      elections.push(
        new Election({
          title: faker.lorem.words(3),
          candidates: [
            {
              name: faker.person.fullName(),
              nim: '22241010' + faker.number.int({min:1001, max: 3999})
            },
            {
              name: faker.person.fullName(),
              nim: '22241010' + faker.number.int({min:1001, max: 3999})
            },
            {
              name: faker.person.fullName(),
              nim: '22241010' + faker.number.int({min:1001, max: 3999})
            },
          ],
          expiresAt: faker.date.soon({ days: 30 }),
        })
      );
    }

    await Election.insertMany(elections);

    console.log(`${count} elections seeded successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

const countArg = process.argv[2];
const count = countArg ? parseInt(countArg) : 10;

seedElections(count);