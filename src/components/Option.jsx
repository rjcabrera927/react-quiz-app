function Option({ id, letter, value }) {
  return (
    <div>
      <input type='radio' name={id} id={letter} value={letter} />
      <label htmlFor={letter} className='ms-2'>{`${letter}. ${value}`}</label>
    </div>
  );
}

export default Option;
