const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function Validator(options) {
    const formElement = $(options.form)

    function validate(errorElement, formGroupElement, errorMassage) {
        if (errorMassage) {
            errorElement.innerText = errorMassage
            formGroupElement.classList.add('invalid')
            return false
        }
        else {
            errorElement.innerText = ''
            formGroupElement.classList.remove('invalid')
            return true
        }
    }   

    if (formElement) {
        options.rules.forEach(rule => {
            const inputElement = formElement.querySelector(rule.selector)
            const formGroupElement = inputElement.parentElement
            const errorElement = formGroupElement.querySelector('.form-message')

            if (inputElement) {
                inputElement.onblur = () => {
                    const errorMassage = rule.test(inputElement.value)
                    
                    validate(errorElement, formGroupElement, errorMassage)
                }

                inputElement.oninput = () => {
                    errorElement.innerText = ''
                    formGroupElement.classList.remove('invalid')
                }
            }
        })
        
        formElement.onsubmit = (e) => {
            options.rules.forEach(rule => {
                
                const inputElement = formElement.querySelector(rule.selector)
                const formGroupElement = inputElement.parentElement
                const errorElement = formGroupElement.querySelector('.form-message')
    
                if (inputElement) {
                    const errorMassage = rule.test(inputElement.value)
                    if (validate(errorElement, formGroupElement, errorMassage) === false) {
                        e.preventDefault()
                        return
                    }
                }
            })
        }
    }

    

}

Validator.isRequired = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector,
        test: (value) => {
            const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return value.match(mailFormat) ? undefined : 'Please input correct email format.'
        }
    }
}

Validator.minLength = (selector, min) => {
    return {
        selector,
        test: (value) => {
            return value.length >= min ? undefined : `Please input at least ${min} length.`
        }
    }
}

Validator.isCorrect = (selector, selector2) => {
    return {
        selector,
        test: (value) => {
            return value === $(selector2).value ? undefined : `Please input correct new password.`
        }
    }
}