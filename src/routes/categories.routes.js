import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  res.json(categories);
});

router.get("/categories/:id", async (req, res) => {
  const categoryFound = await prisma.category.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      products: true,
    },
  });

  if (!categoryFound)
    return res.status(404).json({ error: "Category not found" });

  res.json(categoryFound);
});

router.post("/categories", async (req, res) => {
  await prisma.category.create({
    data: req.body,
  });
  res.json(req.body);
});

router.delete("/categories/:id", async (req, res) => {
  const categoryDeleted = await prisma.category.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!categoryDeleted)
    return res.status(404).json({ error: "Category not found" });

  res.json(categoryDeleted);
});

export default router;
