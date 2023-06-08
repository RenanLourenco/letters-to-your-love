import request from "supertest";
import server from '../src/index'
import {describe, expect, test} from '@jest/globals';

import { lettersRepo } from "../src/repositories/Letters.Repositories";
import { userRepo } from "../src/repositories/Users.Repositories";




describe('Users Controllers', () => {

    describe('User Creation', () => {

        test('Raise error when try to register a user with invalid data', async () => {
            const InvalidUserData = {
                name:'InvalidUser',
                password:'',
            }
            await request(server)
                  .post('/users/register') 
                  .expect(400)
                  .then(data => {
                    const response = data.body

                    expect(response.message).toBe('Invalid data')

                   }) 
        })


        test('Try to create a already registered user', async () => 
        {
            const mockUser ={ 
                name:'Created User',
                email:'createdUser@gmail.com',
                password:'hashpassword'
            }

            const newUser = userRepo.create(mockUser)

            await request(server)
                  .post('/users/register') 
                  .send(mockUser)
                  .expect(400)
                  .then(data => {
                    const response = data.body

                    expect(response.message).toBe('Email already exists')

                   }) 
        })

        test('Sucessful register a user', async () => 
        {
            const newUser = {
                
            }
        })


    })


})
