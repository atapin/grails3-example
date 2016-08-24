package grails3.example

class UrlMappings {

    static mappings = {
        "/api/search"(controller: "search", action: "search", method: "GET")
        "/api/signup"(controller: "user", action: "signUp", method: "POST")


        "/"(view:"/index")
        "/**"(view:"/index")
    }
}
