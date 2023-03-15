import { counter } from '../App';

function Decrement() {
  const handleDecrement = () => {
    counter.decrement();
  }

  return (
    <>
      <button onClick={handleDecrement}>-</button>
    </>
  );
}

export default Decrement;