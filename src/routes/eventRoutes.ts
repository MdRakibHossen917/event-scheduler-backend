import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MyEvent } from "../data/types";
import { categorizeEvent } from "../utils";
import { events } from "../data/data";

const router = Router();

// GET /events - return all sorted by date + time ascending
router.get("/", (_req: Request, res: Response) => {
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
  });
  res.status(200).json(sortedEvents);
});

// POST /events - create new event with validation and categorization
router.post("/", (req: Request, res: Response) => {
  const { title, date, time, notes } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string." });
  }
  if (!date || !time) {
    return res.status(400).json({ error: "Date and time are required." });
  }

  const dateTime = new Date(`${date}T${time}`);
  if (isNaN(dateTime.getTime())) {
    return res.status(400).json({ error: "Invalid date or time format." });
  }

  const category = categorizeEvent(title, notes);

  const newEvent: MyEvent = {
    id: uuidv4(),
    title: title.trim(),
    date,
    time,
    notes: notes ? notes.trim() : undefined,
    category,
    archived: false,
  };

  events.push(newEvent);

  res.status(201).json(newEvent);
});

// PUT /events/:id - update archived status to true or false
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { archived } = req.body;

  if (typeof archived !== "boolean") {
    return res.status(400).json({ error: "Archived status must be a boolean." });
  }

  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: "Event not found." });
  }

  event.archived = archived;

  res.status(200).json(event);
});

// DELETE /events/:id - delete event
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = events.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Event not found." });
  }

  events.splice(index, 1);
  res.status(204).send();
});

export default router;
