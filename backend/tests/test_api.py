from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['success'] is True


def test_ready_endpoint():
    response = client.get('/ready')
    assert response.status_code == 200
    assert response.json()['success'] is True


def test_metrics_endpoint():
    response = client.get('/metrics')
    assert response.status_code == 200
    assert response.json()['success'] is True
