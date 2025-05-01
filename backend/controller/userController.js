const supabase = require('../database/supabaseClient')
const { throwError } = require('../utils/throwError')

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

  try {

    if (isNaN(budget)) throwError(410, "Please enter a numeric value!")

    const { data, error } = await supabase.from('campaigns').insert({
      title,
      brand,
      start_date: 1,
      end_date: 1,
      budget: convertedBudget,
      image_url: imageUrl,
      description
    }).select()

    if (error) throwError(500, error)

    return res.json({ message: 'Campaign Informations Created', campaignId: data[0].id })

  } catch (err) {
    next(err)
  }



}