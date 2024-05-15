const supabase = require('../config/supabaseClient');

exports.createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, price, category }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.getProducts = async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};

exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const { data, error } = await supabase
    .from('products')
    .update({ name, description, price, category })
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data[0]);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('products').delete().eq('id', id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(204).send();
};
