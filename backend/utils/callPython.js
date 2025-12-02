import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const PYTHON_API = process.env.PYTHON_API || "http://127.0.0.1:8000";

export const sendFileToPython = async (endpoint, filePath, extraFields = {}) => {
  const form = new FormData();
  form.append("file", fs.createReadStream(path.resolve(filePath)));
  Object.entries(extraFields).forEach(([k, v]) => form.append(k, v));

  const res = await fetch(`${PYTHON_API}${endpoint}`, { method: "POST", body: form });
  const text = await res.text();

  console.log(`📤 Sent to Python ${endpoint}`);
  console.log(`📥 Python response raw:\n${text}`);

  try {
    return JSON.parse(text);
  } catch {
    return { status: "error", message: "Invalid JSON from Python", raw: text };
  }
};
