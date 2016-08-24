package grails3.example

import twitter4j.Query
import twitter4j.Twitter
import twitter4j.TwitterFactory
import twitter4j.auth.OAuth2Token
import twitter4j.conf.ConfigurationBuilder

class SearchService {

    Collection<Tweet> search(String query) {
        Twitter tw = twitter()
        performSearch(query, tw)
    }

    Collection<Tweet> performSearch(String query, Twitter twitter) {
        if(query) {
            twitter.search(new Query(query)).tweets.collect {
                new Tweet(user: it.user.screenName, text: it.text, date: it.createdAt.dateString, id: it.id)
            }
        } else {
            throw new IllegalArgumentException("Search query must not be empty")
        }
    }

    Twitter twitter() {
        buildTwitter(token())
    }

    private static OAuth2Token token() {
        buildTwitter().OAuth2Token
    }

    private static Twitter buildTwitter(OAuth2Token token = null) {
        def confBuilder = new ConfigurationBuilder()
                .setApplicationOnlyAuthEnabled(true)
                .setOAuthConsumerKey(System.getProperty("twitter.key") ?: System.getenv("TWITTER_KEY"))
                .setOAuthConsumerSecret(System.getProperty("twitter.secret") ?: System.getenv("TWITTER_SECRET"))

        if(token) {
            confBuilder = confBuilder
                .setOAuth2TokenType(token.tokenType)
                .setOAuth2AccessToken(token.accessToken)
        }

        new TwitterFactory(confBuilder.build()).instance
    }
}
