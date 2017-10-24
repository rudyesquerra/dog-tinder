const request = require('supertest')
const app = require('../app')

jest.mock('../models/dog')


describe("App", ()=>{
  it("Tests the root path", ()=>{
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  })


  it("Lists dogs", ()=>{
    return request(app).get("/dogs").then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.dogs[0].name).toBe('Paws')
    })
  })


it("Creates dogs", ()=>{
  return request(app)
    .post("/dogs")
    .send({
      name: 'Morris',
      age: 2,
      enjoys: "Quiet evenings by the fire."
    })
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(response.body.dog.name).toBe('Morris')
      expect(response.body.dog.age).toBe(2)
      expect(response.body.dog.enjoys).toBe("Quiet evenings by the fire.")
    })
})

it("Validates name when creating dog", ()=>{
  return request(app)
    .post("/dogs")
    .send({
      age: 2,
      enjoys: "Food!"
    })
    .then(response =>{
      expect(response.statusCode).toBe(400)
      const error = response.body.errors.validations[0]
      expect(error.param).toBe('name')
      expect(error.msg).toBe('Is required')
    })
})

it("Validates age when creating dog", ()=>{
    return request(app)
      .post("/dogs")
      .send({
        name: 'Morris',
        enjoys: "Food!"
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('age')
        expect(error.msg).toBe('Is required')
      })
  })

  it("Validates enjoys when creating dog", ()=>{
    return request(app)
      .post("/dogs")
      .send({
        name: 'Morris',
        age: 2
      })
      .then(response =>{
        expect(response.statusCode).toBe(400)
        const error = response.body.errors.validations[0]
        expect(error.param).toBe('enjoys')
        expect(error.msg).toBe('Is required')
      })
  })
})
