import React, { useState } from 'react'
import "../style/box.css"

export default function Box() {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow((current) => !current)
  }

  const ready = () => {
    return (
      <div>
        <dialog open>
          <article>
            <header>
              <button aria-label='close'
              style={{border: "none"}}
              onClick={handleClick}>
              </button>
            </header>
            <div>ship's Deatials</div>
          </article>
        </dialog>
      </div>
    )
  }

  const empty =() => {
    return <div></div>
  }
  return show ? ready() : empty();
}
