const axios = require('axios')
const config = require('../config.json')

test('registering a new survivor', async () => {
  await axios.post(`http://localhost:${config.PORT}/register`, {
    name: 'abc123',
    age: 13,
    gender: 'M',
    lastLocation: [123, 8978],
    inventory: [
      {
        item: 'ammunition',
        quantity: 6,
      },
    ],
  })
  expect(
    (
      await axios.post(`http://localhost:${config.PORT}/register`, {
        name: 'xyz123',
        age: 13,
        gender: 'M',
        lastLocation: [123, 8978],
        inventory: [
          {
            item: 'food',
            quantity: 3,
          },
        ],
      })
    ).status
  ).toBe(200)
})

test('updating location of a survivor', async () => {
  expect(
    (
      await axios.put(`http://localhost:${config.PORT}/location`, {
        name: 'xyz123',
        location: [676, 8789],
      })
    ).status
  ).toBe(200)
})

test(`fetch all survivors`, async () => {
  expect(
    (await axios.get(`http://localhost:${config.PORT}/survivors`)).status
  ).toBe(200)
})

test(`trade items`, async () => {
  expect(
    (
      await axios.post(`http://localhost:${config.PORT}/trade`, {
        items: {
          need: {
            item: 'food',
            quantity: 1,
          },
          exchange: {
            item: 'ammunition',
            quantity: 3,
          },
        },
        from: 'xyz123',
        to: 'abc123',
      })
    ).status
  ).toBe(200)
})

test(`flag as infected`, async () => {
  expect(
    (
      await axios.put(`http://localhost:${config.PORT}/flag`, {
        your_name: 'xyz123',
        infected_name: 'abc123',
      })
    ).status
  ).toBe(200)
})

test(`fetch report`, async () => {
  expect(
    (await axios.get(`http://localhost:${config.PORT}/report`)).status
  ).toBe(200)
})

test(`report object equality`, async () => {
  expect(
    (await axios.get(`http://localhost:${config.PORT}/report`)).data
  ).toEqual({
    healthy: 100,
    infected: 0,
    lostPoints: 0,
    averageResources: {
      water: 0,
      food: 1,
      ammunition: 3,
      medication: 0,
    },
  })
})
