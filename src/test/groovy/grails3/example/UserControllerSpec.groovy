package grails3.example

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(UserController)
@Mock(User)
class UserControllerSpec extends Specification {

    def username = "test"
    def password = "test"

    def setup() {
    }

    def cleanup() {
    }

    void "test valid signUp"() {
        setup:
        controller.userService = Mock(UserService)

        when:
        controller.signUp(username, password)

        then:
        1 * controller.userService.signUp(_ as String, _ as String) >> new User(username, password).save()
        response.text == """{"username":"test"}"""
        User.count() == 1
    }

    void "test invalid signUp"() {
        setup:
        controller.userService = Mock(UserService)

        when:
        controller.signUp(username, password)

        then:
        1 * controller.userService.signUp(_ as String, _ as String) >> { args -> throw new UserExistsException("message") }
        response.text == """{"error":"message"}"""
        response.status == 400
        User.count() == 0
    }

    void "test signUp with empty params"() {
        setup:
        controller.userService = Mock(UserService)

        when:
        controller.signUp("", "")

        then:
        1 * controller.userService.signUp(_ as String, _ as String) >> { args -> throw new IllegalArgumentException("message") }
        response.text == """{"error":"message"}"""
        response.status == 400
        User.count() == 0
    }
}
