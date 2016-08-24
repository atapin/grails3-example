package grails3.example

/**
 *
 */
class UserExistsException extends  Exception {
    UserExistsException() {
    }

    UserExistsException(String message) {
        super(message)
    }
}
