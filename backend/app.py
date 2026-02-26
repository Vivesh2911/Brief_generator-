from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Brief
from ai_service import generate_brief
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'briefs.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Project Brief Generator API is running'})


@app.route('/api/briefs', methods=['GET'])
def get_briefs():
    briefs = Brief.query.order_by(Brief.created_at.desc()).all()
    return jsonify([b.to_dict() for b in briefs])


@app.route('/api/briefs/<int:brief_id>', methods=['GET'])
def get_brief(brief_id):
    brief = Brief.query.get_or_404(brief_id)
    return jsonify(brief.to_dict())


@app.route('/api/briefs', methods=['POST'])
def create_brief():
    data = request.get_json()

    required_fields = ['app_name', 'description', 'target_users']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'Missing required field: {field}'}), 400

    try:
        result = generate_brief(
            app_name=data['app_name'],
            description=data['description'],
            target_users=data['target_users'],
            extra_context=data.get('extra_context', '')
        )

        brief = Brief(
            app_name=data['app_name'],
            description=data['description'],
            target_users=data['target_users'],
            extra_context=data.get('extra_context', ''),
            generated_spec=result
        )
        db.session.add(brief)
        db.session.commit()

        return jsonify(brief.to_dict()), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/briefs/<int:brief_id>', methods=['DELETE'])
def delete_brief(brief_id):
    brief = Brief.query.get_or_404(brief_id)
    db.session.delete(brief)
    db.session.commit()
    return jsonify({'message': 'Brief deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
