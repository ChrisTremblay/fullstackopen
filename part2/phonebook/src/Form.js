const Form = ({ form, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name:{' '}
        <input
          value={form.name}
          type='text'
          name='name'
          onChange={handleChange}
        />
      </div>
      <div>
        Number:{' '}
        <input
          value={form.phone}
          type='tel'
          name='phone'
          onChange={handleChange}
        />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default Form;
