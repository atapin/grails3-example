package grails3.example

import groovy.transform.EqualsAndHashCode

/**
 *
 */
@EqualsAndHashCode
class Tweet {
    String user
    String text
    String date
    Long id
}
