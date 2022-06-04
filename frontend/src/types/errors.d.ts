declare module Errors {
    interface Axios {
        
    }
    interface Server {
        message: string
        exception: string
        file: string
        line: number
        trace: Trace
    }

    type Trace = Trace.Item[]

    module Trace {
        interface Item {
            file: string
            line: number
            function: string
            class: string
            type: string
        }
    }
}