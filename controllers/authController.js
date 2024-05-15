const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) return res.status(400).json({ error: 'User not found' });

  const passwordIsValid = bcrypt.compareSync(password, data.password);
  if (!passwordIsValid)
    return res.status(401).json({ error: 'Invalid Password' });

  const token = jwt.sign(
    { id: data.id, username: data.username },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.status(200).json({ token });
};
