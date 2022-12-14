const handleChangeForm = (object, event) => {
  return { ...object, [event.target.name]: event.target.value };
};

export default { handleChangeForm };
