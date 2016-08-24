package grails3.example.util

/**
 * Extension of java8 Optional allowing to throw an exception if a value is present
 */
@Category(Optional)
class OptionalCategory {
    public <T> Optional<T> andThrow(Closure<? extends Throwable> closure) {
        if(this.isPresent()) {
            throw closure(this.get())
        } else {
            this
        }
    }
}
