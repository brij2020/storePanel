function FormValidation(fields) {
    const errorState = {};
    const EmailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
    Object.keys(fields).map(key => {
       switch(key) {
        case "email" : {
            if(fields[key] === '') {
                errorState[key]= {
                    msg: 'email is empty'
                }
            } else if(!EmailRegx.test(fields[key])) {
                errorState[key]= {
                    msg: 'email is not valid'
                }
            } else {
                errorState[key]= {
                    msg: ''
                }
            }
            break;
        }
        case 'password': {
            if(fields[key] === '') {
                errorState[key]= {
                    msg: 'password is empty'
                }
            } else if(fields[key].length < 3) {
                errorState[key]= {
                    msg: 'password length should be greater or equal than 8'
                }
            } else {
                errorState[key]= {
                    msg: ''
                }
            }
            break;
        }
        default :{
            errorState:{}
        }
       }
    })
    return errorState;
}
export { FormValidation }