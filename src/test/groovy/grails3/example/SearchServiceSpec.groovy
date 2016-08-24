package grails3.example

import grails.test.mixin.TestFor
import spock.lang.Specification
import twitter4j.Query
import twitter4j.QueryResult
import twitter4j.Status
import twitter4j.Twitter

@TestFor(SearchService)
class SearchServiceSpec extends Specification {

    def twitter = Mock(Twitter)
    static String RESULTABLE_Q = "grails3"
    static String FRUITLESS_Q = "rails"

    def date = new Date()

    private Status mockTweet(String user, String text, long id) {
        def mockUser = Mock(twitter4j.User)
        mockUser.getScreenName() >> user

        def tweet = Mock(Status)
        tweet.getUser() >> mockUser
        tweet.getText() >> text
        tweet.getCreatedAt() >> date
        tweet.getId() >> id

        tweet
    }

    private QueryResult mockResult(List<Status> statuses) {
        def queryResult = Mock(QueryResult)
        queryResult.getTweets() >> statuses

        queryResult
    }

    def setup() {
        def queryResult = mockResult([
            mockTweet("jay-z", "holy grails3 rocks", 1),
            mockTweet("beyonce", "lemonade tastes better than grails3", 2)
        ])

        def emptyResult = mockResult([])

        twitter.search(_ as Query) >> { Query query ->
            String strQuery = query.query
            if(strQuery == RESULTABLE_Q) {
                queryResult
            } else {
                emptyResult
            }
        }
    }

    void "test search with results"() {
        when:
        def result = service.performSearch(RESULTABLE_Q, twitter)

        then:
        result.size() == 2
        result.every { it.text.contains("grails3") }
        result.collect { it.user }.sort() == ['beyonce', 'jay-z']
    }

    void "test search with no results"() {
        when:
        def result = service.performSearch(FRUITLESS_Q, twitter)

        then:
        result.size() == 0
    }

    void "test search with no query"() {
        when:
        service.performSearch("", twitter)

        then:
        thrown(IllegalArgumentException)
    }
}
