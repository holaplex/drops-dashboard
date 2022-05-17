import requestHelper from '../../helpers/requestHelper';

// TODO: Raise an error if necessary

const create = async (formData) => {
  return await requestHelper.post('/upload/excel', formData)
};
export { create };
