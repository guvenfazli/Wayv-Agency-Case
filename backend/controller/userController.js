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
  console.log(req.body)
  
  const { error } = await supabase.from('campaign').insert({
    title,
    brand,
    start_date: 1,
    end_date: 1,
    budget: 1,
    image_url: imageUrl,
    description
  })

  console.log(error)



}