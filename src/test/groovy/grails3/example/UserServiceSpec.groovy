package grails3.example

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification


@TestFor(UserService)
@Mock([User, Role, UserRole])
class UserServiceSpec extends Specification {

    def username = "test"
    def password = "test"

    def setup() {
    }

    def cleanup() {
    }

    void "test signUp first time"() {
        when:
        service.signUp(username, password)

        then:
        User.count() == 1
        User.findByUsername(username) != null
    }

    void "test signUp two times"() {
        when:
        service.signUp(username, password)
        service.signUp(username, password)

        then:
        thrown(UserExistsException)
    }

    void "test signUp empty username/password"() {
        when:
        service.signUp("", "")

        then:
        thrown(IllegalArgumentException)
    }
}
