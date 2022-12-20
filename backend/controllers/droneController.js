const getPilots = (req, res) => {
    res.status(200).json({message: "Get Pilots"})
}

module.exports = {
    getPilots,
}