import { generateUser, generateTask, createRandomTasks, createData, convertDate } from '../utilis';

describe('testing function generateTask', () => {
  it('object of a given structure', () => {
    const result = generateTask();
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        startDate: expect.any(Number),
        dedlineDate: expect.any(Number),
        status: expect.any(String),
      }),
    );
  });
});

describe('testing function convertDate', () => {
  it('string output format: xx.xxx.xxxxx', () => {
    const result = convertDate(1604485257000);
    expect(result).toBe('04.11.2020');
  });

  it('function without patameter', () => {
    const result = convertDate();
    expect(result).toBe(null);
  });
});

describe('testing function createRandomTasks', () => {
  it('output array', () => {
    const result = createRandomTasks(10);
    expect(result).toEqual(expect.any(Array));
  });

  it('output array of objects', () => {
    const result = createRandomTasks(10);
    const expected = [
      {
        name: expect.any(String),
        startDate: expect.any(Number),
        dedlineDate: expect.any(Number),
        status: expect.any(String),
      },
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('function without patameter', () => {
    const result = createRandomTasks();
    expect(result).toBe(null);
  });
});

describe('testing function createData', () => {
  it('output array', () => {
    const result = createData(10);
    expect(result).toEqual(expect.any(Array));
  });

  it('input string', () => {
    const result = createData('abc');
    expect(result).toBe(null);
  });

  it('function without patameter', () => {
    const result = createData();
    expect(result).toBe(null);
  });
});

describe('testing function generateUser', () => {
  it('object of a given structure', () => {
    const result = generateUser();
    const arrayProgress = [
      {
        task: expect.any(String),
        note: expect.any(String),
        date: expect.any(Number),
      },
    ];
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        age: expect.any(Number),
        direction: expect.any(String),
        education: expect.any(String),
        startDate: expect.any(Number),
        tasks: expect.any(Array),
        progress: expect.arrayContaining(arrayProgress),
      }),
    );
  });
});
