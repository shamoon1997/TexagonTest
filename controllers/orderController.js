const supabase = require('../config/supabaseClient');

exports.createOrder = async (req, res) => {
  const { userId } = req.user;
  const { totalCost, orderDetails } = req.body;
  const { data, error } = await supabase
    .from('orders')
    .insert([
      { user_id: userId, total_cost: totalCost, order_details: orderDetails },
    ]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};
