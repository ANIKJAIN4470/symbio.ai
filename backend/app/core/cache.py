import json
import os
import time
from typing import Any

try:
    import redis
except ImportError:  # pragma: no cover - optional dependency
    redis = None


class CacheService:
    """Cache responses in Redis when available, otherwise fall back to an in-process store."""

    def __init__(self) -> None:
        self._store: dict[str, tuple[float, Any]] = {}
        self._ttl_seconds = int(os.getenv("CACHE_TTL_SECONDS", "60"))
        self._redis_client = None
        redis_url = os.getenv("REDIS_URL")
        if redis and redis_url:
            try:
                self._redis_client = redis.from_url(redis_url, decode_responses=True)
                self._redis_client.ping()
            except Exception:
                self._redis_client = None

    def get(self, key: str) -> Any | None:
        if self._redis_client is not None:
            try:
                value = self._redis_client.get(key)
                if value is None:
                    return None
                return json.loads(value)
            except Exception:
                pass

        entry = self._store.get(key)
        if not entry:
            return None
        expires_at, value = entry
        if expires_at < time.time():
            self._store.pop(key, None)
            return None
        return value

    def set(self, key: str, value: Any, ttl_seconds: int | None = None) -> None:
        ttl = ttl_seconds or self._ttl_seconds
        if self._redis_client is not None:
            try:
                self._redis_client.setex(key, ttl, json.dumps(value))
                return
            except Exception:
                pass

        expires_at = time.time() + ttl
        self._store[key] = (expires_at, value)

    def invalidate(self, prefix: str | None = None) -> None:
        if self._redis_client is not None:
            try:
                if prefix is None:
                    for key in self._redis_client.scan_iter(match='*'):
                        self._redis_client.delete(key)
                else:
                    for key in self._redis_client.scan_iter(match=f'{prefix}*'):
                        self._redis_client.delete(key)
            except Exception:
                pass

        if prefix is None:
            self._store.clear()
            return
        for key in list(self._store.keys()):
            if key.startswith(prefix):
                self._store.pop(key, None)


cache_service = CacheService()
