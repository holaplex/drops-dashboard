import requestHelper from '../../helpers/requestHelper';

// TODO: Raise an error if necessary

const submit = async (drop_id) => {
  return await requestHelper.post(`/drops/submit/${drop_id}`)
}

const publish = async (drop_id) => {
  return await requestHelper.post(`/drops/publish/${drop_id}`)
}

const index = async () => {
  return await requestHelper.get('/drops')
}

const show = async (drop_id) => {
  return await requestHelper.get(`/drops/${drop_id}`)
}

const create = async (formData) => {
  return await requestHelper.post('/upload/excel', formData)
};

const uploadMint = async (formData) => {
  return await requestHelper.post('/upload/minted', formData)
};
export { submit, publish, create, index, show, uploadMint };
