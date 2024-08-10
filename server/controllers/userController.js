const getUsers = (req, res) => {
  res.json([{ id: 1, name: 'John Doe' }]);
};

module.exports = { getUsers };

