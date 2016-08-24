package grails3.example

import grails.test.mixin.TestFor
import spock.lang.Specification
import twitter4j.Twitter

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(SearchController)
class SearchControllerSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test valid search with empty result"() {

        setup:
        def query = "grails3"
        def service = Mock(SearchService)
        service.search(_ as String) >> []
        controller.searchService = service

        when:
        controller.search(query)

        then:
        response.text == """[]""".toString()
    }

    void "test valid search with result"() {

        setup:
        def query = "grails3"
        def text = "grails3 rocks. sometimes"
        def service = Mock(SearchService)
        service.search(_ as String) >> [new Tweet(user: "User", text: text, id: 1, date: "01/01/2016")]
        controller.searchService = service

        when:
        controller.search(query)

        then:
        response.text == """[{"date":"01/01/2016","id":1,"text":"${text}","user":"User"}]""".toString()
    }

    void "test valid search with empty query"() {

        setup:
        def service = Mock(SearchService)
        service.search(_ as String) >> { String query ->
            throw new IllegalArgumentException(query)
        }
        controller.searchService = service

        when:
        controller.search("")

        then:
        response.text == "[]"
    }
}
