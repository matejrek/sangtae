import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Decrement from "./components/decrement";
import Increment from "./components/increment";
import { createSangtae, useSangtae } from "./lib/sangtae"


/*create state container*/
export const counter = createSangtae('my-counter', 0, {
  increment: (state: number) => state + 1,
  decrement: (state: number) => state - 1,
  reset: (state: number) => state = 0,
});

function Counter() {
  /*hook to get/set state inside container*/
  const [count, setCount] = useSangtae(counter);

  /*access container predefined actions*/
  const handleReset = () => {
    counter.reset();
  }

  return (
    <>
      <p style={{ textAlign: "center" }}>Count: {count}</p>
      <button onClick={() => setCount(0)}>Reset to 0 (hook)</button>
      <button onClick={handleReset}>Reset to 0 (action)</button>
    </>
  );
}


function App() {

  return (
    <div className="App">
      <h1>상태 (Sangtae)</h1>
      <p>
        Global State Management with minimal setup, easy to use, fast, typesafe!<br />
        1.5K in size (769B gzip)
      </p>
      <p>Try this minimal working example:</p>
      <div className="controls">
        <Counter />
        <Increment />
        <Decrement />
      </div>
      <h2>Basic initialization</h2>
      <SyntaxHighlighter language="javascript" style={docco}>
        {`
        export const counter = createSangtae('my-counter', 0, {
          increment: (state: number) => state + 1,
          decrement: (state: number) => state - 1,
          reset: (state: number) => state = 0,
        });
        `}
      </SyntaxHighlighter>
      <h2>Actions and hooks</h2>
      <SyntaxHighlighter language="javascript" style={docco}>
        {`
        function Counter() {
          /*hook to get/set state inside container*/
          const [count, setCount] = useSangtae(counter);

          /*access container predefined actions*/
          const handleReset = () => {
            counter.reset();
          }

          return (
            <>
              <p>Count: {count}</p>
              <button onClick={() => setCount(0)}>Reset to 0 (hook)</button>
              <button onClick={handleReset}>Reset to 0 (action)</button>
            </>
          );
        }
        `}
      </SyntaxHighlighter>
    </div>
  )
}

export default App
