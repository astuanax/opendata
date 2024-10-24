import {createLazyFileRoute} from '@tanstack/react-router'
import MainTemplate from "@/components/adem/main-template.tsx";

export const Route = createLazyFileRoute('/')({
    component: IndexLazy,
})

function IndexLazy() {

    return (<MainTemplate>
            <h1> Open DAta ADAM</h1>
        </MainTemplate>

    )
}
