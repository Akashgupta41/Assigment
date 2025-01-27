import Resource from '../models/resource.model.js';
import { validationResult } from 'express-validator';

export const createResource = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  try {
    const newResource = new Resource({ title, content });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve resources' });
  }
};

export const getResourceById = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve resource' });
  }
};

export const updateResource = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findByIdAndUpdate(id, req.body, { new: true });
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

export const deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};
