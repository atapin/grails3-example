import grails3.example.Role
import grails3.example.User
import grails3.example.UserRole

class BootStrap {

    def init = { servletContext ->

        def role = new Role(authority: 'ROLE_USER').save()
        def user = new User(username: 'demo', password: 'demo').save()
        UserRole.create(user, role, true)
    }
    def destroy = {
    }
}
