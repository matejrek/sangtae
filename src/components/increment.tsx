import { counter } from '../App';

function Increment() {
  const handleIncrement = () => {
    counter.increment();
  }

  return (
    <>
      <button onClick={handleIncrement}>+</button>
    </>
  );
}

export default Increment;