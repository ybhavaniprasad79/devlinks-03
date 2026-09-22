import { useState } from 'react'
import Header from './components/Header.jsx'
import Quote from './components/Quote.jsx'
import Controls from './components/Controls.jsx'
import Tags from './components/Tags.jsx'
import Footer from './components/Footer.jsx'
// BUG (issue #11): unused import left in the file
import { useEffect } from 'react'

const QUOTES = [
  { text: 'Programs must be written for people to read.', author: 'Harold Abelson', tags: ['code', 'clarity'] },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman', tags: ['design', 'focus'] },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson', tags: ['process'] },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', tags: ['code'] },
]

export default function App() {
  const [index, setIndex] = useState(0)
  // BUG (issue #7): leftover debug console.log
  console.log('debug: current quote index', index)

  // BUG (issue #2): off-by-one — Math.floor(random * length) can equal `length`? No,
  // here it uses Math.round which CAN return `length` and read undefined (out of bounds).
  // BUG (issue #3): the new index is never checked against the current one, so the same
  // quote can appear twice in a row (feels broken to users).
  function next() {
    let i = Math.round(Math.random() * QUOTES.length)
    
    while (i === index) { i = Math.floor(Math.random() * QUOTES.length) }
    
    setIndex(i)
  }

  // BUG (issue #8): if QUOTES is empty this throws (reads .text of undefined) — no guard.
  const current = QUOTES[index]

  return (
    <main className="card">
      <Header />
      <Quote text={current.text} author={current.author} />
      <Tags tags={current.tags} />
      <Controls onNext={next} quote={current} />
      <Footer />
    </main>
  )
}
