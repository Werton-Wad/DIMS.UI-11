import faker from 'faker';

export function convertDate(date, inputFormat) {
  if (typeof date !== 'number') {
    return null;
  }
  const newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  if (inputFormat) {
    return `${year}-${month}-${day}`;
  }
  return `${day}.${month}.${year}`;
}

export function generateTask(userId) {
  return {
    id: faker.random.uuid(),
    userId: userId,
    name: faker.random.arrayElement([
      'Create the DB',
      'Write uinit tests',
      'Implement the procs',
      'Improve UI',
      'Make rewiew last PR',
    ]),
    startDate: Date.parse(faker.date.between('2018-11-30', '2020-11-01')),
    deadlineDate: Date.parse(faker.date.between('2020-11-30', '2020-12-31')),
    description: faker.random.arrayElement([
      'create components used prop-types',
      'add responsive for your components',
      'add unit tests for side functions',
    ]),
    status: faker.random.arrayElement(['Active', 'Success', 'Fail']),
  };
}
export function createRandomTasks(n, userId) {
  if (!isNaN(n)) {
    let random = Math.random() * n + 1;
    return Array.from({ length: random }, () => generateTask(userId));
  }
  return null;
}

export function createData(n) {
  if (!isNaN(n)) {
    return Array.from({ length: n }, generateUser);
  }
  return null;
}

export function getAge(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  return new Date().getFullYear() - year;
}

export function generateUser() {
  const userId = faker.random.uuid();
  const randomTasks = createRandomTasks(5, userId);
  return {
    id: userId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthDate: Date.parse(faker.date.between('1980-01-01', '2002-01-01')),
    universityAverageScore: faker.random.number({
      min: 4,
      max: 10,
      precision: 0.01,
    }),
    mathScore: faker.random.number({
      min: 4,
      max: 10,
      precision: 0.01,
    }),
    address: faker.address.streetAddress(),
    mobilePhone: faker.phone.phoneNumberFormat(),
    skype: faker.random.word(),
    direction: faker.random.arrayElement(['.net', 'java', 'frontend', 'php']),
    education: faker.random.arrayElement(['BSUIR', 'BSU', 'MGLU', 'GrSU', 'PSU', 'BSTU', 'BNTU']),
    startDate: Date.parse(faker.date.between('2018-01-01', '2020-10-10')),
    tasks: randomTasks,
    sex: faker.random.arrayElement(['male', 'female']),

    progress: randomTasks.map((el) => ({
      task: el.name,
      userId: userId,
      taskId: el.id,
      noteId: faker.random.uuid(),
      note: faker.random.arrayElement([
        'Implemented task state',
        'Created spinner',
        'Created progress bar',
        'Improved UI',
      ]),
      date: Date.parse(faker.date.between('2020-11-01', '2020-11-30')),
    })),
  };
}
