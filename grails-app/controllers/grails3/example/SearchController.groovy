package grails3.example

import grails.plugin.springsecurity.annotation.Secured
import org.springframework.http.HttpStatus

@Secured(['ROLE_USER'])
class SearchController {

    static responseFormats = ['json']

    def searchService

    def search(String q) {
        log.debug("Searching by query = ${q}...")
        def result = searchService.search(q.trim())
        respond result
    }

    def handleIllegalArgument(IllegalArgumentException ex) {
        log.debug("Handling IllegalArgumentException ${ex}... Returning NO_CONTENT.")
        respond Collections.emptyList()
    }
}
