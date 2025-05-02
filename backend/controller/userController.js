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

    return res.status(200).json({ data: data[0] })

  } catch (err) {
    next(err)
  }
}

exports.createCampaign = async (req, res, next) => {
  const { title, brand, start_date, end_date, budget, image_url, description } = req.body

  const convertedBudget = +budget
  const startStamp = dayjs(start_date).startOf('d').unix()
  const endStamp = dayjs(end_date).startOf('d').unix()

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

    return res.status(200).json({ message: 'Campaign Created' })

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

    const { error: dbError } = await supabase.from('campaigns').update({
      title,
      brand,
      start_date: startStamp,
      end_date: endStamp,
      budget: convertedBudget,
      image_url,
      description
    }).eq('id', campaignId)

    if (dbError) throwError(500, error)

    return res.status(200).json({ message: 'Campaign Informations Updated' })

  } catch (err) {
    next(err)
  }
}

exports.deleteCampaign = async (req, res, next) => {
  const campaignId = req.params.campaignId
  const imageUrl = req.params.imageUrl
  try {
    const { data: dbData, error: dbError } = await supabase.from('campaigns').delete().eq('id', campaignId)

    if (dbError) throwError(500, error)

    const { data, error } = await supabase.storage.from('campaign-banner').remove([imageUrl])

    if (error) throwError(500, error)

    return res.status(200).json({ message: 'Campaign Deleted.' })

  } catch (err) {
    next(err)
  }
}