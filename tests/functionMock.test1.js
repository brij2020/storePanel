import { FormValidation } from '../src/utill/FormValidation'

test('Mock function', () => {
    const testObj = {
        email:'brijphy@gmail.com',
        password:'2432223'
    }
    const expectObj = FormValidation(testObj)
    expect(expectObj.email).toEqual({ msg: '' });
    expect(expectObj.password).toEqual({msg: ''})

})