import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

SYSTEM_PROMPT = """You are an expert software architect and technical co-founder. 
Your job is to generate detailed, structured engineering specifications for software projects.
Always respond with valid JSON only — no markdown, no extra text, just the JSON object.
Be specific, practical, and realistic. Think like a senior engineer reviewing an MVP scope."""

def generate_brief(app_name: str, description: str, target_users: str, extra_context: str = '') -> str:
    user_prompt = f"""Generate a comprehensive engineering spec for the following project:

App Name: {app_name}
Description: {description}
Target Users: {target_users}
Extra Context: {extra_context if extra_context else 'None provided'}

Return a JSON object with exactly this structure:
{{
  "summary": "2-3 sentence executive summary of the product",
  "problem_statement": "What specific problem this solves",
  "mvp_features": [
    {{"feature": "Feature name", "description": "What it does", "priority": "Must Have | Should Have | Nice to Have"}}
  ],
  "user_stories": [
    {{"role": "As a [user type]", "action": "I want to [action]", "benefit": "So that [benefit]"}}
  ],
  "tech_stack": {{
    "frontend": {{"technology": "name", "reason": "why this choice"}},
    "backend": {{"technology": "name", "reason": "why this choice"}},
    "database": {{"technology": "name", "reason": "why this choice"}},
    "hosting": {{"technology": "name", "reason": "why this choice"}},
    "extras": [{{"technology": "name", "reason": "why"}}]
  }},
  "data_models": [
    {{
      "model": "ModelName",
      "fields": [{{"name": "field_name", "type": "data_type", "description": "what it stores"}}]
    }}
  ],
  "api_endpoints": [
    {{"method": "GET/POST/PUT/DELETE", "path": "/api/endpoint", "description": "what it does", "auth_required": true}}
  ],
  "risks": [
    {{"risk": "Risk description", "severity": "High | Medium | Low", "mitigation": "How to handle it"}}
  ],
  "milestones": [
    {{"phase": "Phase name", "duration": "X weeks", "deliverables": ["item1", "item2"]}}
  ],
  "success_metrics": ["metric 1", "metric 2", "metric 3"],
  "out_of_scope": ["thing not included in MVP 1", "thing not included in MVP 2"]
}}

Generate 4-6 items per array section. Be thorough but realistic."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        response_format={"type": "json_object"}
    )

    raw = response.choices[0].message.content
    parsed = json.loads(raw)
    return json.dumps(parsed)