const renderCategories = async (req, res) => {
  res.render("vwCategories/index", {
    custom_style: "categories.css",
  });
};

export { renderCategories };
