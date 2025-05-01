const supabase = require('../database/supabaseClient')
const { throwError } = require('../utils/throwError')
const { validationResult } = require('express-validator')
const dayjs = require('dayjs')

exports.getCampaigns = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('campaigns').select('*')

    if (error) {
      throwError(500, "Server Error")
    }

    return res.json({ data })
  } catch (err) {
    next(err)
  }
}

exports.createCampaign = async (req, res, next) => {
  const { title, brand, startDate, endDate, budget, imageUrl, description } = req.body

  const convertedBudget = +budget
  const startStamp = dayjs(startDate).startOf('d').unix()
  const endStamp = dayjs(endDate).startOf('d').unix()

  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throwError(410, errors.array()[0].msg)
    if (isNaN(budget)) throwError(410, "Please enter a numeric value!")
    if (startStamp > endStamp) throwError(410, "Start date can not be older than end date!")

    const { data, error } = await supabase.from('campaigns').insert({
      title,
      brand,
      start_date: startStamp,
      end_date: endStamp,
      budget: convertedBudget,
      image_url: imageUrl,
      description
    }).select()

    if (error) throwError(500, error)

    return res.json({ message: 'Campaign Informations Created' })

  } catch (err) {
    next(err)
  }
}