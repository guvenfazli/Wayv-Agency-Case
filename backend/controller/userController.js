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

exports.getCampaign = async (req, res, next) => {

  const campaignId = req.params.campaignId

  try {
    const { data, error } = await supabase.from('campaigns').select('*').eq('id', campaignId)

    if (data.length === 0) throwError(404, "Campaign could not found!")
    if (!data || error) throwError(500, "Something went wrong.")

    return res.json({ data: data[0] })

  } catch (err) {
    next(err)
  }
}

exports.createCampaign = async (req, res, next) => {
  const { title, brand, startDate, endDate, budget, image_url, description } = req.body

  const convertedBudget = +budget
  const startStamp = dayjs(startDate).startOf('d').unix()
  const endStamp = dayjs(endDate).startOf('d').unix()

  const errors = validationResult(req)

  try {
    if (!errors.isEmpty()) throwError(410, errors.array()[0].msg)
    if (isNaN(budget)) throwError(410, "Please enter a numeric value!")
    if (startStamp > endStamp) throwError(410, "Start date can not be older than end date!")

    const { error } = await supabase.from('campaigns').insert({
      title,
      brand,
      start_date: startStamp,
      end_date: endStamp,
      budget: convertedBudget,
      image_url,
      description
    })

    if (error) throwError(500, error)

    return res.json({ message: 'Campaign Informations Created' })

  } catch (err) {
    next(err)
  }
}

exports.editCampaign = async (req, res, next) => {
  const { title, brand, start_date, end_date, budget, image_url, description } = req.body
  const campaignId = req.params.campaignId

  const convertedBudget = +budget
  const startStamp = isNaN(start_date) ? dayjs(start_date).startOf('d').unix() : start_date
  const endStamp = isNaN(end_date) ? dayjs(end_date).startOf('d').unix() : end_date

  try {

    if (isNaN(budget)) throwError(410, "Please enter a numeric value!")
    if (startStamp > endStamp) throwError(410, "Start date can not be older than end date!")

    const { error } = await supabase.from('campaigns').update({
      title,
      brand,
      start_date: startStamp,
      end_date: endStamp,
      budget: convertedBudget,
      image_url,
      description
    }).eq('id', campaignId)

    if (error) throwError(500, error)

    return res.json({ message: 'Campaign Informations Updated' })

  } catch (err) {
    next(err)
  }
}

exports.deleteCampaign = async (req, res, next) => {
  const campaignId = req.params.campaignId
  try {
    const response = await supabase.from('campaigns').delete().eq('id', campaignId)
    const { data, error } = await supabase.storage.from('campaign-banner').remove(['1746148299310-musicPhoto.jpg'])

    console.log(error)
    if (error) throwError(500, error)

    return res.status(response.status).json({ message: 'Campaign Informations Updated' })

  } catch (err) {
    next(err)
  }
}