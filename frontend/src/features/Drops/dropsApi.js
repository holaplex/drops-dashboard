import slowRequestHelper from '../../helpers/slowRequestHelper';

// TODO: Raise an error if necessary

const submit = async (drop_id) => {
  return await slowRequestHelper.post(`/drops/submit/${drop_id}`)
}

const publish = async (drop_id) => {
  return await slowRequestHelper.post(`/drops/publish/${drop_id}`)
}

const index = async () => {
  return await slowRequestHelper.get('/drops')
}

const show = async (drop_id) => {
  return await slowRequestHelper.get(`/drops/${drop_id}`)
}

const update = async ({ id, name, accessible, discoverable, go_live_date, status }) => {
  return await slowRequestHelper.put(`/drops/${id}`, { name, accessible, discoverable, go_live_date, status })
}
const create = async (formData) => {
  return await slowRequestHelper.post('/upload/excel', formData)
};

const uploadMint = async (formData) => {
  return await slowRequestHelper.post('/upload/minted', formData)
};
export { update, submit, publish, create, index, show, uploadMint };
