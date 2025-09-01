import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders/new/addProduct')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/orders/new/addProduct"!</div>
}
