const express = require("express");
const faqsModel = require("../models/model");
const app = express();

app.get("/faq", async (request, response) => {
  const faq = await faqsModel.find({});
  try {
    response.send(faq);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/faq", async (request, response) => {
  const newFaq = {
    Faq_category: request.body.faq,
    cat_id: 001,
    faq_cat_name: 'General',
    faq: 0,
    id: 0,
    question: request.body.question,
    answer: request.body.answer
  }
  const faq = new faqsModel(newFaq);
  try {
    await faq.save();
    response.send(faq);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/faq/:id", async (request, response) => {
  try {
    await faqsModel.findByIdAndUpdate(request.params.id, request.body);
    await faqsModel.save();
    response.send(faq);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/faq/:id", async (request, response) => {
  try {
    const faq = await faqsModel.findByIdAndDelete(request.params.id);
    if (!faq) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
