from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_register_login_flow():
    email = 'qa+sandbox@symbioai.io'
    register_response = client.post('/api/auth/register', json={
        'email': email,
        'full_name': 'QA User',
        'password': 'Password123!',
        'role': 'Waste Producer',
    })
    assert register_response.status_code in {200, 400}

    login_response = client.post('/api/auth/login', json={
        'email': email,
        'password': 'Password123!',
    })
    assert login_response.status_code == 200
