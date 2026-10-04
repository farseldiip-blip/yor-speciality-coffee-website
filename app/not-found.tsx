import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">YOR / 404</p><h1>Wrong rhythm.</h1><p>That page does not exist, but the coffee is still here.</p><Link className="button button-dark" href="/">Back home</Link></main>
}
