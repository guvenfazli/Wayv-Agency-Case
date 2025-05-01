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
  console.log('here.')
}