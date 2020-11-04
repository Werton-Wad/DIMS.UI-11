import faker from 'faker';

let id = 0;
export function convertDate(date) {
  if (typeof date !== 'number') {
    return null;
  }
  const newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  return `${day}.${month}.${year}`;
}
export function generateTask() {
  return {
    name: faker.random.arrayElement([
      'Create the DB',
      'Write uinit tests',
      'Implement the procs',
      'Improve UI',
      'Make rewiew last PR',
    ]),
    startDate: Date.parse(faker.date.between('2018-11-30', '2020-11-01')),
    dedlineDate: Date.parse(faker.date.between('2020-11-30', '2020-12-31')),
    status: faker.random.arrayElement(['Active', 'Success', 'Fail']),
  };
}
export function createRandomTasks(n) {
  if (!isNaN(n)) {
    let random = Math.random() * n + 1;
    return Array.from({ length: random }, generateTask);
  }
  return null;
}

export function createData(n) {
  if (!isNaN(n)) {
    return Array.from({ length: n }, generateUser);
  }
  return null;
}

export function generateUser() {
  const randomTasks = createRandomTasks(5);
  return {
    id: id++,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.number({
      min: 18,
      max: 35,
    }),
    direction: faker.random.arrayElement(['.net', 'java', 'frontend', 'php']),
    education: faker.random.arrayElement(['BSUIR', 'BSU', 'MGLU', 'GrSU', 'PSU', 'BSTU', 'BNTU']),
    startDate: Date.parse(faker.date.between('2018-01-01', '2020-10-10')),
    tasks: randomTasks,
    progress: randomTasks.map((el) => ({
      task: el.name,
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
