export const getOne = model => async (req, res) => {
  try {
    let query = await model
      .findOne({
        createdBy: req.user._id,
        _id: req.params.id
      })
      .lean()
      .exec()

    if (!query) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: query })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

export const getMany = model => async (req, res) => {
  try {
    let query = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec()
    if (!query) {
      return res.status(400).end()
    }
    return res.status(200).json({ data: query })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

export const createOne = model => async (req, res) => {
  try {
    let query = await model.create({ ...req.body, createdBy: req.user._id })
    return res.status(201).json({ data: query })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

export const updateOne = model => async (req, res) => {
  try {
    let query = await model
      .findOneAndUpdate(
        { createdBy: req.user._id, _id: req.params.id },
        req.body,
        { new: true }
      )
      .lean()
      .exec()
    if (!query) {
      return res.status(400).end()
    }
    return res.status(200).json({ data: query })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

export const removeOne = model => async (req, res) => {
  try {
    let query = await model
      .findOneAndRemove({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec()
    if (!query) {
      return res.status(400).end()
    }
    return res.status(200).json({data:query})
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
