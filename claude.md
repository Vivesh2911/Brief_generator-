# claude.md — AI Guidance for SpecForge

## Project Overview

SpecForge is an AI-powered engineering brief generator. Users describe their startup idea, and the app generates a structured engineering specification using GPT-4o. This file documents how AI was used and the prompting decisions made.

---

## AI Role in this Project

### 1. Core Feature: Engineering Spec Generation (`backend/ai_service.py`)

The primary AI usage is GPT-4o generating structured engineering specs from user input.

**Model:** `gpt-4o`
**Temperature:** `0.7` — balanced between creativity and structure
**Response format:** `json_object` — enforces valid JSON output

### 2. System Prompt Design

The system prompt establishes the AI's persona as an "expert software architect and technical co-founder." Key decisions:

- **Role specificity**: Telling GPT it's a "technical co-founder" produces more opinionated, practical output vs. generic specs
- **JSON enforcement**: "Always respond with valid JSON only — no markdown, no extra text" prevents formatting noise
- **Realism cue**: "Think like a senior engineer reviewing an MVP scope" reduces hallucinated or over-engineered suggestions

### 3. User Prompt Structure

The user prompt uses a **structured template** with labeled fields:

```
App Name: {app_name}
Description: {description}
Target Users: {target_users}
Extra Context: {extra_context}
```

This explicit labeling outperforms a single paragraph because the model can clearly associate context with each field.

### 4. Output Schema Design

The output JSON schema was designed to mirror real engineering artifacts:

| Section | Reasoning |
|---|---|
| `mvp_features` with priority tags | Forces product thinking, not just feature lists |
| `user_stories` in role/action/benefit format | Standard agile format, forces user-centric thinking |
| `tech_stack` with `reason` fields | Prevents generic stack choices, explains trade-offs |
| `data_models` with typed fields | Immediately actionable for a developer |
| `api_endpoints` with `auth_required` | Forces security thinking upfront |
| `risks` with `severity` + `mitigation` | Pairs problems with solutions, not just warnings |
| `out_of_scope` | Equally important as what IS in scope |

### 5. Error Handling Strategy

- JSON is validated before storing: `json.loads(raw)` → `json.dumps(parsed)` round-trip
- If OpenAI fails, a clear error message is returned to the frontend via the API
- Frontend shows toast notifications for both success and failure states

---

## Prompting Constraints & Rules

1. **Never ask GPT to generate code** — this app is not a code generator, keep the AI focused on architecture and planning
2. **Always include `response_format: json_object`** — prevents markdown leaking into the response
3. **User prompt should always include all 4 fields** even if extra_context is empty (avoids model confusion)
4. **Do not chain multiple AI calls** — one call per brief keeps latency low and costs predictable
5. **Temperature should stay between 0.6–0.8** — lower produces repetitive specs, higher produces unreliable JSON structure

---

## What AI Was Not Used For

- Database design (manual SQLAlchemy models)
- API routing (manual Flask routes)
- Frontend UI (handcrafted React components)
- This ensures the project demonstrates engineering judgment, not just AI delegation

---

## Extension Ideas Using AI

- **Streaming responses**: Use `stream=True` in OpenAI SDK to show spec generating word-by-word
- **Spec comparison**: Feed two briefs into GPT and ask it to compare approaches
- **Follow-up Q&A**: After generating a spec, let users ask clarifying questions with the spec as context
- **Auto-estimation**: Feed the spec back into GPT to estimate development hours per section
