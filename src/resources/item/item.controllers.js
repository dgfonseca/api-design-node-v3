export const getItems = (req, res) => {
  res.send({ items: [1, 2, 3] })
}

export const postItem = (req, res) => {
  res.send({ body: req.body })
}

export const getItemById = (req, res) => {
  res.send({ body: req.params.id })
}

export const deleteItemById = (req, res) => {
  res.send({ body: req.params.id })
}

export const putItemById = (req, res) => {
  res.send({ body: req.params.id })
}
