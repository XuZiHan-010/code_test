"""Read-only experiments for the FastAPI question review; no app data is touched."""
import asyncio
import inspect
import json
from pathlib import Path
from typing import Annotated

import fastapi
import httpx
import pydantic
from fastapi import Depends, FastAPI, Path as PathParameter, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from fastapi.testclient import TestClient


def run():
    results = {
        "versions": {
            "fastapi": fastapi.__version__,
            "pydantic": pydantic.__version__,
            "httpx": httpx.__version__,
        }
    }
    app = FastAPI()

    @app.get("/bool")
    def bool_parameter(short: bool):
        return {"short": short}

    @app.get("/nullable")
    def nullable_parameter(q: Annotated[str | None, Query(min_length=3)]):
        return {"q": q}

    @app.get("/response", response_model=dict[str, int])
    def response_with_schema():
        return JSONResponse({"extra": "not filtered"})

    client = TestClient(app)
    results["bool_requests"] = {
        value: {"status": (r := client.get("/bool", params={"short": value})).status_code,
                "body": r.json()}
        for value in ["on", "off", "foo"]
    }
    results["nullable_requests"] = {
        url: {"status": (r := client.get(url)).status_code, "body": r.json()}
        for url in ["/nullable", "/nullable?q=None", "/nullable?q=null", "/nullable?q="]
    }
    results["direct_response_with_declared_model"] = {
        "response": client.get("/response").json(),
        "openapi_response": app.openapi()["paths"]["/response"]["get"]["responses"]["200"],
    }
    results["depends_parameter_names"] = list(inspect.signature(Depends).parameters)

    results["path_defaults"] = {}
    for label, declaration in {
        "implicit_default": "item_id: int = None",
        "explicit_path_default": "item_id: int = PathParameter(default=None)",
        "annotated_path_default": "item_id: Annotated[int, PathParameter()] = None",
    }.items():
        namespace = dict(globals(), app=FastAPI())
        try:
            exec('@app.get("/items/{item_id}")\ndef endpoint(' + declaration + '):\n    return item_id', namespace)
            r = TestClient(namespace["app"]).get("/items/3")
            results["path_defaults"][label] = {"status": r.status_code, "value": r.json()}
        except Exception as exc:
            results["path_defaults"][label] = {"error": type(exc).__name__, "message": str(exc)}

    results["yield_scope_order"] = {}
    results["yield_middleware_order"] = {}
    for scope in ["request", "function"]:
        events = []
        scoped_app = FastAPI()

        async def dependency():
            events.append("dependency_enter")
            yield
            events.append("dependency_exit")

        class ObservedResponse(Response):
            async def __call__(self, scope, receive, send):
                events.append("response_start")
                await super().__call__(scope, receive, send)
                events.append("response_sent")

        @scoped_app.get("/")
        async def scoped_endpoint(value=Depends(dependency, scope=scope)):
            events.append("endpoint")
            return ObservedResponse("ok")

        TestClient(scoped_app).get("/")
        results["yield_scope_order"][scope] = list(events)

        events.clear()
        scoped_app.middleware_stack = None

        @scoped_app.middleware("http")
        async def middleware(request, call_next):
            events.append("middleware_before")
            response = await call_next(request)
            events.append("middleware_after")
            return response

        TestClient(scoped_app).get("/")
        results["yield_middleware_order"][scope] = list(events)

    cors_app = FastAPI()
    cors_app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://frontend.example"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @cors_app.put("/")
    def cors_endpoint():
        return {"ok": True}

    cors_response = TestClient(cors_app).options("/", headers={
        "Origin": "https://frontend.example",
        "Access-Control-Request-Method": "PUT",
        "Access-Control-Request-Headers": "X-Custom,Authorization",
    })
    results["cors_wildcard_configuration"] = {
        "status": cors_response.status_code,
        "headers": {key: value for key, value in cors_response.headers.items()
                    if key.startswith("access-control")},
    }

    results["trailing_slash"] = {}
    for route in ["/items", "/items/"]:
        slash_app = FastAPI()
        slash_app.get(route)(lambda: {"ok": True})
        slash_client = TestClient(slash_app)
        results["trailing_slash"][route] = {
            path: {"status": (r := slash_client.get(path, follow_redirects=False)).status_code,
                   "location": r.headers.get("location")}
            for path in ["/items", "/items/"]
        }

    results["root_path_openapi_servers"] = {}
    for root_path in ["", "/api/v1"]:
        prefix_app = FastAPI(root_path=root_path)
        schema = TestClient(prefix_app).get("/openapi.json").json()
        results["root_path_openapi_servers"][root_path] = schema.get("servers")

    async def coroutine():
        return 42

    created_in_sync_function = coroutine()
    results["coroutine_created_in_sync_code"] = {
        "is_coroutine": inspect.iscoroutine(created_in_sync_function),
        "result_with_asyncio_run": asyncio.run(created_in_sync_function),
    }
    return results


if __name__ == "__main__":
    output = run()
    destination = Path(__file__).with_name("reproduction-results.json")
    destination.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(output, ensure_ascii=False, indent=2))
