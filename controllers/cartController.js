const supabase = require('../config/supabaseClient');

exports.createCart = async (req, res) => {
  const { userId } = req.user;
  const { data, error } = await supabase
    .from('carts')
    .insert([{ user_id: userId }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.addProductToCart = async (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const { data, error } = await supabase
    .from('cart_products')
    .insert([{ cart_id: cartId, product_id: productId, quantity }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.removeProductFromCart = async (req, res) => {
  const { cartProductId } = req.params;
  const { data, error } = await supabase
    .from('cart_products')
    .delete()
    .eq('id', cartProductId);

  if (error) return res.status(400).json({ error: error.message });

  res.status(204).send();
};

exports.getCart = async (req, res) => {
  const { userId } = req.user;
  const { data, error } = await supabase
    .from('carts')
    .select('*, cart_products(*, products(*))')
    .eq('user_id', userId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};
