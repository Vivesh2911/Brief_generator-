from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()


class Brief(db.Model):
    __tablename__ = 'briefs'

    id = db.Column(db.Integer, primary_key=True)
    app_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    target_users = db.Column(db.String(300), nullable=False)
    extra_context = db.Column(db.Text, default='')
    generated_spec = db.Column(db.Text, nullable=False)  # stored as JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        try:
            spec = json.loads(self.generated_spec)
        except Exception:
            spec = self.generated_spec

        return {
            'id': self.id,
            'app_name': self.app_name,
            'description': self.description,
            'target_users': self.target_users,
            'extra_context': self.extra_context,
            'generated_spec': spec,
            'created_at': self.created_at.isoformat()
        }
