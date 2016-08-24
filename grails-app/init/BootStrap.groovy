import grails3.example.Role
import grails3.example.User
import grails3.example.UserRole

class BootStrap {

    def init = { servletContext ->

        def twitterKey = System.getProperty("twitter.key") ?: System.getenv("TWITTER_KEY")
        def twitterSecret = System.getProperty("twitter.secret") ?: System.getenv("TWITTER_SECRET")

        if(!twitterKey || !twitterSecret) {
            throw new RuntimeException("""
==========================================================
    Twitter consumer key and consumer must be provided
    Options:
    1) JVM parameters: -Dtwitter.key=... AND -Dtwitter.secret=...
    2) ENV parameters: TWITTER_KEY=...;TWITTER_SECRET=... grails run-app
==========================================================
""");
        }

        def role = new Role(authority: 'ROLE_USER').save()
        def user = new User(username: 'demo', password: 'demo').save()
        UserRole.create(user, role, true)
    }
    def destroy = {
    }
}
