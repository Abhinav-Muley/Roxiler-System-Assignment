const express = require("express");
const model = require("./usermodal");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/", async (req, res, next) => {
  const { month, search, page = 1 } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const queryFilter = {
      $and: [
        {
          $expr: {
            $eq: [{ $toInt: { $substr: ['$dateOfSale', 5, 2] } }, Number(month)],
          },
        },
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            ...(isNaN(Number(search)) ? [] : [{ price: Number(search) }]),
          ],
        },
      ],
    };

    const data = await model.find(queryFilter).skip(skip).limit(limit);
    const totalRecords = await model.countDocuments(queryFilter);

    res.send({
      data,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/barchart", async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    const data = await model.find({
      $expr: {
        $eq: [{ $toInt: { $substr: ['$dateOfSale', 5, 2] } }, Number(month)],
      },
    });

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };

    data.forEach(product => {
      const price = product.price;
      if (price <= 100) priceRanges['0-100']++;
      else if (price <= 200) priceRanges['101-200']++;
      else if (price <= 300) priceRanges['201-300']++;
      else if (price <= 400) priceRanges['301-400']++;
      else if (price <= 500) priceRanges['401-500']++;
      else if (price <= 600) priceRanges['501-600']++;
      else if (price <= 700) priceRanges['601-700']++;
      else if (price <= 800) priceRanges['701-800']++;
      else if (price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/statistics", async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    const products = await model.find({
      $expr: {
        $eq: [{ $toInt: { $substr: ['$dateOfSale', 5, 2] } }, Number(month)],
      },
    });

    const totalSale = products.reduce((acc, product) => {
      if (product.sold) {
        return acc + product.price;
      }
      return acc;
    }, 0);

    const totalSoldItems = products.filter(product => product.sold).length;
    const totalUnsoldItems = products.filter(product => !product.sold).length;

    res.status(200).json({
      totalSale,
      totalSoldItems,
      totalUnsoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/category", async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    const products = await model.find({
      $expr: {
        $eq: [{ $toInt: { $substr: ['$dateOfSale', 5, 2] } }, Number(month)],
      },
    });

    const categoryDistribution = {};

    products.forEach(product => {
      const category = product.category;
      if (categoryDistribution[category]) {
        categoryDistribution[category]++;
      } else {
        categoryDistribution[category] = 1;
      }
    });

    res.status(200).json(categoryDistribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("listening to port 3000"));
